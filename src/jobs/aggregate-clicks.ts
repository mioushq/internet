// --- Job: Agregacja kliknięć do AnalyticsDaily ---
// Uruchamiany co 24h — zlicza dzienne kliknięcia per operator/plan

import { getPayloadClient } from '@/lib/payload'

export async function aggregateClicks(): Promise<{ aggregated: number }> {
  const payload = await getPayloadClient()
  let aggregated = 0

  // Wczorajsza data
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dateStr = yesterday.toISOString().split('T')[0]

  // Pobierz kliknięcia z wczoraj
  const clicks = await payload.find({
    collection: 'click-events',
    where: {
      createdAt: {
        greater_than_equal: yesterday.toISOString(),
        less_than: today.toISOString(),
      },
    },
    limit: 10000,
    depth: 0,
  })

  if (clicks.totalDocs === 0) {
    console.log(`[aggregate-clicks] Brak kliknięć za ${dateStr}`)
    return { aggregated: 0 }
  }

  // Grupuj po operator
  const byOperator = new Map<string, { clicks: number; redirects: number; impressions: number }>()

  for (const click of clicks.docs) {
    const opId = typeof click.operator === 'object' ? (click.operator as any)?.id : click.operator
    if (!opId) continue

    const key = String(opId)
    const existing = byOperator.get(key) || { clicks: 0, redirects: 0, impressions: 0 }

    if (click.eventType === 'click') existing.clicks++
    if (click.eventType === 'redirect') existing.redirects++
    if (click.eventType === 'impression') existing.impressions++

    byOperator.set(key, existing)
  }

  // Zapisz agregaty
  for (const [operatorId, stats] of byOperator) {
    // Sprawdź czy istnieje wpis
    const existing = await payload.find({
      collection: 'analytics-daily',
      where: {
        date: { equals: yesterday.toISOString() },
        operator: { equals: operatorId },
      },
      limit: 1,
    })

    const ctr = stats.impressions > 0 ? (stats.clicks / stats.impressions) * 100 : 0

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'analytics-daily',
        id: existing.docs[0].id,
        data: {
          clicks: stats.clicks,
          redirects: stats.redirects,
          impressions: stats.impressions,
          ctr: Math.round(ctr * 100) / 100,
        } as any,
      })
    } else {
      await payload.create({
        collection: 'analytics-daily',
        data: {
          date: yesterday.toISOString(),
          operator: operatorId,
          clicks: stats.clicks,
          redirects: stats.redirects,
          impressions: stats.impressions,
          ctr: Math.round(ctr * 100) / 100,
        } as any,
      })
    }

    aggregated++
  }

  console.log(`[aggregate-clicks] Zagregowano dane z ${clicks.totalDocs} kliknięć za ${dateStr} → ${aggregated} wpisów`)
  return { aggregated }
}

// --- Job: Wysyłanie alertów cenowych ---
// Uruchamiany co 24h — sprawdza nowe oferty vs alerty użytkowników

import { getPayloadClient } from '@/lib/payload'

export async function sendPriceAlerts(): Promise<{ sent: number; matches: number }> {
  const payload = await getPayloadClient()
  let sent = 0
  let matches = 0

  // Pobierz aktywne alerty
  const alerts = await payload.find({
    collection: 'price-alerts',
    where: { isActive: { equals: true } },
    limit: 500,
  })

  for (const alert of alerts.docs) {
    const where: any = { 'availability.isActive': { equals: true } }

    if (alert.maxPrice) {
      where['pricing.priceMonthly'] = { less_than_equal: alert.maxPrice }
    }
    if (alert.minSpeed) {
      where['speeds.download'] = { greater_than_equal: alert.minSpeed }
    }
    if (alert.category) {
      const catId = typeof alert.category === 'object' ? (alert.category as any).id : alert.category
      where.category = { equals: catId }
    }

    // Szukaj ofert dodanych po ostatnim powiadomieniu
    if (alert.lastNotified) {
      where.createdAt = { greater_than: alert.lastNotified }
    }

    const matchingPlans = await payload.find({
      collection: 'plans',
      where,
      limit: 10,
      depth: 1,
    })

    if (matchingPlans.totalDocs > 0) {
      matches += matchingPlans.totalDocs

      // W produkcji: wyślij email (teraz logujemy do konsoli)
      console.log(`[price-alerts] Alert dla ${alert.email}: ${matchingPlans.totalDocs} nowych ofert`)
      for (const plan of matchingPlans.docs) {
        console.log(`  - ${plan.name}: ${(plan as any).pricing?.priceMonthly} PLN, ${(plan as any).speeds?.download} Mbps`)
      }

      // Aktualizuj datę powiadomienia
      await payload.update({
        collection: 'price-alerts',
        id: alert.id,
        data: { lastNotified: new Date().toISOString() } as any,
      })
      sent++
    }
  }

  console.log(`[price-alerts] Wysłano ${sent} alertów, ${matches} dopasowanych ofert`)
  return { sent, matches }
}

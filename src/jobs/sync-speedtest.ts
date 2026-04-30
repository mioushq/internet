// --- Job: Import danych Speedtest Ookla do SpeedStats ---
// Uruchamiany co tydzień (nowe dane kwartalne)

import { getPayloadClient } from '@/lib/payload'
import { getSampleSpeedData } from '@/lib/speedtest-data'

export async function syncSpeedtestData(): Promise<{ imported: number; skipped: number }> {
  const payload = await getPayloadClient()
  let imported = 0
  let skipped = 0

  const speedData = getSampleSpeedData()

  for (const entry of speedData) {
    // Znajdź miasto
    const cities = await payload.find({
      collection: 'cities',
      where: { slug: { equals: entry.citySlug } },
      limit: 1,
    })

    if (cities.docs.length === 0) {
      console.warn(`[sync-speedtest] Miasto nie znalezione: ${entry.citySlug}`)
      skipped++
      continue
    }

    const cityId = cities.docs[0].id

    // Sprawdź czy już istnieje wpis dla tego okresu
    const existing = await payload.find({
      collection: 'speed-stats',
      where: {
        city: { equals: cityId },
        period: { equals: entry.period },
        operator: { exists: false },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Aktualizuj
      await payload.update({
        collection: 'speed-stats',
        id: existing.docs[0].id,
        data: {
          avgDownload: entry.avgDownload,
          avgUpload: entry.avgUpload,
          avgLatency: entry.avgLatency,
          sampleCount: entry.totalTests,
        } as any,
      })
    } else {
      // Utwórz nowy
      await payload.create({
        collection: 'speed-stats',
        data: {
          city: cityId,
          period: entry.period,
          avgDownload: entry.avgDownload,
          avgUpload: entry.avgUpload,
          avgLatency: entry.avgLatency,
          sampleCount: entry.totalTests,
          source: 'ookla',
          dataDate: new Date().toISOString(),
        } as any,
      })
    }

    imported++
  }

  console.log(`[sync-speedtest] Zaimportowano ${imported}, pominięto ${skipped}`)
  return { imported, skipped }
}

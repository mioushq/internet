// --- Job: Synchronizacja danych z GUS BDL API ---
// Uruchamiany co 24h — aktualizuje populację miast

import { getPayloadClient } from '@/lib/payload'
import { getCityPopulation, CITY_TERYT_MAP } from '@/lib/gus-api'

export async function syncGUSData(): Promise<{ updated: number; errors: number }> {
  const payload = await getPayloadClient()
  let updated = 0
  let errors = 0

  const cities = await payload.find({
    collection: 'cities',
    where: { isActive: { equals: true } },
    limit: 100,
  })

  for (const city of cities.docs) {
    const terytId = CITY_TERYT_MAP[city.slug]
    if (!terytId) continue

    try {
      const population = await getCityPopulation(terytId)
      if (population && population !== city.population) {
        await payload.update({
          collection: 'cities',
          id: city.id,
          data: { population } as any,
        })
        console.log(`[sync-gus] ${city.name}: populacja ${city.population} → ${population}`)
        updated++
      }
    } catch (e) {
      console.error(`[sync-gus] Błąd dla ${city.name}:`, e)
      errors++
    }

    // Rate limiting — max 1 request/sec dla GUS API
    await new Promise((r) => setTimeout(r, 1100))
  }

  console.log(`[sync-gus] Zaktualizowano ${updated} miast, ${errors} błędów`)
  return { updated, errors }
}

// --- Job: Deaktywacja wygasłych promocji i sponsorowań ---
// Uruchamiany co godzinę

import { getPayloadClient } from '@/lib/payload'

export async function expirePromotions(): Promise<{ expired: number }> {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  // Wygasłe promocje
  const expiredPromos = await payload.find({
    collection: 'promotions',
    where: {
      isActive: { equals: true },
      endDate: { less_than: now },
    },
    limit: 100,
  })

  let expired = 0
  for (const promo of expiredPromos.docs) {
    await payload.update({
      collection: 'promotions',
      id: promo.id,
      data: { isActive: false },
    })
    expired++
  }

  // Wygasłe sponsorowane plany
  const expiredSponsored = await payload.find({
    collection: 'plans',
    where: {
      'sponsoring.isSponsored': { equals: true },
      'sponsoring.sponsoredUntil': { less_than: now },
    },
    limit: 100,
  })

  for (const plan of expiredSponsored.docs) {
    await payload.update({
      collection: 'plans',
      id: plan.id,
      data: {
        sponsoring: {
          ...(plan as any).sponsoring,
          isSponsored: false,
        },
      } as any,
    })
    expired++
  }

  console.log(`[expire-promotions] Deaktywowano ${expired} wygasłych elementów`)
  return { expired }
}

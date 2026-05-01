import React from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import CityCard from '@/components/ui/CityCard'

export const metadata: Metadata = {
  title: 'Internet w Twoim mieście - Porównaj oferty',
  description: 'Znajdź najlepszą ofertę internetu w Twoim mieście. Porównaj operatorów dostępnych w Twojej lokalizacji.',
}

export default async function MiastaPage() {
  const payload = await getPayloadClient()

  const citiesRes = await payload.find({
    collection: 'cities',
    where: { isActive: { equals: true } },
    sort: '-population',
    limit: 100,
  })

  const mainCities = citiesRes.docs.filter((c) => c.isMainCity)
  const otherCities = citiesRes.docs.filter((c) => !c.isMainCity)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-white">Internet w Twoim mieście</h1>
      <p className="text-gray-400 mb-8">
        Wybierz miasto, aby zobaczyć dostępnych operatorów i porównać oferty.
      </p>

      {mainCities.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Miasta wojewódzkie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mainCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>
      )}

      {otherCities.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Pozostałe miasta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>
      )}

      {citiesRes.docs.length === 0 && (
        <div className="text-center text-gray-400 py-16 glass-panel rounded-2xl border-dashed">
          Brak miast w bazie. Uruchom seed lub dodaj miasta w CMS.
        </div>
      )}
    </div>
  )
}

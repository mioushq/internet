import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import OfferCard from '@/components/comparison/OfferCard'
import FilterBar from '@/components/ui/FilterBar'

export const metadata: Metadata = {
  title: 'Wszystkie oferty internetu - Porównaj ceny',
  description: 'Porównaj wszystkie oferty internetu od polskich operatorów. Światłowód, 5G, kabel, LTE.',
}

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

async function PlansList({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const payload = await getPayloadClient()

  const where: Record<string, any> = { 'availability.isActive': { equals: true } }

  if (searchParams.minSpeed) {
    where['speeds.download'] = { greater_than_equal: parseInt(searchParams.minSpeed) }
  }
  if (searchParams.maxPrice) {
    where['pricing.priceMonthly'] = { less_than_equal: parseInt(searchParams.maxPrice) }
  }
  if (searchParams.technology) {
    where.technology = { equals: searchParams.technology }
  }
  if (searchParams.operator) {
    where.operator = { equals: parseInt(searchParams.operator) }
  }

  const sort = searchParams.sort || 'display.sortOrder'
  const page = parseInt(searchParams.page || '1')

  const plansRes = await payload.find({
    collection: 'plans',
    where,
    sort,
    page,
    limit: 20,
    depth: 1,
  })

  if (plansRes.docs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-16 glass-panel rounded-2xl border-dashed">
        Brak ofert spełniających kryteria. Zmień filtry lub wyczyść je.
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-gray-400 mb-4">
        Znaleziono {plansRes.totalDocs} {plansRes.totalDocs === 1 ? 'ofertę' : 'ofert'}
      </p>
      <div className="flex flex-col gap-4">
        {plansRes.docs.map((plan) => (
          <OfferCard key={plan.id} plan={plan} />
        ))}
      </div>
      {plansRes.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: plansRes.totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/oferty?${new URLSearchParams({ ...searchParams, page: String(p) }).toString()}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                p === plansRes.page
                  ? 'bg-cyan-500 text-white'
                  : 'glass-panel text-gray-300 hover:text-white'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default async function OfertyPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const payload = await getPayloadClient()

  const operatorsRes = await payload.find({
    collection: 'operators',
    where: { isActive: { equals: true } },
    sort: 'name',
    limit: 50,
  })

  const operators = operatorsRes.docs.map((op) => ({
    id: op.id,
    name: op.name,
    slug: op.slug,
  }))

  const technologies = ['ftth', 'fttb', 'hfc', '5g', 'lte', 'dsl', 'satellite']

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-white">Wszystkie oferty internetu</h1>
      <p className="text-gray-400 mb-6">
        Porównaj oferty internetu od wszystkich operatorów w Polsce. Filtruj po prędkości, cenie, technologii.
      </p>

      <Suspense fallback={null}>
        <FilterBar operators={operators} technologies={technologies} />
      </Suspense>

      <Suspense fallback={<div className="text-center text-gray-400 py-16">Ładowanie ofert...</div>}>
        <PlansList searchParams={resolvedParams} />
      </Suspense>
    </div>
  )
}

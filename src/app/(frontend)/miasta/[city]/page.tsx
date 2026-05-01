import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import OfferCard from '@/components/comparison/OfferCard'
import type { Operator } from '@/payload-types'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

type Props = {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const cities = await payload.find({ collection: 'cities', where: { isActive: { equals: true } }, limit: 200 })
  return cities.docs.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const payload = await getPayloadClient()
  const citiesRes = await payload.find({
    collection: 'cities',
    where: { slug: { equals: citySlug } },
    limit: 1,
  })
  const city = citiesRes.docs[0]
  if (!city) {
    return { title: 'Miasto nie znalezione' }
  }
  return {
    title: city.seo?.metaTitle || `Internet w ${city.name} - Porównaj operatorów`,
    description: city.seo?.metaDescription || `Porównaj oferty internetu w ${city.name}. Światłowód, 5G, kabel — wszyscy operatorzy.`,
  }
}

export default async function CityLandingPage({ params }: Props) {
  const { city: citySlug } = await params
  const payload = await getPayloadClient()

  const citiesRes = await payload.find({
    collection: 'cities',
    where: { slug: { equals: citySlug } },
    limit: 1,
    depth: 1,
  })

  const city = citiesRes.docs[0]
  if (!city) notFound()

  const plansRes = await payload.find({
    collection: 'plans',
    where: {
      'availability.isActive': { equals: true },
      or: [
        { 'availability.regions': { in: [city.id] } },
        { 'availability.regions': { exists: false } },
      ],
    },
    sort: 'display.sortOrder',
    limit: 50,
    depth: 1,
  })

  const operators = city.availableOperators
    ?.map((op) => (typeof op === 'object' ? op as Operator : null))
    .filter(Boolean) as Operator[] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Miasta', href: '/miasta' },
        { label: city.name, href: `/miasta/${city.slug}` },
      ]} />
      <h1 className="text-3xl font-bold mb-2 text-white">Internet w {city.name}</h1>
      <p className="text-gray-400 mb-6">
        Porównaj oferty internetu od {operators.length || 'wszystkich'} operatorów dostępnych w {city.name}.
        {city.population && ` Miasto liczy ${city.population.toLocaleString('pl-PL')} mieszkańców.`}
      </p>

      {operators.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {operators.map((op) => (
            <span key={op.id} className="glass-panel rounded-full px-3 py-1 text-sm text-gray-300">
              {op.name}
            </span>
          ))}
        </div>
      )}

      {plansRes.docs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {plansRes.docs.map((plan) => (
            <OfferCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-16 glass-panel rounded-2xl border-dashed">
          Brak ofert w {city.name}. Sprawdź inne miasta lub dodaj oferty w CMS.
        </div>
      )}
    </div>
  )
}

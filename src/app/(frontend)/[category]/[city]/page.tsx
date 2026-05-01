import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import OfferCard from '@/components/comparison/OfferCard'

type Props = {
  params: Promise<{ category: string; city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, city: citySlug } = await params
  const payload = await getPayloadClient()

  const [catsRes, citiesRes] = await Promise.all([
    payload.find({ collection: 'categories', where: { urlPrefix: { equals: catSlug } }, limit: 1 }),
    payload.find({ collection: 'cities', where: { slug: { equals: citySlug } }, limit: 1 }),
  ])

  const cat = catsRes.docs[0]
  const city = citiesRes.docs[0]

  if (!cat || !city) return { title: 'Nie znaleziono' }

  const title = cat.seo?.metaTitle
    ?.replace('{{category}}', cat.name)
    .replace('{{city}}', city.name) || `${cat.name} w ${city.name} - Porównaj ceny`

  const description = cat.seo?.metaDescription
    ?.replace('{{category}}', cat.name)
    .replace('{{city}}', city.name) || `Porównaj oferty ${cat.name} w ${city.name}. Znajdź najlepszą cenę internetu.`

  return { title, description }
}

export default async function CityCategoryPage({ params }: Props) {
  const { category: catSlug, city: citySlug } = await params
  const payload = await getPayloadClient()

  const [catsRes, citiesRes] = await Promise.all([
    payload.find({ collection: 'categories', where: { urlPrefix: { equals: catSlug } }, limit: 1 }),
    payload.find({ collection: 'cities', where: { slug: { equals: citySlug } }, limit: 1 }),
  ])

  const category = catsRes.docs[0]
  const city = citiesRes.docs[0]
  if (!category || !city) notFound()

  const plansRes = await payload.find({
    collection: 'plans',
    where: {
      category: { equals: category.id },
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

  const h1 = category.seo?.h1Template
    ?.replace('{{category}}', category.name)
    .replace('{{city}}', city.name) || `${category.name} w ${city.name}`

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-white">{h1}</h1>
      <p className="text-gray-400 mb-6">
        Porównaj {plansRes.totalDocs} {plansRes.totalDocs === 1 ? 'ofertę' : 'ofert'} {category.name} od operatorów dostępnych w {city.name}.
      </p>

      {plansRes.docs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {plansRes.docs.map((plan) => (
            <OfferCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-16 glass-panel rounded-2xl border-dashed">
          Brak ofert {category.name} w {city.name}. Sprawdź inne kategorie lub miasta.
        </div>
      )}
    </div>
  )
}

import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import OfferCard from '@/components/comparison/OfferCard'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const cats = await payload.find({ collection: 'categories', where: { isActive: { equals: true } }, limit: 100 })
  return cats.docs.map((cat) => ({ category: cat.urlPrefix }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug } = await params
  const payload = await getPayloadClient()
  const catsRes = await payload.find({
    collection: 'categories',
    where: { urlPrefix: { equals: catSlug } },
    limit: 1,
  })
  const cat = catsRes.docs[0]
  if (!cat) {
    return { title: 'Kategoria nie znaleziona' }
  }
  return {
    title: cat.seo?.metaTitle?.replace('{{category}}', cat.name) || `${cat.name} - Porównaj oferty`,
    description: cat.seo?.metaDescription?.replace('{{category}}', cat.name) || `Porównaj najlepsze oferty ${cat.name} od wszystkich operatorów w Polsce.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: catSlug } = await params
  const payload = await getPayloadClient()

  const catsRes = await payload.find({
    collection: 'categories',
    where: { urlPrefix: { equals: catSlug } },
    limit: 1,
  })

  const category = catsRes.docs[0]
  if (!category) notFound()

  const plansRes = await payload.find({
    collection: 'plans',
    where: {
      category: { equals: category.id },
      'availability.isActive': { equals: true },
    },
    sort: 'display.sortOrder',
    limit: 50,
    depth: 1,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: category.name, href: `/${category.urlPrefix}` }]} />
      <h1 className="text-3xl font-bold mb-2 text-white">{category.name}</h1>
      <p className="text-gray-400 mb-6">
        {category.shortDescription || `Porównaj najlepsze oferty ${category.name} od wszystkich operatorów w Polsce.`}
      </p>

      {plansRes.docs.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {plansRes.totalDocs} {plansRes.totalDocs === 1 ? 'oferta' : 'ofert'} w kategorii
          </p>
          <div className="flex flex-col gap-4">
            {plansRes.docs.map((plan) => (
              <OfferCard key={plan.id} plan={plan} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 py-16 glass-panel rounded-2xl border-dashed">
          Brak ofert w tej kategorii. Dodaj plany w CMS.
        </div>
      )}
    </div>
  )
}

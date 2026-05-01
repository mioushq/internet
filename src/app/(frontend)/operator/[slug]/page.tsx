import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import OfferCard from '@/components/comparison/OfferCard'
import type { Media } from '@/payload-types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const opsRes = await payload.find({
    collection: 'operators',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const op = opsRes.docs[0]
  if (!op) return { title: 'Operator nie znaleziony' }
  return {
    title: op.seo?.metaTitle || `${op.name} - Oferty i ceny internetu`,
    description: op.seo?.metaDescription || `Sprawdź wszystkie oferty internetowe od ${op.name}. Porównaj ceny i prędkości.`,
  }
}

export default async function OperatorPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const opsRes = await payload.find({
    collection: 'operators',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const operator = opsRes.docs[0]
  if (!operator) notFound()

  const [plansRes, reviewsRes] = await Promise.all([
    payload.find({
      collection: 'plans',
      where: {
        operator: { equals: operator.id },
        'availability.isActive': { equals: true },
      },
      sort: 'display.sortOrder',
      limit: 50,
      depth: 1,
    }),
    payload.find({
      collection: 'reviews',
      where: {
        operator: { equals: operator.id },
        isApproved: { equals: true },
      },
      sort: '-createdAt',
      limit: 5,
      depth: 0,
    }),
  ])

  const logoUrl = typeof operator.logo === 'object' && operator.logo
    ? (operator.logo as Media).url
    : null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-white rounded-xl flex-shrink-0 flex items-center justify-center p-3 shadow-inner">
          {logoUrl ? (
            <Image src={logoUrl} alt={operator.name} width={80} height={80} className="object-contain" />
          ) : (
            <span className="text-gray-800 font-bold text-2xl">{operator.name.charAt(0)}</span>
          )}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{operator.name}</h1>
          <p className="text-gray-400 mb-3">
            {operator.shortDescription || `Oferty internetu od ${operator.name}`}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            {operator.rating && (
              <span className="text-yellow-400 font-medium">
                ★ {operator.rating.toFixed(1)} ({operator.reviewCount || 0} opinii)
              </span>
            )}
            {operator.website && (
              <a href={operator.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                {operator.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {operator.isPremiumPartner && (
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs font-semibold">
                Partner Premium
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Plans */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">
          Oferty ({plansRes.totalDocs})
        </h2>
        {plansRes.docs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {plansRes.docs.map((plan) => (
              <OfferCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10 glass-panel rounded-2xl border-dashed">
            Brak aktywnych ofert od {operator.name}.
          </div>
        )}
      </section>

      {/* Reviews */}
      {reviewsRes.docs.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Opinie użytkowników ({reviewsRes.totalDocs})
          </h2>
          <div className="flex flex-col gap-4">
            {reviewsRes.docs.map((review) => (
              <div key={review.id} className="glass-card p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{review.author}</span>
                  <span className="text-yellow-400 text-sm font-medium">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-cyan-300 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-400">{review.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

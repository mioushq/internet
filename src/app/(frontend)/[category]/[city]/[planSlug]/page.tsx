import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import type { Operator, Category, Media as MediaType } from '@/payload-types'

type Props = {
  params: Promise<{ category: string; city: string; planSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { planSlug } = await params
  const payload = await getPayloadClient()
  const plansRes = await payload.find({
    collection: 'plans',
    where: { slug: { equals: planSlug } },
    limit: 1,
    depth: 1,
  })
  const plan = plansRes.docs[0]
  if (!plan) return { title: 'Oferta nie znaleziona' }
  const op = typeof plan.operator === 'object' ? (plan.operator as Operator) : null
  return {
    title: plan.seo?.metaTitle || `${plan.name} - ${op?.name || 'Operator'}`,
    description: plan.seo?.metaDescription || `Szczegóły oferty ${plan.name} od ${op?.name || 'operatora'}. Prędkość ${plan.speeds?.download} Mbps, cena ${plan.pricing?.priceMonthly} zł/mc.`,
  }
}

export default async function PlanPage({ params }: Props) {
  const { category: catSlug, city: citySlug, planSlug } = await params
  const payload = await getPayloadClient()

  const plansRes = await payload.find({
    collection: 'plans',
    where: { slug: { equals: planSlug } },
    limit: 1,
    depth: 2,
  })

  const plan = plansRes.docs[0]
  if (!plan) notFound()

  const operator = typeof plan.operator === 'object' ? (plan.operator as Operator) : null
  const cat = typeof plan.category === 'object' ? (plan.category as Category) : null
  const logoUrl = operator && typeof operator.logo === 'object' && operator.logo
    ? (operator.logo as MediaType).url
    : null

  const ctaUrl = plan.affiliate?.url || `/api/redirect/${plan.id}`

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-cyan-400 transition-colors">Strona główna</Link>
        <span>/</span>
        <Link href={`/${catSlug}`} className="hover:text-cyan-400 transition-colors">{cat?.name || catSlug}</Link>
        <span>/</span>
        <Link href={`/${catSlug}/${citySlug}`} className="hover:text-cyan-400 transition-colors capitalize">{citySlug.replace(/-/g, ' ')}</Link>
        <span>/</span>
        <span className="text-gray-400">{plan.name}</span>
      </nav>

      {/* Plan Card */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo */}
          <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 flex items-center justify-center p-2 shadow-inner mx-auto md:mx-0">
            {logoUrl ? (
              <Image src={logoUrl} alt={operator?.name || ''} width={64} height={64} className="object-contain" />
            ) : (
              <span className="text-gray-800 font-bold text-xl">{operator?.name?.charAt(0) || '?'}</span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{plan.name}</h1>
            <p className="text-gray-400 mb-4">{operator?.name} • {plan.technology?.toUpperCase()}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="glass-card p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-cyan-400">{plan.speeds?.download}</div>
                <div className="text-xs text-gray-400">Mbps pobieranie</div>
              </div>
              {plan.speeds?.upload && (
                <div className="glass-card p-3 rounded-xl text-center">
                  <div className="text-2xl font-bold text-cyan-400">{plan.speeds.upload}</div>
                  <div className="text-xs text-gray-400">Mbps wysyłanie</div>
                </div>
              )}
              <div className="glass-card p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-white">{plan.pricing?.priceMonthly} zł</div>
                <div className="text-xs text-gray-400">miesięcznie</div>
              </div>
              <div className="glass-card p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-white">
                  {plan.contract?.months === '0' ? 'Brak' : `${plan.contract?.months} msc`}
                </div>
                <div className="text-xs text-gray-400">umowa</div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="glass-card p-4 rounded-xl mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Szczegóły cenowe</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">Cena miesięczna:</div>
                <div className="text-white font-medium">{plan.pricing?.priceMonthly} zł</div>
                {plan.pricing?.pricePromo && (
                  <>
                    <div className="text-gray-400">Cena promocyjna:</div>
                    <div className="text-green-400 font-medium">{plan.pricing.pricePromo} zł ({plan.pricing.promoMonths || '?'} msc)</div>
                  </>
                )}
                {plan.pricing?.activationFee != null && (
                  <>
                    <div className="text-gray-400">Aktywacja:</div>
                    <div className="text-white">{plan.pricing.activationFee === 0 ? 'Za darmo' : `${plan.pricing.activationFee} zł`}</div>
                  </>
                )}
                {plan.pricing?.installationFee != null && (
                  <>
                    <div className="text-gray-400">Instalacja:</div>
                    <div className="text-white">{plan.pricing.installationFee === 0 ? 'Za darmo' : `${plan.pricing.installationFee} zł`}</div>
                  </>
                )}
                {plan.pricing?.totalCost24m && (
                  <>
                    <div className="text-gray-400">Koszt 24 msc:</div>
                    <div className="text-white font-medium">{plan.pricing.totalCost24m} zł</div>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            {plan.extras?.features && plan.extras.features.length > 0 && (
              <div className="glass-card p-4 rounded-xl mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">W pakiecie</h3>
                <ul className="space-y-1">
                  {plan.extras.features.map((f, i) => (
                    <li key={f.id || i} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {f.feature}
                    </li>
                  ))}
                  {plan.contract?.freeRouterIncluded && (
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> Router Wi-Fi w cenie{plan.contract.routerModel ? ` (${plan.contract.routerModel})` : ''}
                    </li>
                  )}
                  {plan.extras?.includesTV && (
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> Telewizja{plan.extras.tvChannels ? ` (${plan.extras.tvChannels} kanałów)` : ''}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* CTA */}
            <Link
              href={ctaUrl}
              target="_blank"
              rel="nofollow noopener"
              className="inline-block w-full md:w-auto text-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg shadow-cyan-500/25"
            >
              {plan.display?.customCTA || 'Zamów ofertę'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ category: string; city: string; planSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, city, planSlug } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const planName = planSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${planName} - ${categoryName} ${cityName}`,
    description: `Szczegóły oferty ${planName} - ${categoryName} w ${cityName}.`,
  }
}

export default async function PlanPage({ params }: Props) {
  const { category, city, planSlug } = await params
  const categoryName = category.replace(/-/g, ' ')
  const cityName = city.replace(/-/g, ' ')
  const planName = planSlug.replace(/-/g, ' ')

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:text-blue-600">Strona główna</a>
        {' / '}
        <a href={`/${category}`} className="hover:text-blue-600 capitalize">{categoryName}</a>
        {' / '}
        <a href={`/${category}/${city}`} className="hover:text-blue-600 capitalize">{cityName}</a>
        {' / '}
        <span className="capitalize">{planName}</span>
      </nav>
      <h1 className="text-3xl font-bold mb-4 capitalize">{planName}</h1>
      <p className="text-gray-600 mb-8">
        {categoryName} w {cityName}
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Szczegóły oferty — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

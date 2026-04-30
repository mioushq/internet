import React from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ category: string; city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, city } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${categoryName} ${cityName} - Porównaj ceny`,
    description: `Porównaj oferty ${categoryName} w ${cityName}. Znajdź najlepszą cenę internetu.`,
  }
}

export default async function CityCategoryPage({ params }: Props) {
  const { category, city } = await params
  const categoryName = category.replace(/-/g, ' ')
  const cityName = city.replace(/-/g, ' ')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {categoryName} w {cityName}
      </h1>
      <p className="text-gray-600 mb-8">
        Porównaj oferty {categoryName} od wszystkich operatorów dostępnych w {cityName}.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Oferty per miasto+kategoria — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

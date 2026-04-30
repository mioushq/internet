import React from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `Internet w ${cityName} - Porównaj operatorów`,
    description: `Porównaj oferty internetu w ${cityName}. Światłowód, 5G, kabel — wszyscy operatorzy.`,
  }
}

export default async function CityLandingPage({ params }: Props) {
  const { city } = await params
  const cityName = city.replace(/-/g, ' ')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">Internet w {cityName}</h1>
      <p className="text-gray-600 mb-8">
        Porównaj oferty internetu od wszystkich operatorów dostępnych w {cityName}.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Landing page miasta — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

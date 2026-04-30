import React from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${name} - Oferty i ceny internetu`,
    description: `Sprawdź wszystkie oferty internetowe od ${name}. Porównaj ceny i prędkości.`,
  }
}

export default async function OperatorPage({ params }: Props) {
  const { slug } = await params
  const name = slug.replace(/-/g, ' ')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">{name} - Wszystkie oferty</h1>
      <p className="text-gray-600 mb-8">
        Porównaj wszystkie oferty internetu od {name}.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Strona operatora — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

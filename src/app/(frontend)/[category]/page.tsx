import React from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const name = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${name} - Porównaj oferty`,
    description: `Porównaj najlepsze oferty ${name} od wszystkich operatorów w Polsce.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const name = category.replace(/-/g, ' ')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">{name}</h1>
      <p className="text-gray-600 mb-8">
        Porównaj najlepsze oferty {name} od wszystkich operatorów w Polsce.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Lista ofert per kategoria — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

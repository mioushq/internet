import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wszystkie oferty internetu - Porównaj ceny',
  description: 'Porównaj wszystkie oferty internetu od polskich operatorów. Światłowód, 5G, kabel, LTE.',
}

export default function OfertyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Wszystkie oferty internetu</h1>
      <p className="text-gray-600 mb-8">
        Porównaj oferty internetu od wszystkich operatorów w Polsce. Filtruj po prędkości, cenie, technologii.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Lista ofert z filtrami — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internet w Twoim mieście - Porównaj oferty',
  description: 'Znajdź najlepszą ofertę internetu w Twoim mieście. Porównaj operatorów dostępnych w Twojej lokalizacji.',
}

export default function MiastaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Internet w Twoim mieście</h1>
      <p className="text-gray-600 mb-8">
        Wybierz miasto, aby zobaczyć dostępnych operatorów i porównać oferty.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Lista miast — komponenty frontend (faza 2)
      </div>
    </div>
  )
}

import React from 'react'

export const metadata = {
  title: 'Porównywarka Internetu - Porównaj ceny światłowodu i internetu w Polsce',
  description:
    'Porównaj ceny internetu światłowodowego, 5G i kablowego od wszystkich operatorów w Polsce. Znajdź najlepszą ofertę.',
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Porównaj ceny internetu w Polsce
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Znajdź najlepszą ofertę internetu światłowodowego, 5G i kablowego. 
        Porównuj ceny, prędkości i warunki umowy od wszystkich operatorów.
      </p>
      <div className="text-center text-gray-400 py-16 border-2 border-dashed rounded-lg">
        Porównywarka ofert — komponenty zostaną dodane w fazie frontend
      </div>
    </div>
  )
}

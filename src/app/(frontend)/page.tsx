import React from 'react'
import HeroSearch from '@/components/home/HeroSearch'
import CategoryCard from '@/components/home/CategoryCard'
import OfferCard from '@/components/comparison/OfferCard'

export const metadata = {
  title: 'Porównywarka Internetu - Porównaj ceny światłowodu i internetu w Polsce',
  description: 'Porównaj ceny internetu światłowodowego, 5G i kablowego od wszystkich operatorów w Polsce. Znajdź najlepszą ofertę.',
}

export default function HomePage() {
  // Przykładowe dane do mockupu wizualnego - docelowo z payload.find()
  const mockPlan = {
    id: '1',
    name: 'Internet Światłowodowy 300 Mb/s',
    technology: 'ftth',
    speeds_download: 300,
    speeds_upload: 100,
    contract_months: 24,
    contract_freeRouterIncluded: true,
    pricing_priceMonthly: 49.99,
    pricing_activationFee: 0,
    display_badge: 'Bestseller',
    display_badgeColor: '#06b6d4',
  }

  const mockOperator = {
    name: 'Orange',
    logoUrl: null, // brak zdjęcia w tej chwili, pokaże nazwę tekstową
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <HeroSearch />
      
      {/* Sekcja Kategorii */}
      <section className="mt-20 max-w-5xl mx-auto animate-[fade-in_0.5s_ease-out_0.2s_both]">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Wybierz technologię</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard 
            title="Światłowód" 
            description="Najszybszy i najbardziej stabilny internet do domu."
            href="/internet-swiatlowodowy"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            }
          />
          <CategoryCard 
            title="Internet 5G" 
            description="Szybki internet bezprzewodowy bez kabli i wiercenia."
            href="/internet-5g"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
            }
          />
          <CategoryCard 
            title="Internet Kablowy" 
            description="Niezawodne łącze w blokach i na osiedlach."
            href="/internet-kablowy"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            }
          />
        </div>
      </section>

      {/* Sekcja Ofert Promowanych */}
      <section className="mt-20 max-w-5xl mx-auto animate-[fade-in_0.5s_ease-out_0.4s_both]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Polecane oferty</h2>
          <a href="/oferty" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">Zobacz wszystkie →</a>
        </div>
        <div className="flex flex-col gap-4">
          <OfferCard plan={mockPlan} operator={mockOperator} />
          <OfferCard 
            plan={{...mockPlan, id: '2', name: 'Internet 5G Premium', technology: '5g', speeds_download: 500, pricing_priceMonthly: 69.99, display_badge: 'Nowość', display_badgeColor: '#8b5cf6'}} 
            operator={{...mockOperator, name: 'T-Mobile'}} 
          />
          <OfferCard 
            plan={{...mockPlan, id: '3', name: 'Światłowód Max', speeds_download: 1000, pricing_priceMonthly: 89.99, display_badge: null}} 
            operator={{...mockOperator, name: 'Play'}} 
          />
        </div>
      </section>
    </div>
  )
}

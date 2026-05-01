import React from 'react';
import HeroSearch from '@/components/home/HeroSearch';
import CategoryCard from '@/components/home/CategoryCard';
import OfferCard from '@/components/comparison/OfferCard';
import { getPayloadClient } from '@/lib/payload';

export const metadata = {
  title: 'Porównywarka Internetu - Porównaj ceny światłowodu i internetu w Polsce',
  description: 'Porównaj ceny internetu światłowodowego, 5G i kablowego od wszystkich operatorów w Polsce. Znajdź najlepszą ofertę.',
};

export default async function HomePage() {
  const payload = await getPayloadClient();

  // Pobranie kategorii
  const categoriesRes = await payload.find({
    collection: 'categories',
    where: {
      isActive: { equals: true },
    },
    sort: 'sortOrder',
  });
  const categories = categoriesRes.docs;

  // Pobranie promowanych ofert
  const plansRes = await payload.find({
    collection: 'plans',
    where: {
      'availability.isPromoted': { equals: true },
      'availability.isActive': { equals: true },
    },
    sort: '-display.sortOrder',
    limit: 3,
    depth: 1,
  });
  const promotedPlans = plansRes.docs;

  return (
    <div className="container mx-auto px-4 pb-20">
      <HeroSearch />
      
      {/* Sekcja Kategorii */}
      <section className="mt-20 max-w-5xl mx-auto animate-[fade-in_0.5s_ease-out_0.2s_both]">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Wybierz technologię</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
          {categories.length === 0 && (
             <div className="col-span-3 text-center text-gray-400 py-10 glass-panel rounded-2xl border-dashed">
               Brak kategorii w bazie. Skonfiguruj CMS.
             </div>
          )}
        </div>
      </section>

      {/* Sekcja Ofert Promowanych */}
      <section className="mt-20 max-w-5xl mx-auto animate-[fade-in_0.5s_ease-out_0.4s_both]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Polecane oferty</h2>
          <a href="/oferty" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">Zobacz wszystkie →</a>
        </div>
        <div className="flex flex-col gap-4">
          {promotedPlans.map((plan) => (
            <OfferCard key={plan.id} plan={plan} />
          ))}
          {promotedPlans.length === 0 && (
             <div className="text-center text-gray-400 py-10 glass-panel rounded-2xl border-dashed">
               Brak polecanych ofert. Zaznacz 'Promowana na stronie głównej' w CMS.
             </div>
          )}
        </div>
      </section>
    </div>
  );
}

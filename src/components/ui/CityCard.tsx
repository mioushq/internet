import React from 'react';
import Link from 'next/link';
import type { City } from '@/payload-types';

interface CityCardProps {
  city: City;
  planCount?: number;
}

const VOIVODESHIP_LABELS: Record<string, string> = {
  'dolnoslaskie': 'dolnośląskie',
  'kujawsko-pomorskie': 'kujawsko-pomorskie',
  'lubelskie': 'lubelskie',
  'lubuskie': 'lubuskie',
  'lodzkie': 'łódzkie',
  'malopolskie': 'małopolskie',
  'mazowieckie': 'mazowieckie',
  'opolskie': 'opolskie',
  'podkarpackie': 'podkarpackie',
  'podlaskie': 'podlaskie',
  'pomorskie': 'pomorskie',
  'slaskie': 'śląskie',
  'swietokrzyskie': 'świętokrzyskie',
  'warminsko-mazurskie': 'warmińsko-mazurskie',
  'wielkopolskie': 'wielkopolskie',
  'zachodniopomorskie': 'zachodniopomorskie',
};

export default function CityCard({ city, planCount }: CityCardProps) {
  return (
    <Link
      href={`/miasta/${city.slug}`}
      className="glass-card p-5 flex flex-col group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
          {city.name}
        </h3>
        {city.isMainCity && (
          <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
            Wojewódzkie
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-3 capitalize">
        woj. {VOIVODESHIP_LABELS[city.voivodeship] || city.voivodeship}
      </p>

      <div className="mt-auto flex items-center justify-between text-sm">
        {city.population && (
          <span className="text-gray-500">
            {city.population.toLocaleString('pl-PL')} mieszk.
          </span>
        )}
        {typeof planCount === 'number' && (
          <span className="text-cyan-400 font-medium">
            {planCount} {planCount === 1 ? 'oferta' : planCount < 5 ? 'oferty' : 'ofert'}
          </span>
        )}
      </div>
    </Link>
  );
}

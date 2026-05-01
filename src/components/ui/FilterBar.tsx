"use client";

import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface FilterBarProps {
  operators?: { id: number; name: string; slug: string }[];
  technologies?: string[];
  showCity?: boolean;
}

const TECHNOLOGY_LABELS: Record<string, string> = {
  ftth: 'Światłowód (FTTH)',
  fttb: 'Światłowód (FTTB)',
  hfc: 'Kabel (HFC)',
  '5g': '5G',
  lte: 'LTE',
  dsl: 'DSL',
  satellite: 'Satelita',
};

export default function FilterBar({ operators = [], technologies = [] }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minSpeed, setMinSpeed] = useState(searchParams.get('minSpeed') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [technology, setTechnology] = useState(searchParams.get('technology') || '');
  const [operator, setOperator] = useState(searchParams.get('operator') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'display.sortOrder');

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (minSpeed) params.set('minSpeed', minSpeed);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (technology) params.set('technology', technology);
    if (operator) params.set('operator', operator);
    if (sort && sort !== 'display.sortOrder') params.set('sort', sort);
    
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  }, [minSpeed, maxPrice, technology, operator, sort, pathname, router]);

  const clearFilters = useCallback(() => {
    setMinSpeed('');
    setMaxPrice('');
    setTechnology('');
    setOperator('');
    setSort('display.sortOrder');
    router.push(pathname);
  }, [pathname, router]);

  const hasFilters = minSpeed || maxPrice || technology || operator;

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Prędkość min */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-medium">Min. prędkość</label>
          <select
            value={minSpeed}
            onChange={(e) => setMinSpeed(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
          >
            <option value="">Dowolna</option>
            <option value="50">50+ Mbps</option>
            <option value="100">100+ Mbps</option>
            <option value="300">300+ Mbps</option>
            <option value="500">500+ Mbps</option>
            <option value="1000">1000+ Mbps</option>
          </select>
        </div>

        {/* Cena max */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-medium">Max. cena</label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
          >
            <option value="">Dowolna</option>
            <option value="40">do 40 zł</option>
            <option value="60">do 60 zł</option>
            <option value="80">do 80 zł</option>
            <option value="100">do 100 zł</option>
            <option value="150">do 150 zł</option>
          </select>
        </div>

        {/* Technologia */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-medium">Technologia</label>
          <select
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
          >
            <option value="">Wszystkie</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {TECHNOLOGY_LABELS[tech] || tech.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Operator */}
        {operators.length > 0 && (
          <div>
            <label className="block text-xs text-gray-400 mb-1 font-medium">Operator</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
            >
              <option value="">Wszyscy</option>
              {operators.map((op) => (
                <option key={op.id} value={String(op.id)}>
                  {op.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sortowanie */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-medium">Sortuj</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
          >
            <option value="display.sortOrder">Polecane</option>
            <option value="pricing.priceMonthly">Cena: rosnąco</option>
            <option value="-pricing.priceMonthly">Cena: malejąco</option>
            <option value="-speeds.download">Prędkość: najszybsze</option>
            <option value="-createdAt">Najnowsze</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={applyFilters}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-full text-sm transition-all shadow-lg shadow-cyan-500/25"
        >
          Filtruj
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-white text-sm transition-colors px-4 py-2"
          >
            Wyczyść filtry
          </button>
        )}
      </div>
    </div>
  );
}

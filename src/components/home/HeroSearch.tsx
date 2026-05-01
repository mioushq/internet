"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CityOption {
  name: string;
  slug: string;
  voivodeship: string;
}

interface HeroSearchProps {
  cities?: CityOption[];
}

export default function HeroSearch({ cities = [] }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2 || cities.length === 0) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = cities
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 6);
    setSuggestions(filtered);
    setSelectedIdx(-1);
    setShowSuggestions(filtered.length > 0);
  }, [query, cities]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToCity = (slug: string) => {
    setShowSuggestions(false);
    router.push(`/miasta/${slug}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIdx >= 0 && suggestions[selectedIdx]) {
      navigateToCity(suggestions[selectedIdx].slug);
      return;
    }
    if (query.trim()) {
      const slug = query.trim().toLowerCase()
        .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
        .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
        .replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigateToCity(slug);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center mt-12 md:mt-24 px-4 animate-[fade-in_0.5s_ease-out]">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Znajdź najlepszy <br className="hidden md:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Internet w swojej okolicy
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        Porównaj oferty światłowodu, 5G i internetu kablowego od czołowych operatorów i wybierz najkorzystniejszy pakiet.
      </p>

      <div ref={wrapperRef} className="relative max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-6 h-6 text-gray-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            className="w-full glass-panel pl-12 pr-32 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all placeholder-gray-400 text-white"
            placeholder="Wpisz nazwę miasta..."
            autoComplete="off"
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg shadow-cyan-500/25"
          >
            Szukaj
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 glass-panel rounded-2xl overflow-hidden">
            {suggestions.map((city, idx) => (
              <button
                key={city.slug}
                onClick={() => navigateToCity(city.slug)}
                className={`w-full px-5 py-3 text-left flex items-center justify-between transition-colors ${
                  idx === selectedIdx ? 'bg-white/15 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="font-medium">{city.name}</span>
                <span className="text-xs text-gray-500 capitalize">woj. {city.voivodeship.replace(/-/g, ' ')}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      const slug = city.trim().toLowerCase().replace(/\s+/g, '-');
      router.push(`/miasta/${slug}`);
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

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-gray-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full glass-panel pl-12 pr-32 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all placeholder-gray-400 text-white"
          placeholder="Wpisz nazwę miasta..."
          required
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg shadow-cyan-500/25"
        >
          Szukaj
        </button>
      </form>
    </div>
  );
}

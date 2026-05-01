import React from 'react';
import Link from 'next/link';
import { Wifi, Signal, Cable, Satellite, Radio, Smartphone, Globe, Home } from 'lucide-react';
import type { Category } from '@/payload-types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const renderIcon = (iconName: string | null | undefined) => {
    switch (iconName) {
      case 'wifi': return <Wifi className="w-8 h-8" strokeWidth={1.5} />;
      case 'signal': return <Signal className="w-8 h-8" strokeWidth={1.5} />;
      case 'cable': return <Cable className="w-8 h-8" strokeWidth={1.5} />;
      case 'satellite': return <Satellite className="w-8 h-8" strokeWidth={1.5} />;
      case 'smartphone': return <Smartphone className="w-8 h-8" strokeWidth={1.5} />;
      case 'radio': return <Radio className="w-8 h-8" strokeWidth={1.5} />;
      case 'home': return <Home className="w-8 h-8" strokeWidth={1.5} />;
      default: return <Globe className="w-8 h-8" strokeWidth={1.5} />;
    }
  };

  return (
    <Link 
      href={`/${category.urlPrefix}`} 
      className="glass-card p-6 flex flex-col items-center text-center group h-full"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300 shadow-inner">
        {renderIcon(category.icon)}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{category.name}</h3>
      <p className="text-sm text-gray-400 mb-6 flex-grow">{category.shortDescription || 'Sprawdź oferty w tej kategorii.'}</p>
      
      <div className="mt-auto px-6 py-2 rounded-full border border-white/20 text-sm font-semibold group-hover:bg-white/10 transition-colors w-full text-white">
        Sprawdź oferty
      </div>
    </Link>
  );
}

import React from 'react';
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function CategoryCard({ title, description, icon, href }: CategoryCardProps) {
  return (
    <Link 
      href={href} 
      className="glass-card p-6 flex flex-col items-center text-center group h-full"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 flex-grow">{description}</p>
      
      <div className="mt-auto px-6 py-2 rounded-full border border-white/20 text-sm font-semibold group-hover:bg-white/10 transition-colors w-full text-white">
        Sprawdź oferty
      </div>
    </Link>
  );
}

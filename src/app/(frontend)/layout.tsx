import React from 'react'
import '@/app/globals.css'
import Link from 'next/link'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-gradient-to-br from-brand-blue via-gray-900 to-brand-purple bg-fixed text-gray-100 flex flex-col">
        {/* Sticky Header - Glassmorphism */}
        <header className="sticky top-0 z-50 glass-panel border-b-0 border-white/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Porównywarka
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/internet-swiatlowodowy" className="hover:text-brand-cyan-light transition-colors">Światłowód</Link>
              <Link href="/internet-5g" className="hover:text-brand-cyan-light transition-colors">Internet 5G</Link>
              <Link href="/internet-kablowy" className="hover:text-brand-cyan-light transition-colors">Kabel</Link>
              <Link href="/oferty" className="hover:text-brand-cyan-light transition-colors">Oferty</Link>
              <Link href="/miasta" className="hover:text-brand-cyan-light transition-colors">Miasta</Link>
            </nav>
            <div className="hidden md:block">
              <button className="bg-brand-cyan hover:bg-brand-cyan-light text-brand-blue font-semibold px-4 py-2 rounded-full transition-all shadow-lg shadow-cyan-500/30">
                Sprawdź adres
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-0">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 py-8 mt-12 hidden md:block">
          <div className="container mx-auto px-4 text-center text-sm text-gray-400">
            © 2025 Porównywarka Internetu. Wszelkie prawa zastrzeżone.
          </div>
        </footer>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t-0 rounded-t-2xl z-50">
          <div className="flex justify-around items-center p-3">
            <Link href="/" className="flex flex-col items-center text-brand-cyan-light">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/oferty" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <span className="text-[10px] font-medium">Oferty</span>
            </Link>
            <Link href="/miasta" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[10px] font-medium">Miasta</span>
            </Link>
            <Link href="/search" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span className="text-[10px] font-medium">Szukaj</span>
            </Link>
          </div>
        </nav>
      </body>
    </html>
  )
}

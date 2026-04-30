import React from 'react'
import '@/app/globals.css'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-blue-600">
                Porównywarka Internetu
              </a>
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/internet-swiatlowodowy" className="hover:text-blue-600">Światłowód</a>
                <a href="/internet-5g" className="hover:text-blue-600">Internet 5G</a>
                <a href="/internet-kablowy" className="hover:text-blue-600">Internet kablowy</a>
                <a href="/oferty" className="hover:text-blue-600">Wszystkie oferty</a>
                <a href="/miasta" className="hover:text-blue-600">Miasta</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-gray-50 py-8">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              © 2025 Porównywarka Internetu. Wszelkie prawa zastrzeżone.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

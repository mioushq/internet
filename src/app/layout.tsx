import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Porównywarka Internetu - Porównaj ceny światłowodu i internetu w Polsce',
    template: '%s | Porównywarka Internetu',
  },
  description:
    'Porównaj ceny internetu światłowodowego, 5G i kablowego od wszystkich operatorów w Polsce. Znajdź najlepszą ofertę dla siebie.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Porównywarka Internetu',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

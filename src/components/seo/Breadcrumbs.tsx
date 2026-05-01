import React from 'react'
import Link from 'next/link'
import JsonLd, { breadcrumbSchema } from './JsonLd'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://porownywarka-internetu.pl'

  const allItems = [{ label: 'Strona główna', href: '/' }, ...items]

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: `${baseUrl}${item.href}`,
  }))

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-1">
        {allItems.map((item, idx) => (
          <React.Fragment key={item.href}>
            {idx > 0 && <span className="mx-1">/</span>}
            {idx < allItems.length - 1 ? (
              <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  )
}

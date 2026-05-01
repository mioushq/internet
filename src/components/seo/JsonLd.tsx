import React from 'react'

interface JsonLdProps {
  data: Record<string, unknown>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function offerSchema(plan: {
  name: string
  price: number
  operatorName: string
  speed: number
  url: string
  technology: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: plan.name,
    brand: {
      '@type': 'Brand',
      name: plan.operatorName,
    },
    category: `Internet ${plan.technology.toUpperCase()}`,
    offers: {
      '@type': 'Offer',
      price: plan.price,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      url: plan.url,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Download Speed',
        value: `${plan.speed} Mbps`,
        unitCode: 'MBit/s',
      },
    ],
  }
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function organizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://porownywarka-internetu.pl'
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Porównywarka Internetu',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Polish',
    },
  }
}

export function websiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://porownywarka-internetu.pl'
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Porównywarka Internetu',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/miasta/{city}`,
      },
      'query-input': 'required name=city',
    },
  }
}

# Snapshot v1.5.0

**Data:** 2025-05-01  
**TypeScript errors:** 0

## Statystyki

| Metryka | Wartość |
|---------|--------|
| Pliki TS/TSX | 71 |
| Pliki CSS/SCSS | 2 |
| Kolekcje CMS | 19 |
| Globale CMS | 3 |
| API routes | 9 |
| Komponenty React | 8 |
| Komponenty SEO | 2 |
| Biblioteki (src/lib) | 11 |
| Scheduled jobs | 5 |
| Strony z generateStaticParams | 4 |
| Schema.org types | 5 (WebSite, Organization, Product, Offer, BreadcrumbList) |

## Zależności kluczowe

| Pakiet | Wersja |
|--------|--------|
| next | ^16.2.4 |
| payload | ^3.84.1 |
| react | ^19.2.5 |
| tailwindcss | ^4.2.4 |
| lucide-react | ^0.510.0 |

## Nowe w v1.5.0

```
src/components/seo/
├── Breadcrumbs.tsx              ← Reusable breadcrumbs + BreadcrumbList schema
└── JsonLd.tsx                   ← JSON-LD component + 5 schema helpers
public/
└── robots.txt                   ← SEO crawling rules
```

## Strony z generateStaticParams

- `/[category]` → all active categories
- `/[category]/[city]` → categories × main cities
- `/miasta/[city]` → all active cities
- `/operator/[slug]` → all active operators

## Breadcrumbs na stronach

- `/[category]` → Home / Kategoria
- `/[category]/[city]` → Home / Kategoria / Miasto
- `/[category]/[city]/[plan]` → Home / Kategoria / Miasto / Plan
- `/miasta/[city]` → Home / Miasta / Miasto
- `/operator/[slug]` → Home / Operator

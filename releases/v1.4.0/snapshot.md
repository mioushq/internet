# Snapshot v1.4.0

**Data:** 2025-05-01  
**TypeScript errors:** 0  
**Node.js:** v22+

## Statystyki

| Metryka | Wartość |
|---------|--------|
| Pliki TS/TSX | 69 |
| Pliki CSS/SCSS | 2 |
| Kolekcje CMS | 19 |
| Globale CMS | 3 |
| API routes | 9 |
| Komponenty React | 6 |
| Biblioteki (src/lib) | 11 |
| Scheduled jobs | 5 |

## Zależności kluczowe

| Pakiet | Wersja |
|--------|--------|
| next | ^16.2.4 |
| payload | ^3.84.1 |
| react | ^19.2.5 |
| tailwindcss | ^4.2.4 |
| lucide-react | ^0.510.0 |
| @payloadcms/db-postgres | ^3.x |
| @payloadcms/richtext-lexical | ^3.x |
| sharp | ^0.33.x |

## Struktura plików

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── [category]/
│   │   │   ├── [city]/
│   │   │   │   ├── [planSlug]/page.tsx     ← Strona planu (CMS)
│   │   │   │   └── page.tsx                ← Kategoria+miasto (CMS)
│   │   │   └── page.tsx                    ← Kategoria (CMS)
│   │   ├── miasta/
│   │   │   ├── [city]/page.tsx             ← Landing miasta (CMS)
│   │   │   └── page.tsx                    ← Lista miast (CMS)
│   │   ├── oferty/page.tsx                 ← Oferty + filtry (CMS)
│   │   ├── operator/[slug]/page.tsx        ← Profil operatora (CMS)
│   │   ├── layout.tsx                      ← Frontend layout (glassmorphism)
│   │   └── page.tsx                        ← Homepage (CMS)
│   ├── (payload)/
│   │   ├── admin/[[...segments]]/          ← Payload CMS admin
│   │   ├── api/[...slug]/route.ts          ← Payload REST/GraphQL
│   │   ├── custom.scss                     ← CMS dark theme branding
│   │   └── layout.tsx
│   ├── api/
│   │   ├── click-track/route.ts
│   │   ├── compare/route.ts
│   │   ├── cron/route.ts
│   │   ├── price-alerts/route.ts
│   │   ├── public/plans/route.ts
│   │   ├── redirect/[id]/route.ts
│   │   ├── reviews/route.ts
│   │   ├── sitemap/route.ts
│   │   └── stats/[citySlug]/route.ts
│   ├── globals.css
│   └── layout.tsx
├── collections/                            ← 19 kolekcji Payload CMS
├── components/
│   ├── admin/Logo.tsx
│   ├── comparison/OfferCard.tsx
│   ├── home/
│   │   ├── CategoryCard.tsx
│   │   └── HeroSearch.tsx                  ← z autocomplete miast
│   └── ui/
│       ├── CityCard.tsx                    ← NEW
│       └── FilterBar.tsx                   ← NEW
├── globals/                                ← 3 globale (SiteSettings, ComparisonConfig, Navigation)
├── jobs/                                   ← 5 scheduled jobs
├── lib/                                    ← 11 bibliotek utility
└── payload-types.ts                        ← Auto-generated types
```

## Kolekcje CMS (19)

Users, Media, Operators, Plans, Categories, Cities, CityLandingPages, Promotions, ClickEvents, AffiliateLinks, BoxDisplayConfig, Pages, Reviews, BlogPosts, BlogCategories, SpeedStats, PriceAlerts, Comparisons, AnalyticsDaily

## Globale CMS (3)

SiteSettings, ComparisonConfig, Navigation

## API Routes (9)

click-track, compare, cron, price-alerts, public/plans, redirect/[id], reviews, sitemap, stats/[citySlug]

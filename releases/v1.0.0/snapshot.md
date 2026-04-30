# Snapshot — v1.0.0

**Data:** 2025-04-30  
**TypeScript:** ✅ 0 błędów (`npx tsc --noEmit`)  
**Next.js dev:** ✅ Frontend 200 OK  
**Admin panel:** ⚠️ Wymaga PostgreSQL  

## Zależności

| Pakiet | Wersja |
|--------|--------|
| next | ^16.2.4 |
| payload | ^3.84.1 |
| react | ^19.2.5 |
| tailwindcss | ^4.2.4 |
| typescript | ^6.0.3 |
| @payloadcms/db-postgres | ^3.84.1 |
| @payloadcms/richtext-lexical | ^3.84.1 |

## Statystyki

| Metryka | Wartość |
|---------|--------|
| Pliki źródłowe (src/) | 39 |
| Kolekcje CMS | 12 |
| Globale CMS | 3 |
| Custom API routes | 2 |
| Lib utilities | 5 |
| Frontend pages | 9 |
| Seed: operatorzy | 12 |
| Seed: miasta | 50 |
| Seed: kategorie | 6 |
| Seed: oferty | 19 |

## Pełna lista plików

```
payload.config.ts
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── (frontend)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [category]/page.tsx
│   │   ├── [category]/[city]/page.tsx
│   │   ├── [category]/[city]/[planSlug]/page.tsx
│   │   ├── operator/[slug]/page.tsx
│   │   ├── oferty/page.tsx
│   │   ├── miasta/page.tsx
│   │   └── miasta/[city]/page.tsx
│   ├── (payload)/
│   │   ├── layout.tsx
│   │   ├── custom.scss
│   │   ├── admin/importMap.js
│   │   ├── admin/[[...segments]]/page.tsx
│   │   ├── admin/[[...segments]]/not-found.tsx
│   │   └── api/[...slug]/route.ts
│   └── api/
│       ├── click-track/route.ts
│       └── redirect/[id]/route.ts
├── collections/
│   ├── AffiliateLinks.ts
│   ├── BoxDisplayConfig.ts
│   ├── Categories.ts
│   ├── Cities.ts
│   ├── CityLandingPages.ts
│   ├── ClickEvents.ts
│   ├── Media.ts
│   ├── Operators.ts
│   ├── Pages.ts
│   ├── Plans.ts
│   ├── Promotions.ts
│   └── Users.ts
├── globals/
│   ├── ComparisonConfig.ts
│   ├── Navigation.ts
│   └── SiteSettings.ts
├── lib/
│   ├── affiliate.ts
│   ├── payload.ts
│   ├── slugify.ts
│   ├── tracking.ts
│   └── url-builder.ts
└── payload-types.ts

seed/seed.ts
docs/
├── AI_AGENTS.md
├── API_SPEC.md
├── CHANGELOG.md
├── DB_SCHEMA.md
└── URL_STRUCTURE.md
```

## Konfiguracja

```
docker-compose.yml        (dev)
docker-compose.prod.yml   (production)
Dockerfile                (standalone)
.env / .env.example
tsconfig.json
next.config.ts
postcss.config.mjs
```

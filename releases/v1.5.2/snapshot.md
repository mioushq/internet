# Snapshot v1.5.2

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

## Zależności kluczowe

| Pakiet | Wersja |
|--------|--------|
| next | ^16.2.4 |
| payload | ^3.84.1 |
| @payloadcms/next | ^3.84.1 |
| react | ^19.2.5 |
| tailwindcss | ^4.2.4 |
| sass | (transitive via payload) |

## Bugi naprawione w tym release

| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Panel /admin bez styli CSS | `@payloadcms/next` nie importuje własnych prekompilowanych styli + brak importu `@payloadcms/ui/scss/app.scss` w skompilowanym JS | Dodano `import '@payloadcms/next/css'` + `import '@payloadcms/ui/scss/app.scss'` w `(payload)/layout.tsx` |

## Ukończone Milestones

### Milestone 1: Spięcie Frontend ↔ CMS ✅ (v1.4.0)
- `/oferty`, `/miasta`, `/miasta/[city]`, `/[category]`, `/[category]/[city]`, `/[category]/[city]/[planSlug]`, `/operator/[slug]`
- HeroSearch, FilterBar, CityCard components
- CMS admin branding (custom.scss)

### Milestone 2: SEO + Static Generation ✅ (v1.5.0)
- `generateStaticParams` na 4 stronach
- Schema.org: WebSite, Organization, Product, Offer, BreadcrumbList
- `JsonLd` + `Breadcrumbs` reusable components
- `robots.txt`

## Pending Milestones

### Milestone 3: Porównywarka + Opinie + Blog (NASTĘPNY → v1.6.0)
1. ComparisonTable — porównanie ofert side-by-side
2. Formularz dodawania opinii (Reviews)
3. Blog — lista artykułów + strona artykułu
4. Porównywarka URL `/porownaj?plans=id1,id2,id3`

### Milestone 4: Analytics + Monetyzacja
### Milestone 5: Performance + Deploy

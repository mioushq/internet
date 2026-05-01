# Snapshot v1.5.1

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
| react | ^19.2.5 |
| tailwindcss | ^4.2.4 |

## Znane bugi

| Bug | Status | Priorytet |
|-----|--------|-----------|
| Panel /admin nie ładuje styli CSS | OTWARTY | KRYTYCZNY |

## Ukończone Milestones

### Milestone 1: Spięcie Frontend ↔ CMS ✅
- `/oferty` — query plans + FilterBar + OfferCard + paginacja
- `/miasta` — query cities + CityCard grid
- `/miasta/[city]` — query city + plans per miasto
- `/[category]` — query category + plans
- `/[category]/[city]` — query category+city → plans
- `/[category]/[city]/[planSlug]` — plan detail page
- `/operator/[slug]` — query operator + plans + reviews
- `HeroSearch` — autocomplete z miast CMS + slugify
- `FilterBar` — komponent filtrowania
- `CMS admin custom.scss` — brand colors (partial — bug)

### Milestone 2: SEO + Static Generation ✅
- `generateStaticParams` na 4 stronach
- Schema.org: WebSite, Organization, Product, Offer, BreadcrumbList
- `JsonLd` + `Breadcrumbs` reusable components
- `robots.txt`

## Pending Milestones

### Milestone 3: Porównywarka + Opinie + Blog (NASTĘPNY)
- [ ] **BUG FIX: /admin panel styling** — FIRST PRIORITY
- [ ] ComparisonTable — porównanie ofert side-by-side
- [ ] Formularz dodawania opinii (Reviews)
- [ ] Blog — lista artykułów + strona artykułu
- [ ] Porównywarka URL `/porownaj?plans=id1,id2,id3`

### Milestone 4: Analytics + Monetyzacja
- [ ] Click tracking dashboard
- [ ] Affiliate redirect optimization
- [ ] A/B testing boxów
- [ ] Google Analytics integration

### Milestone 5: Performance + Deploy
- [ ] Image optimization (next/image + sharp)
- [ ] Caching strategy (ISR + revalidate)
- [ ] Docker production build
- [ ] CI/CD pipeline
- [ ] Monitoring + error tracking

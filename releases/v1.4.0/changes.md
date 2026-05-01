# Changes v1.4.0 (vs v1.3.1)

**Data:** 2025-05-01

## Nowe pliki

| Plik | Opis |
|------|------|
| `src/components/ui/FilterBar.tsx` | Client component — filtrowanie ofert (prędkość, cena, technologia, operator, sort) |
| `src/components/ui/CityCard.tsx` | Karta miasta z badge, populacją, voivodeship labels |

## Zmodyfikowane pliki

| Plik | Zmiana |
|------|--------|
| `src/app/(frontend)/page.tsx` | Dodano query cities do autocomplete, przekazanie do HeroSearch |
| `src/app/(frontend)/oferty/page.tsx` | Pełna integracja z CMS: query plans z filtrami, FilterBar, OfferCard, paginacja |
| `src/app/(frontend)/miasta/page.tsx` | Query cities z CMS, podział na wojewódzkie/pozostałe, CityCard grid |
| `src/app/(frontend)/miasta/[city]/page.tsx` | Query city + plans per miasto, operatorzy, populacja, notFound() |
| `src/app/(frontend)/[category]/page.tsx` | Query category + plans, SEO templates (metaTitle/metaDescription), notFound() |
| `src/app/(frontend)/[category]/[city]/page.tsx` | Query category+city → plans, h1Template, SEO templates z {{city}}/{{category}} |
| `src/app/(frontend)/[category]/[city]/[planSlug]/page.tsx` | Pełna strona planu: specs grid, ceny, features, breadcrumbs, CTA, logo operatora |
| `src/app/(frontend)/operator/[slug]/page.tsx` | Profil operatora: logo, rating, plany, opinie użytkowników |
| `src/components/home/HeroSearch.tsx` | Autocomplete z miast CMS, strzałki nawigacji, Escape, polish slugify, click outside |
| `src/app/(payload)/custom.scss` | Dark theme: brand colors, gradient buttons, accent nav, card hover effects |
| `package.json` | Bump version 1.3.1 → 1.4.0 |

## Usunięte pliki

Brak.

## Breaking Changes

Brak. Wszystkie zmiany są addytywne.

## Statystyki

- Plików TypeScript/TSX: 69
- Kolekcji CMS: 19
- Globali: 3
- API routes: 9
- Komponentów React: 6
- TypeScript errors: 0

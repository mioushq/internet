# Release v1.5.0 — SEO + Static Generation (Milestone 2)

**Data:** 2025-05-01

## Podsumowanie

Pełna optymalizacja SEO: generateStaticParams na wszystkich dynamicznych stronach, Schema.org structured data (WebSite, Organization, Product/Offer, BreadcrumbList), reusable Breadcrumbs component, robots.txt.

## Nowe Funkcje

### Static Generation (ISR-ready):
- `generateStaticParams` na `/[category]`, `/[category]/[city]`, `/miasta/[city]`, `/operator/[slug]`
- Główne miasta (isMainCity) pre-renderowane per kategoria

### Schema.org Structured Data:
- **WebSite** — SearchAction z templatem URL miast
- **Organization** — logo, kontakt, dane firmy
- **Product + Offer** — na stronie planu (cena, operator, prędkość)
- **BreadcrumbList** — na wszystkich podstronach

### Komponenty SEO:
- `JsonLd` — uniwersalny komponent do wstrzykiwania JSON-LD
- `Breadcrumbs` — reusable z automatycznym Schema.org BreadcrumbList
- Helpery: `offerSchema()`, `breadcrumbSchema()`, `faqSchema()`, `websiteSchema()`, `organizationSchema()`

### robots.txt:
- Blokuje `/admin`, `/api/` dla crawlerów
- Wskazuje sitemap

## Znane ograniczenia
- Sitemap URL w robots.txt wymaga aktualizacji domeny
- `generateStaticParams` dla `/[category]/[city]/[planSlug]` nie dodany (zbyt wiele kombinacji — ISR wystarczy)

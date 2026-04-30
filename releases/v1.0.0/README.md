# Release v1.0.0 — Inicjalizacja projektu

**Data:** 2025-04-30  
**Status:** ✅ Kompletny

## Co zawiera ten release

- Pełna inicjalizacja projektu Next.js 15 + Payload CMS 3.x + PostgreSQL
- 12 kolekcji CMS (Operators, Plans, Categories, Cities, CityLandingPages, Promotions, ClickEvents, AffiliateLinks, BoxDisplayConfig, Pages, Media, Users)
- 3 globale (SiteSettings, ComparisonConfig, Navigation)
- Custom API: click-track, affiliate redirect
- SEO-friendly URL routing
- Utilities: slugify (PL), url-builder, affiliate, tracking
- Seed data: 12 operatorów, 50 miast, 6 kategorii, 19 ofert
- Docker setup (dev + prod)
- Pełna dokumentacja

## Jak uruchomić

```bash
npm install
docker compose up postgres -d
npm run dev
npm run seed
```

## Znane problemy

- Panel admina (`/admin`) wymaga uruchomionego PostgreSQL — bez DB zwraca 500
- Frontend pages mają placeholder content (faza 2)
- Brak unit testów (do dodania w v1.1.0)

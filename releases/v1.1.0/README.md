# Release v1.1.0 — Rozbudowa Backendu + Automatyzacja

**Data:** 2025-05-01

## Co nowego

### Kolekcje CMS (+7, łącznie 19)
- **Reviews** — opinie z moderacją, auto-update ratingu operatora (afterChange hook)
- **BlogPosts** — artykuły z SEO, tagami, powiązanymi ofertami
- **BlogCategories** — kategorie bloga
- **SpeedStats** — statystyki prędkości per miasto (Ookla, UKE)
- **PriceAlerts** — alerty cenowe email
- **Comparisons** — zapisane porównania side-by-side
- **AnalyticsDaily** — dzienne agregaty kliknięć

### API Routes (+7)
- `GET/POST /api/reviews` — opinie (z honeypot antyspamem)
- `GET /api/compare?plans=id1,id2` — porównywarka (max 4)
- `GET /api/stats/[citySlug]` — statystyki miasta
- `POST/DELETE /api/price-alerts` — alerty cenowe
- `GET /api/public/plans` — publiczne API z filtrowaniem
- `GET /api/sitemap` — rozbudowany XML sitemap
- `GET /api/cron?job=NAME` — scheduled jobs endpoint

### Integracje zewnętrzne
- **GUS BDL API** — populacja miast, % z internetem
- **Ookla Speedtest Open Data** — średnie prędkości per miasto
- **SIDUSIS/UKE** — dostępność operatorów per adres

### Scheduled Jobs (5)
- `expire-promotions` (1h), `sync-gus` (24h), `sync-speedtest` (tydzień), `price-alerts` (24h), `aggregate-clicks` (24h)

### Utilities
- Rate limiting, LRU cache, webhooks (Discord/Slack), CSV price importer

## Jak uruchomić
```bash
docker compose up postgres -d
npm run dev
```

## Statystyki
- 19 kolekcji CMS + 3 globale
- 12 API routes (7 nowych)
- 5 scheduled jobs
- 10 lib utilities
- TypeScript: 0 błędów

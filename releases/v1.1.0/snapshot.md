# Snapshot v1.1.0 — 2025-05-01

## Statystyki
- **63 plików** źródłowych (src/)
- **19 kolekcji** CMS
- **3 globale** CMS
- **9 API routes**
- **12 bibliotek** (src/lib/)
- **5 scheduled jobs** (src/jobs/)
- **TypeScript:** 0 błędów

## Zależności
- next: 15/16.x
- payload: 3.84.x
- @payloadcms/db-postgres: 3.84.x
- react: 19.x
- tailwindcss: 4.x
- typescript: 5.x
- sharp: latest

## Kolekcje CMS (19)
1. Users
2. Media
3. Operators
4. Plans
5. Categories
6. Cities
7. CityLandingPages
8. Promotions
9. ClickEvents
10. AffiliateLinks
11. BoxDisplayConfig
12. Pages
13. Reviews ← NOWA
14. BlogPosts ← NOWA
15. BlogCategories ← NOWA
16. SpeedStats ← NOWA
17. PriceAlerts ← NOWA
18. Comparisons ← NOWA
19. AnalyticsDaily ← NOWA

## Globale (3)
1. SiteSettings
2. ComparisonConfig
3. Navigation

## API Routes (9)
1. POST /api/click-track
2. GET /api/redirect/[id]
3. GET /api/sitemap ← ROZBUDOWANY
4. GET/POST /api/reviews ← NOWY
5. GET /api/compare ← NOWY
6. GET /api/stats/[citySlug] ← NOWY
7. POST/DELETE /api/price-alerts ← NOWY
8. GET /api/public/plans ← NOWY
9. GET /api/cron ← NOWY

## Biblioteki (12)
1. payload.ts — Payload client
2. slugify.ts — Polish slugify
3. url-builder.ts — SEO URL builder
4. tracking.ts — Click tracking (GDPR)
5. affiliate.ts — Affiliate URL builder
6. rate-limit.ts ← NOWY — In-memory rate limiter
7. cache.ts ← NOWY — LRU cache z TTL
8. webhooks.ts ← NOWY — Discord/Slack/custom webhooks
9. gus-api.ts ← NOWY — GUS BDL API client
10. speedtest-data.ts ← NOWY — Ookla Speedtest data
11. sidusis.ts ← NOWY — SIDUSIS/UKE coverage
12. price-importer.ts ← NOWY — CSV price importer

## Jobs (5)
1. expire-promotions.ts — Deaktywacja wygasłych
2. sync-gus.ts — Sync z GUS API
3. sync-speedtest.ts — Import Speedtest data
4. send-price-alerts.ts — Email alerts
5. aggregate-clicks.ts — Dzienne agregaty

## Struktura plików
```
src/
├── app/
│   ├── (frontend)/          # 8 stron publicznych
│   ├── (payload)/           # Payload admin
│   ├── api/
│   │   ├── click-track/     # Click tracking
│   │   ├── compare/         # Porównywarka
│   │   ├── cron/            # Scheduled jobs
│   │   ├── price-alerts/    # Alerty cenowe
│   │   ├── public/plans/    # Publiczne API
│   │   ├── redirect/[id]/   # Affiliate redirect
│   │   ├── reviews/         # Opinie
│   │   ├── sitemap/         # XML sitemap
│   │   └── stats/[citySlug]/ # Statystyki miast
│   ├── globals.css
│   └── layout.tsx
├── collections/             # 19 kolekcji
├── globals/                 # 3 globale
├── jobs/                    # 5 scheduled jobs
└── lib/                     # 12 bibliotek
```

# Changes v1.1.0 (vs v1.0.1)

## Nowe pliki (+28)

### Kolekcje (+7)
- `src/collections/Reviews.ts` — opinie z auto-rating hook
- `src/collections/BlogPosts.ts` — artykuły z SEO
- `src/collections/BlogCategories.ts` — kategorie bloga
- `src/collections/SpeedStats.ts` — statystyki prędkości
- `src/collections/PriceAlerts.ts` — alerty cenowe
- `src/collections/Comparisons.ts` — porównania side-by-side
- `src/collections/AnalyticsDaily.ts` — dzienne agregaty

### API Routes (+7)
- `src/app/api/reviews/route.ts` — GET/POST opinie
- `src/app/api/compare/route.ts` — porównywarka
- `src/app/api/stats/[citySlug]/route.ts` — statystyki miast
- `src/app/api/price-alerts/route.ts` — alerty cenowe
- `src/app/api/public/plans/route.ts` — publiczne API
- `src/app/api/cron/route.ts` — scheduled jobs endpoint
- `src/app/api/sitemap/route.ts` — rozbudowany sitemap

### Biblioteki (+7)
- `src/lib/rate-limit.ts` — rate limiter
- `src/lib/cache.ts` — LRU cache
- `src/lib/webhooks.ts` — webhooks (Discord/Slack)
- `src/lib/gus-api.ts` — GUS BDL API
- `src/lib/speedtest-data.ts` — Ookla data
- `src/lib/sidusis.ts` — SIDUSIS/UKE
- `src/lib/price-importer.ts` — CSV importer

### Jobs (+5)
- `src/jobs/expire-promotions.ts`
- `src/jobs/sync-gus.ts`
- `src/jobs/sync-speedtest.ts`
- `src/jobs/send-price-alerts.ts`
- `src/jobs/aggregate-clicks.ts`

### Release docs (+2)
- `releases/v1.1.0/README.md`
- `releases/v1.1.0/snapshot.md`

## Zmodyfikowane pliki (5)
- `payload.config.ts` — dodano 7 nowych kolekcji
- `.env.example` — dodano GUS_API_KEY, CRON_SECRET, DISCORD/SLACK webhooks
- `docs/API_SPEC.md` — nowe endpointy, 19 kolekcji
- `docs/CHANGELOG.md` — wpis v1.1.0
- `package.json` — version bump (planned)

## Usunięte pliki (0)
Brak

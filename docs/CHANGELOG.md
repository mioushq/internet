# Changelog

## v1.3.1 — 2025-05-01

### CMS Design & UI Tweaks
- **Branding:** Dodano własne, gradientowe logo ("Porównywarka CMS") oraz ikonę w panelu administracyjnym Payload.
- **Bugfixes:** Naprawiono błędy z typowaniem TypeScript przy wstrzykiwaniu kastomowych komponentów (`CustomComponent`) bezpośrednio do konfiguracji Payload 3.x.

---
## v1.3.0 — 2025-05-01

### Integracja Frontend <-> CMS
- **Payload Local API:** Połączono stronę główną z bazą danych (Server Components) za pomocą `getPayloadClient()`.
- **Dynamiczne Komponenty:** 
  - `page.tsx` pobiera aktywne kategorie i promowane oferty (depth: 1).
  - `OfferCard.tsx` używa ścisłego typowania (`Plan`, `Operator`) i wyświetla dane oraz logo bezpośrednio z Payload.
  - Dodano `lucide-react` do renderowania ikon wektorowych zdefiniowanych stringiem w Payload (`CategoryCard.tsx`).
- **Edge Cases:** Zaimplementowano stany puste (empty states), gdy w bazie brakuje kategorii lub przypisanych promocji.

---
## v1.2.0 — 2025-05-01

### Frontend Design (Liquid Glass)
- **Nowy Layout i Tailwind:** Zmiana motywu na dark mode z efektem glassmorphism (`globals.css`, `layout.tsx`).
- **Nawigacja Mobile:** Dodano dolny pasek nawigacyjny dla urządzeń mobilnych (App-like feel).
- **Komponenty UI:** 
  - `HeroSearch.tsx` z płynnymi animacjami i obsługą wyszukiwania miast.
  - `CategoryCard.tsx` - szklane karty dla kategorii (Światłowód, 5G, itp.).
  - `OfferCard.tsx` - komponent ofert (Sales Box) gotowy na dane z Payload CMS i afiliację.
- **Dokumentacja UI:** Wygenerowano mockupy i spisano logikę designu w `docs/FRONTEND_DESIGN.md`.

---
## v1.1.0 — 2025-05-01

### Rozbudowa backendu + Automatyzacja danych

**7 nowych kolekcji CMS:**
- `Reviews` — opinie/recenzje z moderacją, auto-update ratingu operatora
- `BlogPosts` — artykuły/poradniki z SEO, tagami, powiązanymi ofertami
- `BlogCategories` — kategorie bloga
- `SpeedStats` — statystyki prędkości per miasto/operator (Ookla, UKE)
- `PriceAlerts` — alerty cenowe email
- `Comparisons` — zapisane porównania side-by-side
- `AnalyticsDaily` — dzienne agregaty kliknięć/konwersji

**7 nowych API routes:**
- `GET/POST /api/reviews` — lista + dodawanie opinii z antyspamem
- `GET /api/compare?plans=id1,id2,id3` — porównywarka side-by-side (max 4)
- `GET /api/stats/[citySlug]` — statystyki miasta
- `POST/DELETE /api/price-alerts` — alerty cenowe
- `GET /api/public/plans` — publiczne API z filtrowaniem
- `GET /api/sitemap` — rozbudowany (+ blog, reviews)
- `GET /api/cron?job=NAME` — endpoint do scheduled jobs

**3 integracje zewnętrznych API:**
- `src/lib/gus-api.ts` — GUS BDL API (populacja miast, % internetu)
- `src/lib/speedtest-data.ts` — Ookla Speedtest Open Data (średnie prędkości)
- `src/lib/sidusis.ts` — SIDUSIS/UKE (dostępność operatorów per adres)

**5 scheduled jobs:**
- `expire-promotions` — deaktywacja wygasłych promocji (co 1h)
- `sync-gus` — sync populacji miast z GUS (co 24h)
- `sync-speedtest` — import danych Speedtest (co tydzień)
- `price-alerts` — wysyłanie alertów cenowych (co 24h)
- `aggregate-clicks` — agregacja kliknięć do AnalyticsDaily (co 24h)

**Utilities:**
- `src/lib/rate-limit.ts` — in-memory rate limiter per IP/endpoint
- `src/lib/cache.ts` — LRU cache z TTL (plans 5m, operators 10m, cities 1h)
- `src/lib/webhooks.ts` — Discord + Slack + custom webhooks
- `src/lib/price-importer.ts` — import cen z CSV (alternatywa dla scrapingu)

**Konfiguracja:**
- 19 kolekcji (z 12), payload.config.ts zaktualizowany
- `.env.example` + nowe zmienne (GUS_API_KEY, CRON_SECRET, DISCORD/SLACK webhooks)

---

## v1.0.1 — 2025-05-01

### System Agentów AI + Release Tracking

**Windsurf Workflows (5 agentów):**
- `/code-review` — sprawdza jakość kodu, relacje, SEO, bezpieczeństwo
- `/test-agent` — testuje slugify, URL builder, tracking, affiliate, hooks
- `/change-tracker` — śledzi zmiany, aktualizuje changelog, tworzy snapshot
- `/release` — tworzy nowy release w `releases/vX.Y.Z/`
- `/pre-commit` — szybki check przed commitem

**Shell scripts (CLI agenci):**
- `scripts/agents/check-typescript.sh` — TypeScript 0 errors check
- `scripts/agents/check-collections.sh` — czy payload.config.ts zawiera wszystkie kolekcje
- `scripts/agents/check-env.sh` — czy .env.example jest kompletny
- `scripts/agents/snapshot.sh` — generuje snapshot projektu
- `scripts/agents/create-release.sh` — tworzy nowy release z folderem

**NPM scripts:**
- `npm run agent:check` — uruchom wszystkie checki
- `npm run agent:snapshot` — generuj snapshot
- `npm run agent:release` — utwórz nowy release

**Release tracking:**
- `releases/v1.0.0/` — snapshot, changes, README pierwszego release'u
- Każdy nowy release = osobny folder z pełnym raportem

**Dokumentacja:**
- `docs/AI_AGENTS.md` — rozbudowany o system agentów, workflow, release tracking

---

## v1.0.0 — 2025-04-30

### Inicjalizacja projektu

**Stack:**
- Next.js 15 (App Router) + Payload CMS 3.x + PostgreSQL
- TypeScript, TailwindCSS 4, Docker

**Backend / CMS:**
- 12 kolekcji Payload: Operators, Plans, Categories, Cities, CityLandingPages, Promotions, ClickEvents, AffiliateLinks, BoxDisplayConfig, Pages, Media, Users
- 3 globale: SiteSettings, ComparisonConfig, Navigation
- Auto-kalkulacja totalCost24m (Plans hook)
- Panel admina z polskimi labelami

**API:**
- Payload REST API + GraphQL (auto-generowane)
- Custom: `/api/click-track` (tracking kliknięć)
- Custom: `/api/redirect/[id]` (affiliate redirect z trackingiem)

**SEO / URL:**
- SEO-friendly URL structure: `/internet-swiatlowodowy/warszawa/orange-300mb`
- Polish slugify (ą→a, ł→l, etc.)
- URL builder utility
- SEO templates edytowalne z CMS

**Monetyzacja:**
- Affiliate links per operator i plan
- Sponsored boxes z datami i limitami
- Click tracking (GDPR-compliant, hash IP)
- Premium partners, priority sorting
- Banner/promotion system

**Dane startowe (seed):**
- 12 operatorów polskich
- 50 miast z województwami i populacją
- 6 kategorii internetu
- 19 przykładowych ofert
- Domyślna konfiguracja boxów

**Infrastruktura:**
- Docker + docker-compose (dev + prod)
- Dockerfile (standalone Next.js)
- .env.example

**Dokumentacja:**
- README.md
- docs/AI_AGENTS.md
- docs/DB_SCHEMA.md
- docs/API_SPEC.md
- docs/URL_STRUCTURE.md
- docs/CHANGELOG.md

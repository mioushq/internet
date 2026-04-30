# Changes — v1.0.0

**Data:** 2025-04-30  
**Typ:** Inicjalizacja projektu (pierwszy release)

## Nowe pliki (wszystkie)

### Konfiguracja
- `payload.config.ts` — główna konfiguracja Payload CMS (12 kolekcji, 3 globale, PostgreSQL)
- `next.config.ts` — Next.js config (standalone output, withPayload)
- `tsconfig.json` — TypeScript strict config z path aliases
- `postcss.config.mjs` — TailwindCSS 4 via PostCSS
- `package.json` — zależności i skrypty (dev, build, seed, generate:types)
- `.env` / `.env.example` — zmienne środowiskowe
- `Dockerfile` — multi-stage build (standalone)
- `docker-compose.yml` — dev (app + postgres)
- `docker-compose.prod.yml` — prod (z restartami, sieciami)

### Kolekcje CMS (12)
- `src/collections/Operators.ts` — operatorzy z affiliate, prowizjami, kontaktem wewnętrznym
- `src/collections/Plans.ts` — oferty z cenami, prędkościami, umowami, badge'ami, sponsoringiem
- `src/collections/Categories.ts` — kategorie (światłowód, 5G, kabel...) z SEO templates
- `src/collections/Cities.ts` — 50 miast PL z województwami, populacją, operatorami
- `src/collections/CityLandingPages.ts` — dedykowane landing pages per miasto+kategoria z FAQ
- `src/collections/Promotions.ts` — bannery, sponsored boxy, featured strips
- `src/collections/ClickEvents.ts` — tracking kliknięć (UTM, device, hash IP)
- `src/collections/AffiliateLinks.ts` — konfiguracja linków afiliacyjnych
- `src/collections/BoxDisplayConfig.ts` — konfiguracja wyglądu boxów (pola, layout, CTA)
- `src/collections/Pages.ts` — strony CMS (regulamin, o nas)
- `src/collections/Media.ts` — pliki i obrazy z rozmiarami
- `src/collections/Users.ts` — admin/editor/viewer z auth

### Globale CMS (3)
- `src/globals/SiteSettings.ts` — nazwa, opis, social, analytics, cookie consent, footer
- `src/globals/ComparisonConfig.ts` — sortowanie, filtry, sponsored first, speed ranges
- `src/globals/Navigation.ts` — menu główne, stopka, mobile z podmenu

### API Routes
- `src/app/api/click-track/route.ts` — POST tracking kliknięć (GDPR hash IP, UTM, device)
- `src/app/api/redirect/[id]/route.ts` — GET affiliate redirect (302 + zapis ClickEvent)

### Lib Utilities
- `src/lib/slugify.ts` — polskie znaki → ASCII (ą→a, ł→l, etc.)
- `src/lib/url-builder.ts` — SEO URL builder (category/city/plan/operator patterns)
- `src/lib/affiliate.ts` — budowanie linków afiliacyjnych z parametrami
- `src/lib/tracking.ts` — hash IP, detect device/browser/OS, parse UTM
- `src/lib/payload.ts` — helper do pobierania Payload client

### Frontend Pages (9 route'ów)
- `src/app/layout.tsx` — root layout (metadata, lang=pl)
- `src/app/(frontend)/layout.tsx` — frontend layout (header, nav, footer, TailwindCSS)
- `src/app/(frontend)/page.tsx` — strona główna
- `src/app/(frontend)/[category]/page.tsx` — strona kategorii
- `src/app/(frontend)/[category]/[city]/page.tsx` — kategoria + miasto
- `src/app/(frontend)/[category]/[city]/[planSlug]/page.tsx` — konkretna oferta
- `src/app/(frontend)/operator/[slug]/page.tsx` — strona operatora
- `src/app/(frontend)/oferty/page.tsx` — wszystkie oferty
- `src/app/(frontend)/miasta/page.tsx` — lista miast
- `src/app/(frontend)/miasta/[city]/page.tsx` — landing page miasta

### Seed Data
- `seed/seed.ts` — 12 operatorów, 50 miast, 6 kategorii, 19 ofert, default box config

### Dokumentacja
- `README.md` — główna dokumentacja projektu
- `docs/AI_AGENTS.md` — instrukcje dla agentów AI
- `docs/API_SPEC.md` — specyfikacja API (REST, GraphQL, custom)
- `docs/DB_SCHEMA.md` — schemat bazy danych
- `docs/URL_STRUCTURE.md` — struktura URL i SEO
- `docs/CHANGELOG.md` — historia zmian

## Zmodyfikowane pliki
Brak (pierwszy release)

## Usunięte pliki
Brak (pierwszy release)

## Breaking Changes
Brak (pierwszy release)

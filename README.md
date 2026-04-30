# Porównywarka Internetu 🇵🇱

Porównywarka cen internetu światłowodowego, 5G, kablowego i innych — rynek polski.  
Full-stack: **Next.js 15 + Payload CMS 3.x + PostgreSQL**. Docker-based, deploy anywhere.

## Quick Start

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom PostgreSQL (Docker)
docker compose up postgres -d

# 3. Uruchom dev server
npm run dev
# → http://localhost:3000       (frontend)
# → http://localhost:3000/admin (CMS panel)

# 4. Seed data (polscy operatorzy, miasta, oferty)
npm run seed
```

## Stack

| Warstwa | Technologia |
|---------|------------|
| Framework | Next.js 15 (App Router) |
| CMS / Admin | Payload CMS 3.x |
| Baza danych | PostgreSQL |
| Styling | TailwindCSS 4 + shadcn/ui |
| Język | TypeScript |
| Deploy | Docker + docker-compose |

## Struktura Projektu

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/         # Strony publiczne
│   │   ├── [category]/[city]/[planSlug]/  # SEO-friendly routing
│   │   ├── operator/[slug]/               # Strona operatora
│   │   ├── miasta/[city]/                 # Landing pages miast
│   │   └── oferty/                        # Wszystkie oferty
│   ├── (payload)/          # Payload CMS admin
│   └── api/                # Custom API routes
│       ├── click-track/    # Tracking kliknięć affiliate
│       ├── redirect/[id]/  # Affiliate redirect z trackingiem
│       └── sitemap/        # Dynamiczny sitemap
├── collections/            # Payload CMS Collections (12)
├── globals/                # Payload Globals (3)
├── lib/                    # Utilities
│   ├── slugify.ts          # Polish slugify (ą→a, ł→l)
│   ├── url-builder.ts      # SEO URL builder
│   ├── affiliate.ts        # Affiliate link logic
│   └── tracking.ts         # Click tracking (GDPR)
├── components/             # React components
└── hooks/                  # React + Payload hooks
```

## Kolekcje CMS

| Kolekcja | Opis |
|----------|------|
| **Operators** | Operatorzy (Orange, Play, UPC...) z affiliate, prowizjami |
| **Plans** | Oferty z cenami, prędkościami, sponsoringiem, badge'ami |
| **Categories** | Światłowód, 5G, kabel, DSL, satelita |
| **Cities** | 50 polskich miast z województwami, populacją |
| **CityLandingPages** | Dedykowane landing pages per miasto+kategoria |
| **Promotions** | Bannery, sponsored boxy, featured strips |
| **ClickEvents** | Tracking kliknięć (UTM, device, GDPR hash IP) |
| **AffiliateLinks** | Konfiguracja linków afiliacyjnych per operator |
| **BoxDisplayConfig** | Konfiguracja wyglądu boxów (pola, layout, CTA) |
| **Pages** | Strony CMS (regulamin, o nas, kontakt) |
| **Media** | Pliki i obrazy |
| **Users** | Administratorzy (admin/editor/viewer) |

## SEO-Friendly URLs

```
/internet-swiatlowodowy                     → Kategoria
/internet-swiatlowodowy/warszawa            → Kategoria + Miasto
/internet-swiatlowodowy/warszawa/orange-300mb → Konkretna oferta
/internet-5g/krakow                         → 5G w Krakowie
/miasta/warszawa                            → Landing page miasta
/operator/orange                            → Strona operatora
```

## Monetyzacja

- **Affiliate links** per operator i per plan z redirect + tracking
- **Sponsored boxes** z datami, limitami, labelami
- **Banner system** (banner, popup, featured strip, sponsored box)
- **Click tracking** z UTM, referrer, device info
- **Priority sorting** — płatne wyższe pozycje
- **Premium partners** — wyróżnieni operatorzy

## Komendy

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run start            # Start production
npm run seed             # Seed database
npm run generate:types   # Generuj typy Payload
npm run lint             # ESLint
```

## Deploy (Docker)

```bash
# Development
docker compose up

# Production
docker compose -f docker-compose.prod.yml up -d
```

Kompatybilne z: Hetzner VPS, DigitalOcean, Railway, Fly.io, Coolify, dowolny serwer z Dockerem.

## Zmienne Środowiskowe

| Zmienna | Opis |
|---------|------|
| `DATABASE_URI` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Klucz szyfrowania Payload (min 32 znaki) |
| `NEXT_PUBLIC_SITE_URL` | URL strony |
| `NEXT_PUBLIC_SITE_NAME` | Nazwa strony |

## Wersja

v1.0.0 — Inicjalizacja projektu, backend + CMS + model danych + seed

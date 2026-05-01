# Release v1.4.0 — Spięcie Frontend ↔ CMS (Milestone 1)

**Data:** 2025-05-01

## Podsumowanie

Wszystkie podstrony frontendowe zostały podłączone do Payload CMS przez Local API (`getPayloadClient()`). Dodano nowe komponenty UI (FilterBar, CityCard) oraz autocomplete miast w wyszukiwarce. Panel CMS /admin otrzymał custom branding (dark theme z cyan accent).

## Nowe Funkcje

### Podstrony spięte z CMS:
- **`/oferty`** — lista ofert z filtrami (prędkość, cena, technologia, operator, sortowanie) + paginacja
- **`/miasta`** — grid miast z podziałem na wojewódzkie i pozostałe, sortowanie wg populacji
- **`/miasta/[city]`** — landing page miasta z ofertami, dostępnymi operatorami, populacją
- **`/[category]`** — lista ofert per kategoria z SEO templates
- **`/[category]/[city]`** — oferty per kategoria+miasto z h1Template z CMS
- **`/[category]/[city]/[planSlug]`** — pełna strona planu (specs, ceny, features, breadcrumbs, CTA)
- **`/operator/[slug]`** — profil operatora (logo, plany, opinie użytkowników)

### Nowe Komponenty:
- **`FilterBar`** — client component z filtrami: min. prędkość, max. cena, technologia, operator, sortowanie
- **`CityCard`** — karta miasta z badge wojewódzkie, populacja, voivodeship labels
- **`HeroSearch`** (rozbudowany) — autocomplete z miast CMS, strzałki góra/dół, Escape, polish slugify

### CMS Admin:
- **`custom.scss`** — dark theme z brand colors (cyan #06b6d4, blue #3b82f6), gradient buttons, accent nav

## Jak uruchomić

```bash
docker compose up -d
npm run dev
# → http://localhost:3000 (frontend)
# → http://localhost:3000/admin (CMS)
```

## Znane ograniczenia
- Brak `generateStaticParams` (będzie w M2: SEO)
- Brak Schema.org structured data (M2)
- Brak porównywarki side-by-side (M3)
- Obrazy operatorów wymagają uploadu w CMS

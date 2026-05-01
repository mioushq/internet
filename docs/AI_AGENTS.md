# AI Agents — System Monitorowania i Kontroli Projektu

Zestaw agentów AI do ciągłego monitorowania, testowania, code review i zarządzania release'ami.

---

## Jak używać agentów

Agenci są zdefiniowani jako **Windsurf Workflows** w `.windsurf/workflows/`. Wywołujesz je wpisując slash-command w chacie:

| Komenda | Agent | Co robi |
|---------|-------|---------|
| `/code-review` | Code Review | Sprawdza jakość kodu, relacje, SEO, bezpieczeństwo |
| `/test-agent` | Test Agent | Testuje slugify, URL builder, tracking, affiliate, hooks |
| `/change-tracker` | Change Tracker | Śledzi zmiany, aktualizuje changelog, tworzy snapshot |
| `/release` | Release Agent | Tworzy nowy release w `releases/vX.Y.Z/` z pełnym raportem |
| `/pre-commit` | Pre-Commit | Szybki check przed commitem (TypeScript, docs, env) |

---

## Struktura Release'ów

Każdy release ma **osobny folder** w `releases/`:

```
releases/
├── v1.0.0/
│   ├── README.md         ← Podsumowanie release'u
│   ├── snapshot.md       ← Pełna lista plików, zależności, statystyki
│   ├── changes.md        ← Lista wszystkich zmian (nowe/zmodyfikowane/usunięte pliki)
│   ├── code-review.md    ← Raport code review (opcjonalny)
│   └── test-results.md   ← Wyniki testów (opcjonalny)
├── v1.1.0/
│   ├── README.md
│   ├── snapshot.md
│   ├── changes.md
│   ├── code-review.md
│   └── test-results.md
└── ...
```

### Zasady release'ów:
- **Każdy release = nowy folder** z pełnym snapshotem
- **`changes.md`** — diff od poprzedniej wersji (co się zmieniło)
- **`snapshot.md`** — stan projektu w momencie release'u (pliki, zależności, statystyki)
- **`docs/CHANGELOG.md`** — zawsze aktualny, aktualizowany przez agenta

---

## Opis Projektu

**Porównywarka Internetu** — porównywarka cen internetu (światłowód, 5G, kabel) na rynek polski.  
Stack: Next.js 15 + Payload CMS 3.x + PostgreSQL + TailwindCSS + TypeScript.  
Docker-based, hosting-agnostic.

## Architektura

- **Payload CMS** → `/admin` panel + REST API + GraphQL API (auto-generowane z kolekcji)
- **Next.js App Router** → SSR/SSG strony publiczne + API routes
- **PostgreSQL** → baza danych (Drizzle ORM via Payload)
- **19 kolekcji** CMS + **3 globale** (patrz `src/collections/` i `src/globals/`)

## Kluczowe Pliki

| Plik | Opis |
|------|------|
| `payload.config.ts` | Główna konfiguracja CMS — kolekcje, globals, DB |
| `src/collections/*.ts` | Definicje kolekcji (model danych) |
| `src/globals/*.ts` | Globalne ustawienia (SiteSettings, ComparisonConfig, Navigation) |
| `src/lib/slugify.ts` | Slugify z obsługą polskich znaków |
| `src/lib/url-builder.ts` | Budowanie SEO-friendly URL |
| `src/lib/tracking.ts` | Click tracking (GDPR-compliant, hash IP) |
| `src/lib/affiliate.ts` | Budowanie linków afiliacyjnych |
| `src/app/api/redirect/[id]/route.ts` | Affiliate redirect z trackingiem |
| `src/app/api/click-track/route.ts` | API do śledzenia kliknięć |
| `seed/seed.ts` | Dane startowe (operatorzy PL, 50 miast, oferty) |

## Konwencje Kodu

- **TypeScript** — strict mode
- **Payload collections** — każda kolekcja w osobnym pliku `src/collections/NazwaKolekcji.ts`
- **Nazwy polskie w labels** — interfejs CMS po polsku
- **Slugi angielskie** w kodzie (np. `operators`, `plans`, `cities`)
- **Grupy pól** (group) do organizacji — np. `pricing`, `speeds`, `contract`, `affiliate`, `seo`
- **Komentarze** — sekcyjne (`// --- CENY ---`) w dużych kolekcjach

---

## Agent: Code Review (`/code-review`)

Automatycznie sprawdza:
1. Czy kolekcje mają poprawne relacje (relationship)
2. Czy slug jest unique
3. Czy SEO group jest w każdej kolekcji publicznej
4. Czy affiliate/monetyzacja pola są kompletne
5. Czy access control jest poprawny (read: () => true dla publicznych)
6. Czy hook beforeChange liczy totalCost24m poprawnie
7. Czy payload.config.ts zawiera WSZYSTKIE kolekcje z `src/collections/`
8. TypeScript 0 błędów

**Output:** Raport w `releases/CURRENT_VERSION/code-review-YYYY-MM-DD.md`

---

## Agent: Testy (`/test-agent`)

Kluczowe scenariusze:
1. CRUD operatorów, planów, kategorii, miast
2. Affiliate redirect → czy zapisuje ClickEvent i robi 302
3. Click tracking API → czy parsuje UTM i device
4. Slugify → polskie znaki (ą, ę, ś, ź, ż, ó, ł, ć, ń)
5. URL builder → poprawne generowanie URL per pattern
6. Plans.beforeChange hook → auto-kalkulacja totalCost24m
7. BoxDisplayConfig → czy frontend czyta konfigurację

**Output:** Wyniki w `releases/CURRENT_VERSION/test-results-YYYY-MM-DD.md`

---

## Agent: Change Tracker (`/change-tracker`)

Monitoruje zmiany w projekcie:
1. Porównuje pliki ze snapshotem ostatniego release'u
2. Wykrywa nowe, zmodyfikowane i usunięte pliki
3. Aktualizuje `releases/CURRENT_VERSION/changes.md`
4. Aktualizuje `docs/CHANGELOG.md`
5. Sugeruje bump wersji jeśli zmiany są znaczące

**Kiedy uruchamiać:** Po każdej sesji pracy, przed release'em

---

## Agent: Release (`/release`)

Tworzy pełny release:
1. Nowy folder `releases/vX.Y.Z/`
2. Uruchamia code review → zapisuje raport
3. Uruchamia testy → zapisuje wyniki
4. Tworzy snapshot (pliki, zależności, statystyki)
5. Tworzy changes.md (diff od poprzedniej wersji)
6. Aktualizuje CHANGELOG.md i package.json

**Kiedy uruchamiać:** Przy milestone'ach, przed deploy'em

---

## Agent: Pre-Commit (`/pre-commit`)

Szybki check przed commitem:
1. TypeScript 0 błędów
2. Payload config kompletny
3. Changelog aktualny
4. README aktualny
5. .env.example kompletny

---

## Agent: Frontend (instrukcje do implementacji)

Frontend bazowy jest w `src/app/(frontend)/`. Potrzebne:
1. Komponenty w `src/components/comparison/` — OfferCard, PriceBox, FilterBar, ComparisonTable
2. Strony dynamiczne: `[category]/page.tsx`, `[category]/[city]/page.tsx`
3. Fetch danych z Payload local API: `getPayloadClient()` → `payload.find()`
4. BoxDisplayConfig decyduje co pokazywać na boxach
5. Mobile-first (60/40), TailwindCSS, shadcn/ui
6. SEO: meta tagi z szablonów CMS, Schema.org, breadcrumbs

## URL Patterns

```
/                                        → Strona główna
/[category.urlPrefix]                    → Lista ofert per kategoria
/[category.urlPrefix]/[city.slug]        → Oferty w mieście
/[category.urlPrefix]/[city.slug]/[plan] → Konkretna oferta
/operator/[operator.slug]               → Strona operatora
/miasta/[city.slug]                     → Landing page miasta
/oferty                                 → Wszystkie oferty
```

## Zmienne Środowiskowe

Patrz `.env.example`. Wymagane: `DATABASE_URI`, `PAYLOAD_SECRET`.

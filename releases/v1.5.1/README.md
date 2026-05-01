# Release v1.5.1 — Bugfix + SEO poprawki

**Data:** 2025-05-01

## Podsumowanie

Poprawki importu CSS (usunięcie Tailwind Preflight), fix Logo/Icon w Payload config (string paths zamiast importów), dodanie `allowedDevOrigins`, scope `html/body` styles do `html[lang="pl"]`.

## ⚠️ ZNANY BUG: Panel /admin CMS nie ładuje styli

**Status:** NIEROZWIĄZANY  
**Priorytet:** KRYTYCZNY — pierwsza rzecz do naprawy w następnym wydaniu

### Opis problemu:
- Panel administracyjny Payload CMS (`/admin`) wyświetla się jako **czysty tekst** bez styli
- Nawigacja boczna renderuje się jako plain text links na górze strony
- Dashboard cards są widoczne ale bez poprawnego layoutu
- Problem występuje na **wszystkich przeglądarkach** (Chrome, Brave, Safari, tryb incognito)
- Problem występuje na `localhost:3000/admin` bezpośrednio (nie proxy)

### Diagnostyka wykonana:
1. ✅ CSS plik się serwuje (405KB, HTTP 200)
2. ✅ CSS zawiera style Payload (764 reguł `.template-default`, `.nav-group`, `.dashboard`)
3. ✅ JS chunki się ładują (32 pliki, HTTP 200)
4. ✅ HTML ma prawidłowy `<head>` z `<link rel="stylesheet">`
5. ✅ Brak błędów JS w konsoli przeglądarki
6. ✅ `custom.scss` — usunięto override `:root --theme-elevation-*` (łamał theme)
7. ✅ `payload.config.ts` — zmieniono Logo/Icon na string paths (naprawiono `addToImportMap` error)
8. ✅ `globals.css` — usunięto Tailwind Preflight (importuje tylko theme + utilities)
9. ✅ `next.config.ts` — dodano `allowedDevOrigins`
10. ✅ Wielokrotne czyszczenie `.next` cache + restart serwera

### Hipotezy do sprawdzenia:
- Turbopack (Next.js 16) może nieprawidłowo bundlować CSS między route groups `(frontend)` i `(payload)`
- Payload 3.84.1 + Next.js 16.2.4 mogą mieć incompatibility
- Ewentualnie: `output: 'standalone'` w `next.config.ts` wpływa na dev mode
- Spróbować: `next build && next start` zamiast `next dev` — czy problem znika w production build

### Pliki do zbadania:
- `src/app/globals.css` — Tailwind import bez preflight
- `src/app/(payload)/custom.scss` — minimalne accent styles
- `src/app/(payload)/layout.tsx` — Payload RootLayout
- `src/app/layout.tsx` — Root layout (returns children)
- `next.config.ts` — standalone + allowedDevOrigins
- `postcss.config.mjs` — `@tailwindcss/postcss`

## Zmiany w tym release

### Fixes:
- `custom.scss` — usunięto override `:root --theme-elevation-*` variables
- `payload.config.ts` — Logo/Icon z `import as any` → string paths (`'/src/components/admin/Logo#Logo'`)
- `next.config.ts` — dodano `allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.0.139']`
- `globals.css` — `@import "tailwindcss"` → `@import "tailwindcss/theme"` + `@import "tailwindcss/utilities"` (bez Preflight)
- `globals.css` — scopowane `html, body` styles do `html[lang="pl"]` (nie wpływa na admin `html[lang="en"]`)

## Jak uruchomić

```bash
docker compose up -d
npm run dev
# → http://localhost:3000 (frontend — działa)
# → http://localhost:3000/admin (CMS — BUG: brak styli)
```

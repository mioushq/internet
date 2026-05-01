# Release v1.5.2 — Fix: CMS Admin Panel Styling

**Data:** 2025-05-01

## Podsumowanie

**NAPRAWIONY krytyczny bug** — panel `/admin` CMS nie ładował styli CSS, wyświetlał się jako czysty tekst.

## Root Cause

`@payloadcms/next@3.84.1` prekompiluje style panelu admina do `dist/prod/styles.css` (eksport `@payloadcms/next/css`), ale żaden plik JS w tym pakiecie tego nie importuje. Wcześniejszy fix z `@payloadcms/ui/scss/app.scss` ładował tylko bazę + podzbiór komponentów — brakowało Nav, StepNav, widoku Login, Logo, template-minimal, itd.

## Naprawa

Dwa importy CSS w `src/app/(payload)/layout.tsx`:

```typescript
import '@payloadcms/next/css'          // Nav, StepNav, Login, Logo, template-minimal
import '@payloadcms/ui/scss/app.scss'  // bazowe komponenty UI
```

**Wynik:** zbundlowany CSS wzrósł z 425 KB → 787 KB. Brakujące selektory (`.nav__link`, `.step-nav`, `.template-minimal`, `.login__brand`) mają teraz 51 wystąpień (wcześniej 0–1).

## Pozostałe poprawki (z v1.5.1)

- **`custom.scss`**: Usunięto override `:root --theme-elevation-*` — łamał wbudowany theme
- **`payload.config.ts`**: Logo/Icon jako string paths zamiast `import as any`
- **`next.config.ts`**: Dodano `allowedDevOrigins`
- **`globals.css`**: Import `tailwindcss/theme` + `tailwindcss/utilities` (bez Preflight)
- **`globals.css`**: Scopowane `html, body` do `html[lang="pl"]`

## Jak uruchomić

```bash
docker compose up -d
npm run dev
# → http://localhost:3000 (frontend)
# → http://localhost:3000/admin (CMS — style naprawione ✅)
```

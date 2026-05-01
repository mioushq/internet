# Changes v1.5.1 (vs v1.5.0)

**Data:** 2025-05-01

## Zmodyfikowane pliki

| Plik | Zmiana |
|------|--------|
| `src/app/globals.css` | Usunięto Tailwind Preflight — import tylko theme + utilities. Scopowane body styles do `html[lang="pl"]` |
| `src/app/(payload)/custom.scss` | Usunięto override `:root --theme-elevation-*`, zachowano tylko accent styles z `[data-theme="dark"]` scope |
| `payload.config.ts` | Logo/Icon: `import as any` → string paths `'/src/components/admin/Logo#Logo'` |
| `next.config.ts` | Dodano `allowedDevOrigins` |
| `package.json` | Bump version 1.5.0 → 1.5.1 |
| `docs/CHANGELOG.md` | Dodano v1.5.1 bugfix sekcję |

## Nowe pliki

| Plik | Opis |
|------|------|
| `src/components/seo/JsonLd.tsx` | Uniwersalny JSON-LD + 5 helperów schema (z M2, niezapisane w v1.5.0 changes) |
| `src/components/seo/Breadcrumbs.tsx` | Reusable breadcrumbs + BreadcrumbList schema |
| `public/robots.txt` | robots.txt — blokuje /admin, /api/ |

## Znany bug

**Panel /admin CMS nie ładuje styli** — wyświetla czysty tekst. CSS serwuje się (HTTP 200, 405KB), ale layout jest broken. Wymaga dalszej diagnostyki.

## Statystyki

- Pliki TS/TSX: 71
- Komponenty: 8
- TypeScript errors: 0

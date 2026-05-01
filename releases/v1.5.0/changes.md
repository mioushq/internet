# Changes v1.5.0 (vs v1.4.0)

**Data:** 2025-05-01

## Nowe pliki

| Plik | Opis |
|------|------|
| `src/components/seo/JsonLd.tsx` | Uniwersalny JSON-LD + helpery: offerSchema, breadcrumbSchema, faqSchema, websiteSchema, organizationSchema |
| `src/components/seo/Breadcrumbs.tsx` | Reusable breadcrumbs z auto Schema.org BreadcrumbList |
| `public/robots.txt` | Robots.txt — blokuje /admin, /api/, wskazuje sitemap |

## Zmodyfikowane pliki

| Plik | Zmiana |
|------|--------|
| `src/app/(frontend)/page.tsx` | Dodano JsonLd (WebSite + Organization) |
| `src/app/(frontend)/[category]/page.tsx` | generateStaticParams + Breadcrumbs |
| `src/app/(frontend)/[category]/[city]/page.tsx` | generateStaticParams (kategorie × główne miasta) + Breadcrumbs |
| `src/app/(frontend)/[category]/[city]/[planSlug]/page.tsx` | Breadcrumbs component + JsonLd Product/Offer schema |
| `src/app/(frontend)/miasta/[city]/page.tsx` | generateStaticParams + Breadcrumbs |
| `src/app/(frontend)/operator/[slug]/page.tsx` | generateStaticParams + Breadcrumbs |
| `package.json` | Bump version 1.4.0 → 1.5.0 |
| `docs/CHANGELOG.md` | Dodano sekcję v1.5.0 |

## Usunięte pliki

Brak.

## Statystyki

- Pliki TS/TSX: 71
- Komponenty React: 8 (w tym 2 nowe SEO)
- TypeScript errors: 0

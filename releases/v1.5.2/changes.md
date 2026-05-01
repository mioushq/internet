# Changes v1.5.2 (vs v1.5.1)

**Data:** 2025-05-01

## Root Cause Fix

| Plik | Zmiana |
|------|--------|
| `src/app/(payload)/layout.tsx` | **Dodano `import '@payloadcms/next/css'`** (Nav, StepNav, Login, Logo, template-minimal) + **`import '@payloadcms/ui/scss/app.scss'`** (bazowe komponenty). CSS wzrósł z 425 KB → 787 KB |

## Wcześniejsze poprawki (v1.5.1, utrzymane)

| Plik | Zmiana |
|------|--------|
| `src/app/globals.css` | Import `tailwindcss/theme` + `tailwindcss/utilities` bez Preflight, scope `html[lang="pl"]` |
| `src/app/(payload)/custom.scss` | Usunięto override `:root --theme-elevation-*`, tylko accent styles |
| `payload.config.ts` | Logo/Icon: string paths `'/src/components/admin/Logo#Logo'` |
| `next.config.ts` | `allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.0.139']` |
| `package.json` | Version: 1.5.1 → 1.5.2 |
| `docs/CHANGELOG.md` | Dodano v1.5.2 entry |

# URL Structure — SEO-Friendly Routing

## Hierarchia URL

```
/                                                    → Strona główna
/internet-swiatlowodowy                              → Kategoria: światłowód
/internet-swiatlowodowy/warszawa                     → Światłowód w Warszawie
/internet-swiatlowodowy/warszawa/orange-300mb         → Konkretna oferta
/internet-swiatlowodowy/300mb                        → Filtr prędkości
/internet-swiatlowodowy/bez-umowy                    → Filtr: bez zobowiązania
/internet-5g/krakow                                  → 5G w Krakowie
/internet-kablowy/gdansk                             → Kabel w Gdańsku
/operator/orange                                     → Strona operatora
/operator/orange/warszawa                            → Orange w Warszawie
/miasta/warszawa                                     → Landing page: Warszawa
/miasta/krakow                                       → Landing page: Kraków
/oferty                                              → Wszystkie oferty
/porownaj?plans=1,2,3                                → Porównywarka side-by-side
```

## Generowanie segmentów URL

| Segment | Źródło | Przykład |
|---------|--------|----------|
| `[category]` | `categories.urlPrefix` | internet-swiatlowodowy |
| `[city]` | `cities.slug` | warszawa |
| `[speed]` | Auto z `plans.speeds.download` | 300mb |
| `[planSlug]` | `plans.slug` | orange-300mb-z-tv |
| `[contract]` | Auto z `plans.contract.months` | bez-umowy |
| `[operator]` | `operators.slug` | orange |

## Slugify — polskie znaki

```
ą→a, ć→c, ę→e, ł→l, ń→n, ó→o, ś→s, ź→z, ż→z
Spacje → myślniki, lowercase
"Łódź" → "lodz"
"Bielsko-Biała" → "bielsko-biala"
"Jastrzębie-Zdrój" → "jastrzebie-zdroj"
```

Implementacja: `src/lib/slugify.ts`

## SEO Templates (edytowalne z CMS)

| URL Pattern | Title Template | H1 Template |
|-------------|---------------|-------------|
| `/[category]` | "{{category}} - Porównaj oferty 2025" | "Najlepsze oferty {{category}}" |
| `/[category]/[city]` | "{{category}} {{city}} - Porównaj ceny" | "{{category}} w {{city}}" |
| `/[category]/[speed]` | "Internet {{speed}} - Najlepsze oferty" | "Internet {{speed}}" |
| `/miasta/[city]` | "Internet w {{city}} - Porównaj operatorów" | "Internet w {{city}}" |
| `/operator/[name]` | "{{operator}} - Oferty i ceny" | "{{operator}} - Oferty" |

## Canonical URLs

- `/internet-swiatlowodowy/warszawa` = canonical (główna)
- `/miasta/warszawa` z kategorią "światłowód" → canonical wskazuje na `/internet-swiatlowodowy/warszawa`
- Admin może nadpisać canonical per CityLandingPage

## Next.js Routing

```
src/app/(frontend)/
├── [category]/page.tsx                    → generateStaticParams z categories
│   ├── [city]/page.tsx                    → generateStaticParams z cities
│   │   └── [planSlug]/page.tsx           → generateStaticParams z plans
├── operator/[slug]/page.tsx              → generateStaticParams z operators
├── miasta/[city]/page.tsx                → generateStaticParams z cities
└── oferty/page.tsx                       → statyczna
```

Implementacja: `src/lib/url-builder.ts`

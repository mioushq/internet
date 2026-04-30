# API Specification

## Payload REST API (auto-generated)

Base URL: `/api`

Każda kolekcja ma pełny CRUD:

```
GET    /api/[collection]           → Lista (paginacja, filtrowanie, sortowanie)
GET    /api/[collection]/[id]      → Pojedynczy dokument
POST   /api/[collection]           → Tworzenie
PATCH  /api/[collection]/[id]      → Aktualizacja
DELETE /api/[collection]/[id]      → Usuwanie
```

### Kolekcje dostępne:
`operators`, `plans`, `categories`, `cities`, `city-landing-pages`, `promotions`, `click-events`, `affiliate-links`, `box-display-config`, `pages`, `media`, `users`, `reviews`, `blog-posts`, `blog-categories`, `speed-stats`, `price-alerts`, `comparisons`, `analytics-daily`

### Globals:
```
GET  /api/globals/site-settings
GET  /api/globals/comparison-config
GET  /api/globals/navigation
```

### Filtrowanie (query params)

```
GET /api/plans?where[operator][equals]=OPERATOR_ID
GET /api/plans?where[pricing_priceMonthly][less_than]=100
GET /api/plans?where[speeds_download][greater_than_equal]=300
GET /api/plans?where[availability_isActive][equals]=true
GET /api/plans?where[category][equals]=CATEGORY_ID
GET /api/plans?sort=-pricing_priceMonthly
GET /api/plans?limit=20&page=1
GET /api/plans?depth=1  (populuje relacje)
```

### Przykład: Oferty światłowodowe w Warszawie

```
GET /api/plans?where[category][equals]=CAT_ID&where[availability_regions][in]=CITY_ID&where[availability_isActive][equals]=true&sort=display_sortOrder&depth=1
```

## Custom API Routes

### POST /api/click-track
Rejestruje kliknięcie/impression/konwersję.

Request body:
```json
{
  "planId": "string",
  "operatorId": "string",
  "promotionId": "string (optional)",
  "eventType": "click | impression | conversion",
  "sourceUrl": "string"
}
```

Response: `{ "success": true }`

### GET /api/redirect/[planId]
Przekierowuje na stronę operatora z trackingiem.

Query params (optional): `utm_source`, `utm_medium`, `utm_campaign`

Flow:
1. Pobiera plan z DB
2. Zapisuje ClickEvent (eventType: "redirect")
3. 302 Redirect na `plan.affiliate.url` lub `operator.website`

### GET /api/sitemap
Dynamiczny sitemap XML z miast + kategorii + planów + blog posts.
Cache: 1h.

### GET/POST /api/reviews
- **GET** — lista opinii (filtrowanie: `?operator=ID&page=1&limit=10&sort=-createdAt`)
- **POST** — dodaj opinię (moderacja: isApproved=false)

Request body (POST):
```json
{
  "author": "string",
  "email": "string (optional)",
  "operatorId": "string",
  "planId": "string (optional)",
  "rating": 1-5,
  "title": "string",
  "content": "string",
  "pros": ["string"],
  "cons": ["string"]
}
```
Hook: auto-update operator rating i reviewCount.

### GET /api/compare?plans=id1,id2,id3
Porównywarka side-by-side (max 4 plany).
Zwraca pełne dane planów z populate (operator, category).
Zapisuje porównanie do kolekcji `comparisons`.

### GET /api/stats/[citySlug]
Statystyki miasta: populacja, operatorzy, średnie prędkości, liczba ofert.

### POST/DELETE /api/price-alerts
- **POST** — zapisz alert cenowy (email + preferencje)
- **DELETE** — wyłącz alert (`?email=...`)

### GET /api/public/plans
Publiczne API ofert z filtrowaniem:
```
?category=internet-swiatlowodowy
?city=warszawa
?operator=orange
?minSpeed=300
?maxPrice=80
?technology=FTTH
?page=1&limit=20&sort=pricing.priceMonthly
```
Cache: 5 min.

### GET /api/cron?job=NAME&secret=CRON_SECRET
Endpoint do uruchamiania scheduled jobs. Autoryzacja: `CRON_SECRET`.
Dostępne jobs: `expire-promotions`, `sync-gus`, `sync-speedtest`, `price-alerts`, `aggregate-clicks`.

## Payload GraphQL API

Endpoint: `/api/graphql`

Automatycznie generowany ze wszystkich kolekcji. Playground dostępny na `/api/graphql-playground` (dev mode).

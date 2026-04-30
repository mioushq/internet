# Database Schema

Auto-generowany przez Payload CMS z kolekcji. PostgreSQL via Drizzle ORM.

## Kolekcje (Tabele)

### operators
- `id`, `name`, `slug` (unique), `logo`, `logoDark`, `description`, `shortDescription`
- `website`, `supportPhone`, `coverageMapUrl`
- `rating` (1-5), `reviewCount`, `isActive`, `isPremiumPartner`, `priority`
- `commission_type` (cpc/cpl/cps/flat), `commission_value`
- `contact_person`, `contact_email`, `contact_phone`, `contact_notes`
- `seo_metaTitle`, `seo_metaDescription`, `seo_ogImage`

### plans
- `id`, `name`, `slug` (unique), `operator` → operators, `category` → categories
- `technology` (ftth/fttb/hfc/5g/lte/dsl/satellite)
- `speeds_download`, `speeds_upload`, `speeds_guaranteed`
- `pricing_priceMonthly`, `pricing_pricePromo`, `pricing_promoMonths`, `pricing_priceAfterPromo`, `pricing_installationFee`, `pricing_activationFee`, `pricing_totalCost24m`
- `contract_months`, `contract_cancellationFee`, `contract_freeRouterIncluded`, `contract_routerModel`
- `extras_includesTV`, `extras_tvChannels`, `extras_includesPhone`, `extras_includesMobile`, `extras_features[]`, `extras_additionalInfo`
- `display_badge`, `display_badgeColor`, `display_highlightBox`, `display_customCTA`, `display_sortOrder`
- `affiliate_url`, `affiliate_affiliateId`, `affiliate_landingPageUrl`
- `sponsoring_isSponsored`, `sponsoring_sponsoredLabel`, `sponsoring_sponsoredFrom`, `sponsoring_sponsoredUntil`
- `availability_isActive`, `availability_isPromoted`, `availability_regions[]` → cities, `availability_validFrom`, `availability_validUntil`
- `seo_metaTitle`, `seo_metaDescription`

### categories
- `id`, `name`, `slug` (unique), `urlPrefix` (unique), `icon`, `description`, `shortDescription`, `sortOrder`, `isActive`
- `seo_metaTitle`, `seo_metaDescription`, `seo_h1Template`, `seo_contentTemplate`

### cities
- `id`, `name`, `slug` (unique), `voivodeship`, `population`, `isMainCity`
- `availableOperators[]` → operators
- `coordinates_lat`, `coordinates_lng`, `isActive`
- `seo_metaTitle`, `seo_metaDescription`, `seo_ogImage`

### city_landing_pages
- `id`, `title`, `city` → cities, `category` → categories, `slug` (unique)
- `content_h1`, `content_heroText`, `content_bodyContent`, `content_faqItems[]`, `content_ctaText`
- `featured_operators[]` → operators, `featured_plans[]` → plans, `featured_customSortOrder[]`
- `seo_metaTitle`, `seo_metaDescription`, `seo_canonicalUrl`, `seo_ogImage`
- `isActive`, `publishedAt`

### promotions
- `id`, `name`, `type`, `placement`, `operator` → operators, `plan` → plans
- `image`, `imageMobile`, `title`, `description`, `ctaText`, `ctaUrl`, `affiliateUrl`
- `backgroundColor`, `isActive`, `startDate`, `endDate`, `impressionLimit`, `impressionCount`, `priority`

### click_events
- `id`, `plan` → plans, `operator` → operators, `promotion` → promotions
- `eventType` (click/redirect/impression/conversion)
- `sourceUrl`, `destinationUrl`, `userAgent`, `ipHash`, `referrer`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `device_type`, `device_browser`, `device_os`
- `city` → cities
- `createdAt`, `updatedAt`

### affiliate_links
- `id`, `name`, `operator` → operators, `baseUrl`, `trackingParam`, `trackingId`
- `additionalParams[]`, `isActive`, `cookieDays`, `commissionType`, `commissionRate`, `notes`

### box_display_config
- `id`, `name`, `slug` (unique), `layout`, `visibleFields[]`, `showOperatorLogo`, `showBadge`, `showRating`, `showSponsored`, `ctaButtonText`, `ctaButtonColor`, `isDefault`

### pages
- `id`, `title`, `slug` (unique), `content`, `isActive`, `seo_metaTitle`, `seo_metaDescription`, `seo_ogImage`

### media
- `id`, `alt`, `url`, `filename`, `mimeType`, `filesize`, `width`, `height`, `sizes` (thumbnail, card, banner, og)

### users
- `id`, `email`, `firstName`, `lastName`, `role` (admin/editor/viewer), `hash`, `salt`

## Relacje

```
plans.operator        → operators (many-to-one)
plans.category        → categories (many-to-one)
plans.availability.regions → cities (many-to-many)
city_landing_pages.city     → cities (many-to-one)
city_landing_pages.category → categories (many-to-one)
click_events.plan      → plans
click_events.operator  → operators
click_events.promotion → promotions
click_events.city      → cities
affiliate_links.operator → operators
promotions.operator    → operators
promotions.plan        → plans
cities.availableOperators → operators (many-to-many)
```

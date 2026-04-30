/**
 * URL Builder for SEO-friendly URLs
 * Generates URLs from category, city, speed, plan data
 *
 * URL Patterns:
 *   /                                          → Homepage
 *   /[category.urlPrefix]                      → Category page
 *   /[category.urlPrefix]/[city.slug]          → Category + City
 *   /[category.urlPrefix]/[city.slug]/[plan]   → Specific plan in city
 *   /[category.urlPrefix]/[speed]              → Category + Speed filter
 *   /operator/[operator.slug]                  → Operator page
 *   /miasta/[city.slug]                        → City landing page
 *   /oferty                                    → All offers
 */

interface UrlParts {
  categoryPrefix?: string
  citySlug?: string
  planSlug?: string
  speedSlug?: string
  operatorSlug?: string
}

export function buildUrl(parts: UrlParts): string {
  const { categoryPrefix, citySlug, planSlug, speedSlug, operatorSlug } = parts

  if (operatorSlug) {
    if (citySlug) return `/operator/${operatorSlug}/${citySlug}`
    return `/operator/${operatorSlug}`
  }

  if (categoryPrefix) {
    if (citySlug && planSlug) return `/${categoryPrefix}/${citySlug}/${planSlug}`
    if (citySlug) return `/${categoryPrefix}/${citySlug}`
    if (speedSlug) return `/${categoryPrefix}/${speedSlug}`
    return `/${categoryPrefix}`
  }

  if (citySlug) return `/miasta/${citySlug}`

  return '/oferty'
}

export function buildCategoryUrl(categoryPrefix: string): string {
  return buildUrl({ categoryPrefix })
}

export function buildCityCategoryUrl(categoryPrefix: string, citySlug: string): string {
  return buildUrl({ categoryPrefix, citySlug })
}

export function buildPlanUrl(categoryPrefix: string, citySlug: string, planSlug: string): string {
  return buildUrl({ categoryPrefix, citySlug, planSlug })
}

export function buildSpeedUrl(categoryPrefix: string, speedSlug: string): string {
  return buildUrl({ categoryPrefix, speedSlug })
}

export function buildOperatorUrl(operatorSlug: string, citySlug?: string): string {
  return buildUrl({ operatorSlug, citySlug })
}

export function buildCityLandingUrl(citySlug: string): string {
  return buildUrl({ citySlug })
}

export function buildAffiliateRedirectUrl(planId: string, utmParams?: Record<string, string>): string {
  const base = `/api/redirect/${planId}`
  if (!utmParams || Object.keys(utmParams).length === 0) return base
  const params = new URLSearchParams(utmParams)
  return `${base}?${params.toString()}`
}

/**
 * Parse SEO template with placeholders
 * Replaces {{city}}, {{category}}, {{operator}}, {{speed}} etc.
 */
export function parseSeoTemplate(
  template: string,
  values: Record<string, string>,
): string {
  let result = template
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
  }
  return result
}

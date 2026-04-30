/**
 * Affiliate link builder
 * Constructs final affiliate URLs with tracking parameters
 */

interface AffiliateConfig {
  baseUrl: string
  trackingParam: string
  trackingId: string
  additionalParams?: { key: string; value: string }[]
}

export function buildAffiliateUrl(
  config: AffiliateConfig,
  extraParams?: Record<string, string>,
): string {
  const url = new URL(config.baseUrl)
  url.searchParams.set(config.trackingParam, config.trackingId)

  if (config.additionalParams) {
    for (const param of config.additionalParams) {
      url.searchParams.set(param.key, param.value)
    }
  }

  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      url.searchParams.set(key, value)
    }
  }

  return url.toString()
}

export function getAffiliateUrlForPlan(
  planAffiliateUrl?: string,
  operatorAffiliateConfig?: AffiliateConfig,
): string | null {
  if (planAffiliateUrl) return planAffiliateUrl
  if (operatorAffiliateConfig) return buildAffiliateUrl(operatorAffiliateConfig)
  return null
}

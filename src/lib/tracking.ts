/**
 * Click and conversion tracking utilities
 * GDPR-compliant: IP addresses are hashed, no PII stored
 */

import crypto from 'crypto'

export function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + 'salt_porownywarka_2025').digest('hex').substring(0, 16)
}

export function detectDevice(userAgent: string): { type: 'desktop' | 'mobile' | 'tablet'; browser: string; os: string } {
  const ua = userAgent.toLowerCase()

  let type: 'desktop' | 'mobile' | 'tablet' = 'desktop'
  if (/tablet|ipad/i.test(ua)) type = 'tablet'
  else if (/mobile|android|iphone/i.test(ua)) type = 'mobile'

  let browser = 'unknown'
  if (ua.includes('chrome') && !ua.includes('edge')) browser = 'Chrome'
  else if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari'
  else if (ua.includes('edge')) browser = 'Edge'
  else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera'

  let os = 'unknown'
  if (ua.includes('windows')) os = 'Windows'
  else if (ua.includes('mac')) os = 'macOS'
  else if (ua.includes('linux')) os = 'Linux'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'

  return { type, browser, os }
}

export function parseUtmParams(url: URL): {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
} {
  return {
    source: url.searchParams.get('utm_source') || undefined,
    medium: url.searchParams.get('utm_medium') || undefined,
    campaign: url.searchParams.get('utm_campaign') || undefined,
    term: url.searchParams.get('utm_term') || undefined,
    content: url.searchParams.get('utm_content') || undefined,
  }
}

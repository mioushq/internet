/**
 * Slugify utility for Polish text
 * Converts Polish characters to ASCII and creates URL-friendly slugs
 */

const POLISH_MAP: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
  Ą: 'A',
  Ć: 'C',
  Ę: 'E',
  Ł: 'L',
  Ń: 'N',
  Ó: 'O',
  Ś: 'S',
  Ź: 'Z',
  Ż: 'Z',
}

export function slugify(text: string): string {
  return text
    .split('')
    .map((char) => POLISH_MAP[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function speedToSlug(speedMbps: number): string {
  if (speedMbps >= 1000) {
    return `${speedMbps / 1000}gb`
  }
  return `${speedMbps}mb`
}

export function contractToSlug(months: number | string): string {
  const m = typeof months === 'string' ? parseInt(months, 10) : months
  if (m === 0) return 'bez-umowy'
  return `${m}-miesiecy`
}

export function buildPlanSlug(operatorSlug: string, speedMbps: number, extras?: string): string {
  const parts = [operatorSlug, speedToSlug(speedMbps)]
  if (extras) {
    parts.push(slugify(extras))
  }
  return parts.join('-')
}

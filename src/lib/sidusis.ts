// --- SIDUSIS / internet.gov.pl — Client ---
// System Informacyjny o Dostępie do Usług Stacjonarnego Internetu Szerokopasmowego
// API: https://internet.gov.pl/api/
// Sprawdzanie dostępności operatorów per adres/lokalizacja

const SIDUSIS_BASE = 'https://internet.gov.pl'

interface SIDUSISProvider {
  operatorName: string
  technology: string
  maxSpeed: number // Mbps
  infrastructureOwner: string
}

interface CoverageResult {
  address: string
  providers: SIDUSISProvider[]
  hasFiber: boolean
  has5G: boolean
  hasCable: boolean
  totalProviders: number
}

// --- Sprawdź dostępność internetu pod adresem ---
// Uwaga: SIDUSIS nie ma publicznego REST API do zapytań per adres.
// Mapa jest dostępna na internet.gov.pl/map/ (interaktywna).
// Poniżej implementacja z wyszukiwarki publicznej.
export async function checkCoverage(address: string): Promise<CoverageResult | null> {
  try {
    // SIDUSIS wyszukiwarka: https://wyszukiwarka.uke.gov.pl/
    const url = `https://wyszukiwarka.uke.gov.pl/api/search?address=${encodeURIComponent(address)}`
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'InternetPorownywarka/1.0',
        'Accept': 'application/json',
      },
    })

    if (!res.ok) {
      console.warn(`SIDUSIS API returned ${res.status} for address: ${address}`)
      return null
    }

    const data = await res.json()

    const providers: SIDUSISProvider[] = (data.providers || []).map((p: any) => ({
      operatorName: p.name || p.operator_name || '',
      technology: p.technology || '',
      maxSpeed: p.max_speed || 0,
      infrastructureOwner: p.infrastructure_owner || '',
    }))

    return {
      address,
      providers,
      hasFiber: providers.some((p) => ['FTTH', 'FTTB', 'FTTN'].includes(p.technology)),
      has5G: providers.some((p) => p.technology === '5G'),
      hasCable: providers.some((p) => ['HFC', 'DOCSIS'].includes(p.technology)),
      totalProviders: providers.length,
    }
  } catch (error) {
    console.error('SIDUSIS coverage check error:', error)
    return null
  }
}

// --- Mapowanie nazw operatorów SIDUSIS → nasze slugi ---
export const SIDUSIS_OPERATOR_MAP: Record<string, string> = {
  'Orange Polska': 'orange',
  'Polkomtel': 'plus',
  'P4': 'play',
  'T-Mobile Polska': 't-mobile',
  'UPC Polska': 'upc',
  'Netia': 'netia',
  'INEA': 'inea',
  'Vectra': 'vectra',
  'Toya': 'toya',
  'Multimedia Polska': 'multimedia',
  'Nexera': 'nexera',
  'Światłowód Invest': 'swiatlowod-invest',
}

// --- Sprawdź dostępność w mieście (uproszczone) ---
export async function checkCityAvailability(cityName: string): Promise<string[]> {
  const result = await checkCoverage(cityName)
  if (!result) return []

  return result.providers
    .map((p) => {
      const normalizedName = Object.keys(SIDUSIS_OPERATOR_MAP).find((key) =>
        p.operatorName.toLowerCase().includes(key.toLowerCase()),
      )
      return normalizedName ? SIDUSIS_OPERATOR_MAP[normalizedName] : null
    })
    .filter(Boolean) as string[]
}

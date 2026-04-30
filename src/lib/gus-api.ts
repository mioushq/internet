// --- GUS BDL API Client ---
// Dokumentacja: https://api.stat.gov.pl/Home/BdlApi
// Dane demograficzne miast: populacja, gospodarstwa, dostęp do internetu

const GUS_API_BASE = 'https://bdl.stat.gov.pl/api/v1'

interface GUSUnit {
  id: string
  name: string
  level: number
  parentId?: string
}

interface GUSDataPoint {
  id: string
  name: string
  values: Array<{
    year: number
    val: number
    attrId?: number
  }>
}

// --- Wyszukaj jednostkę terytorialną (miasto) ---
export async function searchCity(cityName: string): Promise<GUSUnit[]> {
  const url = `${GUS_API_BASE}/units/search?name=${encodeURIComponent(cityName)}&level=6&format=json`
  const res = await fetch(url, {
    headers: { 'X-ClientId': process.env.GUS_API_KEY || '' },
  })
  if (!res.ok) throw new Error(`GUS API error: ${res.status}`)
  const data = await res.json()
  return data.results || []
}

// --- Pobierz dane zmiennej dla jednostki ---
export async function getVariableData(
  unitId: string,
  variableId: string,
  years?: number[],
): Promise<GUSDataPoint | null> {
  const yearParam = years ? `&year=${years.join('&year=')}` : ''
  const url = `${GUS_API_BASE}/data/by-unit/${unitId}?var-id=${variableId}${yearParam}&format=json`
  const res = await fetch(url, {
    headers: { 'X-ClientId': process.env.GUS_API_KEY || '' },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.results?.[0] || null
}

// --- Predefiniowane ID zmiennych GUS ---
export const GUS_VARIABLES = {
  POPULATION: '72305',           // Ludność ogółem
  HOUSEHOLDS: '72312',           // Gospodarstwa domowe
  INTERNET_ACCESS: '454738',     // % gospodarstw z dostępem do internetu
  BROADBAND_ACCESS: '454739',    // % z szerokopasmowym dostępem
  AREA_KM2: '72304',             // Powierzchnia km²
}

// --- Pobierz populację miasta ---
export async function getCityPopulation(unitId: string, year?: number): Promise<number | null> {
  const currentYear = year || new Date().getFullYear() - 1
  const data = await getVariableData(unitId, GUS_VARIABLES.POPULATION, [currentYear])
  if (!data?.values?.length) return null
  return data.values[0].val
}

// --- Pobierz statystyki internetu dla miasta ---
export async function getCityInternetStats(unitId: string): Promise<{
  population: number | null
  internetAccess: number | null
  broadbandAccess: number | null
}> {
  const year = new Date().getFullYear() - 1
  const [pop, internet, broadband] = await Promise.all([
    getVariableData(unitId, GUS_VARIABLES.POPULATION, [year]),
    getVariableData(unitId, GUS_VARIABLES.INTERNET_ACCESS, [year]),
    getVariableData(unitId, GUS_VARIABLES.BROADBAND_ACCESS, [year]),
  ])

  return {
    population: pop?.values?.[0]?.val ?? null,
    internetAccess: internet?.values?.[0]?.val ?? null,
    broadbandAccess: broadband?.values?.[0]?.val ?? null,
  }
}

// --- Mapowanie miast na kody TERYT (top 10 PL) ---
export const CITY_TERYT_MAP: Record<string, string> = {
  'warszawa': '1465011',
  'krakow': '1261011',
  'lodz': '1061011',
  'wroclaw': '0264011',
  'poznan': '3064011',
  'gdansk': '2261011',
  'szczecin': '3262011',
  'bydgoszcz': '0461011',
  'lublin': '0663011',
  'bialystok': '2061011',
  'katowice': '2469011',
  'gdynia': '2262011',
  'czestochowa': '2464011',
  'radom': '1462011',
  'torun': '0463011',
  'sosnowiec': '2475011',
  'rzeszow': '1863011',
  'kielce': '2661011',
  'gliwice': '2466011',
  'olsztyn': '2862011',
}

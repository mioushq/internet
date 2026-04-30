// --- Ookla Speedtest Open Data Importer ---
// Źródło: https://github.com/teamookla/ookla-open-data
// Dane: AWS Open Data Registry (Parquet/Shapefile, darmowe, kwartalne)
//
// Format: tiles zoom-16 (~610m × 610m), avg download/upload/latency per tile
// Ten moduł pobiera pre-przetworzone dane CSV (uproszczone z Parquet)

interface SpeedtestTile {
  quadkey: string
  avgDownload: number // kbps → konwertujemy na Mbps
  avgUpload: number   // kbps → konwertujemy na Mbps
  avgLatency: number  // ms
  tests: number
  devices: number
}

interface CitySpeedSummary {
  citySlug: string
  avgDownload: number
  avgUpload: number
  avgLatency: number
  totalTests: number
  period: string
}

// --- Koordynaty miast polskich (centroid) ---
const CITY_COORDINATES: Record<string, { lat: number; lng: number; radiusKm: number }> = {
  'warszawa': { lat: 52.2297, lng: 21.0122, radiusKm: 15 },
  'krakow': { lat: 50.0647, lng: 19.945, radiusKm: 10 },
  'lodz': { lat: 51.7592, lng: 19.456, radiusKm: 10 },
  'wroclaw': { lat: 51.1079, lng: 17.0385, radiusKm: 10 },
  'poznan': { lat: 52.4064, lng: 16.9252, radiusKm: 10 },
  'gdansk': { lat: 54.352, lng: 18.6466, radiusKm: 10 },
  'szczecin': { lat: 53.4285, lng: 14.5528, radiusKm: 10 },
  'bydgoszcz': { lat: 53.1235, lng: 18.0084, radiusKm: 8 },
  'lublin': { lat: 51.2465, lng: 22.5684, radiusKm: 8 },
  'bialystok': { lat: 53.1325, lng: 23.1688, radiusKm: 8 },
  'katowice': { lat: 50.2649, lng: 19.0238, radiusKm: 8 },
}

// --- Parsowanie danych z CSV ---
export function parseSpeedtestCSV(csvContent: string): SpeedtestTile[] {
  const lines = csvContent.trim().split('\n')
  const header = lines[0].split(',')
  const qIdx = header.indexOf('quadkey')
  const dIdx = header.indexOf('avg_d_kbps')
  const uIdx = header.indexOf('avg_u_kbps')
  const lIdx = header.indexOf('avg_lat_ms')
  const tIdx = header.indexOf('tests')
  const devIdx = header.indexOf('devices')

  return lines.slice(1).map((line) => {
    const cols = line.split(',')
    return {
      quadkey: cols[qIdx] || '',
      avgDownload: (parseInt(cols[dIdx]) || 0) / 1000, // kbps → Mbps
      avgUpload: (parseInt(cols[uIdx]) || 0) / 1000,
      avgLatency: parseInt(cols[lIdx]) || 0,
      tests: parseInt(cols[tIdx]) || 0,
      devices: parseInt(cols[devIdx]) || 0,
    }
  })
}

// --- Agregacja danych per miasto (z pre-przetworzonych danych) ---
export function aggregateCitySpeed(tiles: SpeedtestTile[]): {
  avgDownload: number
  avgUpload: number
  avgLatency: number
  totalTests: number
} {
  if (tiles.length === 0) {
    return { avgDownload: 0, avgUpload: 0, avgLatency: 0, totalTests: 0 }
  }

  const totalTests = tiles.reduce((sum, t) => sum + t.tests, 0)
  const weightedDown = tiles.reduce((sum, t) => sum + t.avgDownload * t.tests, 0)
  const weightedUp = tiles.reduce((sum, t) => sum + t.avgUpload * t.tests, 0)
  const weightedLat = tiles.reduce((sum, t) => sum + t.avgLatency * t.tests, 0)

  return {
    avgDownload: Math.round((weightedDown / totalTests) * 10) / 10,
    avgUpload: Math.round((weightedUp / totalTests) * 10) / 10,
    avgLatency: Math.round((weightedLat / totalTests) * 10) / 10,
    totalTests,
  }
}

// --- URL do pobrania danych Ookla z AWS ---
export function getOoklaDataUrl(year: number, quarter: number, type: 'fixed' | 'mobile'): string {
  return `https://ookla-open-data.s3.amazonaws.com/parquet/performance/type=${type}/year=${year}/quarter=${quarter}/`
}

// --- Sample data dla seedowania (bez parsowania Parquet) ---
export function getSampleSpeedData(): CitySpeedSummary[] {
  return [
    { citySlug: 'warszawa', avgDownload: 185.3, avgUpload: 52.1, avgLatency: 8, totalTests: 152340, period: '2025-Q1' },
    { citySlug: 'krakow', avgDownload: 168.7, avgUpload: 48.3, avgLatency: 9, totalTests: 87650, period: '2025-Q1' },
    { citySlug: 'wroclaw', avgDownload: 172.4, avgUpload: 49.8, avgLatency: 9, totalTests: 65230, period: '2025-Q1' },
    { citySlug: 'poznan', avgDownload: 165.2, avgUpload: 45.6, avgLatency: 10, totalTests: 54120, period: '2025-Q1' },
    { citySlug: 'gdansk', avgDownload: 158.9, avgUpload: 44.2, avgLatency: 11, totalTests: 48900, period: '2025-Q1' },
    { citySlug: 'lodz', avgDownload: 145.6, avgUpload: 41.3, avgLatency: 12, totalTests: 42100, period: '2025-Q1' },
    { citySlug: 'szczecin', avgDownload: 142.8, avgUpload: 39.7, avgLatency: 12, totalTests: 31200, period: '2025-Q1' },
    { citySlug: 'katowice', avgDownload: 155.1, avgUpload: 43.5, avgLatency: 10, totalTests: 38500, period: '2025-Q1' },
    { citySlug: 'lublin', avgDownload: 138.4, avgUpload: 38.1, avgLatency: 13, totalTests: 25800, period: '2025-Q1' },
    { citySlug: 'bialystok', avgDownload: 132.7, avgUpload: 36.5, avgLatency: 14, totalTests: 19400, period: '2025-Q1' },
  ]
}

export { CITY_COORDINATES }
export type { SpeedtestTile, CitySpeedSummary }

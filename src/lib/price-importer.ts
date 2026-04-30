// --- Price Importer — Import cen operatorów z CSV/JSON ---
// Bezpieczna alternatywa dla scrapingu — admin uploaduje plik z cenami

interface PriceImportRow {
  operatorSlug: string
  planName: string
  speedDownload: number
  speedUpload: number
  priceMonthly: number
  pricePromo?: number
  promoMonths?: number
  contractMonths?: number
  technology: string
  category: string
  features?: string[]
}

// --- Parsuj CSV z cenami ---
export function parsePriceCSV(csvContent: string): PriceImportRow[] {
  const lines = csvContent.trim().split('\n')
  const header = lines[0].split(';') // Separator: średnik (polski CSV)

  return lines.slice(1).map((line) => {
    const cols = line.split(';')
    const getCol = (name: string) => cols[header.indexOf(name)]?.trim() || ''

    return {
      operatorSlug: getCol('operator'),
      planName: getCol('plan_name'),
      speedDownload: parseInt(getCol('speed_download')) || 0,
      speedUpload: parseInt(getCol('speed_upload')) || 0,
      priceMonthly: parseFloat(getCol('price_monthly')) || 0,
      pricePromo: parseFloat(getCol('price_promo')) || undefined,
      promoMonths: parseInt(getCol('promo_months')) || undefined,
      contractMonths: parseInt(getCol('contract_months')) || undefined,
      technology: getCol('technology') || 'FTTH',
      category: getCol('category') || 'internet-swiatlowodowy',
      features: getCol('features')?.split(',').map((f) => f.trim()).filter(Boolean) || [],
    }
  })
}

// --- Walidacja importu ---
export function validateImport(rows: PriceImportRow[]): {
  valid: PriceImportRow[]
  errors: string[]
} {
  const errors: string[] = []
  const valid: PriceImportRow[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const lineNum = i + 2 // +1 for header, +1 for 1-indexed

    if (!row.operatorSlug) {
      errors.push(`Linia ${lineNum}: brak operatora`)
      continue
    }
    if (!row.planName) {
      errors.push(`Linia ${lineNum}: brak nazwy planu`)
      continue
    }
    if (row.speedDownload <= 0) {
      errors.push(`Linia ${lineNum}: prędkość pobierania <= 0`)
      continue
    }
    if (row.priceMonthly <= 0) {
      errors.push(`Linia ${lineNum}: cena miesięczna <= 0`)
      continue
    }

    valid.push(row)
  }

  return { valid, errors }
}

// --- Generuj przykładowy CSV ---
export function generateSampleCSV(): string {
  const header = 'operator;plan_name;speed_download;speed_upload;price_monthly;price_promo;promo_months;contract_months;technology;category;features'
  const rows = [
    'orange;Orange Światłowód 300;300;50;69.99;49.99;12;24;FTTH;internet-swiatlowodowy;router wifi,tv 60 kanałów',
    'orange;Orange Światłowód 600;600;100;89.99;59.99;12;24;FTTH;internet-swiatlowodowy;router wifi 6',
    'play;Play Światłowód 300;300;50;55;45;6;24;FTTH;internet-swiatlowodowy;router w cenie',
    'upc;UPC Fiber 500;500;50;79.99;49.99;12;24;HFC;internet-kablowy;router wifi,tv basic',
  ]
  return [header, ...rows].join('\n')
}

// --- Template do pobrania ---
export function getCSVTemplate(): string {
  return 'operator;plan_name;speed_download;speed_upload;price_monthly;price_promo;promo_months;contract_months;technology;category;features\n'
}

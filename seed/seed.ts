/**
 * Seed script — populates database with Polish operators, cities, categories, and sample plans
 * Run: npm run seed
 */

import { getPayload } from 'payload'
import config from '../payload.config'

const CATEGORIES = [
  { name: 'Internet światłowodowy', slug: 'internet-swiatlowodowy', urlPrefix: 'internet-swiatlowodowy', icon: 'wifi', shortDescription: 'Najszybszy internet po światłowodzie FTTH/FTTB', sortOrder: 10 },
  { name: 'Internet 5G', slug: 'internet-5g', urlPrefix: 'internet-5g', icon: 'signal', shortDescription: 'Szybki internet mobilny 5G', sortOrder: 9 },
  { name: 'Internet kablowy', slug: 'internet-kablowy', urlPrefix: 'internet-kablowy', icon: 'cable', shortDescription: 'Internet przez sieć kablową HFC', sortOrder: 8 },
  { name: 'Internet LTE', slug: 'internet-lte', urlPrefix: 'internet-lte', icon: 'radio', shortDescription: 'Internet mobilny LTE', sortOrder: 7 },
  { name: 'Internet DSL', slug: 'internet-dsl', urlPrefix: 'internet-dsl', icon: 'phone', shortDescription: 'Internet przez linię telefoniczną', sortOrder: 6 },
  { name: 'Internet satelitarny', slug: 'internet-satelitarny', urlPrefix: 'internet-satelitarny', icon: 'satellite', shortDescription: 'Internet przez łącze satelitarne', sortOrder: 5 },
]

const OPERATORS = [
  { name: 'Orange Polska', slug: 'orange', website: 'https://www.orange.pl', rating: 4.2, priority: 10 },
  { name: 'Play (P4)', slug: 'play', website: 'https://www.play.pl', rating: 4.0, priority: 9 },
  { name: 'Plus (Polkomtel)', slug: 'plus', website: 'https://www.plus.pl', rating: 3.9, priority: 8 },
  { name: 'T-Mobile', slug: 't-mobile', website: 'https://www.t-mobile.pl', rating: 4.1, priority: 8 },
  { name: 'UPC Polska', slug: 'upc', website: 'https://www.upc.pl', rating: 3.8, priority: 7 },
  { name: 'Netia', slug: 'netia', website: 'https://www.netia.pl', rating: 3.7, priority: 6 },
  { name: 'Vectra', slug: 'vectra', website: 'https://www.vectra.pl', rating: 3.6, priority: 5 },
  { name: 'INEA', slug: 'inea', website: 'https://www.inea.pl', rating: 4.3, priority: 5 },
  { name: 'Toya', slug: 'toya', website: 'https://www.toya.net.pl', rating: 4.1, priority: 4 },
  { name: 'Multimedia Polska', slug: 'multimedia', website: 'https://www.multimedia.pl', rating: 3.5, priority: 4 },
  { name: 'Tauron', slug: 'tauron', website: 'https://www.tauron.pl', rating: 3.4, priority: 3 },
  { name: 'Starlink', slug: 'starlink', website: 'https://www.starlink.com', rating: 4.0, priority: 3 },
]

const CITIES = [
  { name: 'Warszawa', slug: 'warszawa', voivodeship: 'mazowieckie', population: 1861975, isMainCity: true, lat: 52.2297, lng: 21.0122 },
  { name: 'Kraków', slug: 'krakow', voivodeship: 'malopolskie', population: 802583, isMainCity: true, lat: 50.0647, lng: 19.9450 },
  { name: 'Łódź', slug: 'lodz', voivodeship: 'lodzkie', population: 672185, isMainCity: true, lat: 51.7592, lng: 19.4560 },
  { name: 'Wrocław', slug: 'wroclaw', voivodeship: 'dolnoslaskie', population: 674079, isMainCity: true, lat: 51.1079, lng: 17.0385 },
  { name: 'Poznań', slug: 'poznan', voivodeship: 'wielkopolskie', population: 534813, isMainCity: true, lat: 52.4064, lng: 16.9252 },
  { name: 'Gdańsk', slug: 'gdansk', voivodeship: 'pomorskie', population: 486492, isMainCity: true, lat: 54.3520, lng: 18.6466 },
  { name: 'Szczecin', slug: 'szczecin', voivodeship: 'zachodniopomorskie', population: 398255, isMainCity: true, lat: 53.4285, lng: 14.5528 },
  { name: 'Bydgoszcz', slug: 'bydgoszcz', voivodeship: 'kujawsko-pomorskie', population: 348190, isMainCity: true, lat: 53.1235, lng: 18.0084 },
  { name: 'Lublin', slug: 'lublin', voivodeship: 'lubelskie', population: 340727, isMainCity: true, lat: 51.2465, lng: 22.5684 },
  { name: 'Białystok', slug: 'bialystok', voivodeship: 'podlaskie', population: 297288, isMainCity: true, lat: 53.1325, lng: 23.1688 },
  { name: 'Katowice', slug: 'katowice', voivodeship: 'slaskie', population: 291774, isMainCity: true, lat: 50.2649, lng: 19.0238 },
  { name: 'Gdynia', slug: 'gdynia', voivodeship: 'pomorskie', population: 246991, isMainCity: false, lat: 54.5189, lng: 18.5305 },
  { name: 'Częstochowa', slug: 'czestochowa', voivodeship: 'slaskie', population: 220433, isMainCity: false, lat: 50.8118, lng: 19.1203 },
  { name: 'Radom', slug: 'radom', voivodeship: 'mazowieckie', population: 213029, isMainCity: false, lat: 51.4027, lng: 21.1471 },
  { name: 'Toruń', slug: 'torun', voivodeship: 'kujawsko-pomorskie', population: 199650, isMainCity: false, lat: 53.0138, lng: 18.5984 },
  { name: 'Sosnowiec', slug: 'sosnowiec', voivodeship: 'slaskie', population: 196692, isMainCity: false, lat: 50.2863, lng: 19.1041 },
  { name: 'Kielce', slug: 'kielce', voivodeship: 'swietokrzyskie', population: 194852, isMainCity: true, lat: 50.8661, lng: 20.6286 },
  { name: 'Rzeszów', slug: 'rzeszow', voivodeship: 'podkarpackie', population: 196208, isMainCity: true, lat: 50.0412, lng: 21.9991 },
  { name: 'Gliwice', slug: 'gliwice', voivodeship: 'slaskie', population: 177049, isMainCity: false, lat: 50.2945, lng: 18.6714 },
  { name: 'Zabrze', slug: 'zabrze', voivodeship: 'slaskie', population: 170316, isMainCity: false, lat: 50.3249, lng: 18.7857 },
  { name: 'Olsztyn', slug: 'olsztyn', voivodeship: 'warminsko-mazurskie', population: 171249, isMainCity: true, lat: 53.7784, lng: 20.4801 },
  { name: 'Bielsko-Biała', slug: 'bielsko-biala', voivodeship: 'slaskie', population: 170663, isMainCity: false, lat: 49.8224, lng: 19.0586 },
  { name: 'Bytom', slug: 'bytom', voivodeship: 'slaskie', population: 163552, isMainCity: false, lat: 50.3483, lng: 18.9319 },
  { name: 'Zielona Góra', slug: 'zielona-gora', voivodeship: 'lubuskie', population: 141222, isMainCity: true, lat: 51.9356, lng: 15.5062 },
  { name: 'Rybnik', slug: 'rybnik', voivodeship: 'slaskie', population: 138098, isMainCity: false, lat: 50.0971, lng: 18.5463 },
  { name: 'Ruda Śląska', slug: 'ruda-slaska', voivodeship: 'slaskie', population: 136137, isMainCity: false, lat: 50.2558, lng: 18.8556 },
  { name: 'Opole', slug: 'opole', voivodeship: 'opolskie', population: 128137, isMainCity: true, lat: 50.6751, lng: 17.9213 },
  { name: 'Tychy', slug: 'tychy', voivodeship: 'slaskie', population: 127831, isMainCity: false, lat: 50.1371, lng: 18.9640 },
  { name: 'Gorzów Wielkopolski', slug: 'gorzow-wielkopolski', voivodeship: 'lubuskie', population: 123609, isMainCity: false, lat: 52.7325, lng: 15.2369 },
  { name: 'Elbląg', slug: 'elblag', voivodeship: 'warminsko-mazurskie', population: 119428, isMainCity: false, lat: 54.1522, lng: 19.4045 },
  { name: 'Płock', slug: 'plock', voivodeship: 'mazowieckie', population: 117350, isMainCity: false, lat: 52.5463, lng: 19.7065 },
  { name: 'Dąbrowa Górnicza', slug: 'dabrowa-gornicza', voivodeship: 'slaskie', population: 117415, isMainCity: false, lat: 50.3308, lng: 19.1898 },
  { name: 'Wałbrzych', slug: 'walbrzych', voivodeship: 'dolnoslaskie', population: 112594, isMainCity: false, lat: 50.7714, lng: 16.2843 },
  { name: 'Włocławek', slug: 'wloclawek', voivodeship: 'kujawsko-pomorskie', population: 109883, isMainCity: false, lat: 52.6483, lng: 19.0677 },
  { name: 'Tarnów', slug: 'tarnow', voivodeship: 'malopolskie', population: 108196, isMainCity: false, lat: 50.0121, lng: 20.9858 },
  { name: 'Chorzów', slug: 'chorzow', voivodeship: 'slaskie', population: 107807, isMainCity: false, lat: 50.2974, lng: 18.9545 },
  { name: 'Koszalin', slug: 'koszalin', voivodeship: 'zachodniopomorskie', population: 107670, isMainCity: false, lat: 54.1943, lng: 16.1715 },
  { name: 'Kalisz', slug: 'kalisz', voivodeship: 'wielkopolskie', population: 101625, isMainCity: false, lat: 51.7611, lng: 18.0910 },
  { name: 'Legnica', slug: 'legnica', voivodeship: 'dolnoslaskie', population: 100324, isMainCity: false, lat: 51.2070, lng: 16.1619 },
  { name: 'Grudziądz', slug: 'grudziadz', voivodeship: 'kujawsko-pomorskie', population: 95045, isMainCity: false, lat: 53.4837, lng: 18.7536 },
  { name: 'Jaworzno', slug: 'jaworzno', voivodeship: 'slaskie', population: 91563, isMainCity: false, lat: 50.2056, lng: 19.2717 },
  { name: 'Słupsk', slug: 'slupsk', voivodeship: 'pomorskie', population: 90021, isMainCity: false, lat: 54.4641, lng: 17.0285 },
  { name: 'Jastrzębie-Zdrój', slug: 'jastrzebie-zdroj', voivodeship: 'slaskie', population: 88274, isMainCity: false, lat: 49.9478, lng: 18.5984 },
  { name: 'Nowy Sącz', slug: 'nowy-sacz', voivodeship: 'malopolskie', population: 83903, isMainCity: false, lat: 49.6219, lng: 20.6972 },
  { name: 'Jelenia Góra', slug: 'jelenia-gora', voivodeship: 'dolnoslaskie', population: 79684, isMainCity: false, lat: 50.9044, lng: 15.7197 },
  { name: 'Siedlce', slug: 'siedlce', voivodeship: 'mazowieckie', population: 78204, isMainCity: false, lat: 52.1676, lng: 22.2900 },
  { name: 'Mysłowice', slug: 'myslowice', voivodeship: 'slaskie', population: 74586, isMainCity: false, lat: 50.2084, lng: 19.1664 },
  { name: 'Konin', slug: 'konin', voivodeship: 'wielkopolskie', population: 73837, isMainCity: false, lat: 52.2230, lng: 18.2511 },
  { name: 'Piła', slug: 'pila', voivodeship: 'wielkopolskie', population: 73498, isMainCity: false, lat: 53.1509, lng: 16.7382 },
  { name: 'Ostrów Wielkopolski', slug: 'ostrow-wielkopolski', voivodeship: 'wielkopolskie', population: 72050, isMainCity: false, lat: 51.6553, lng: 17.8067 },
]

const SAMPLE_PLANS = [
  { name: 'Orange Love Internet 300', operatorSlug: 'orange', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 50, price: 65, promo: 45, promoMonths: 12, contract: '24', slug: 'orange-swiatlowod-300mb' },
  { name: 'Orange Love Internet 600', operatorSlug: 'orange', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 600, speedUp: 100, price: 85, promo: 55, promoMonths: 12, contract: '24', slug: 'orange-swiatlowod-600mb' },
  { name: 'Orange Love Internet 1Gb', operatorSlug: 'orange', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 1000, speedUp: 300, price: 99, promo: 69, promoMonths: 12, contract: '24', slug: 'orange-swiatlowod-1gb' },
  { name: 'Play Internet Światłowód 300', operatorSlug: 'play', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 50, price: 60, promo: 40, promoMonths: 6, contract: '24', slug: 'play-swiatlowod-300mb' },
  { name: 'Play Internet Światłowód 600', operatorSlug: 'play', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 600, speedUp: 100, price: 80, promo: 50, promoMonths: 6, contract: '24', slug: 'play-swiatlowod-600mb' },
  { name: 'Plus Internet Światłowód 300', operatorSlug: 'plus', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 50, price: 59, promo: 39, promoMonths: 12, contract: '24', slug: 'plus-swiatlowod-300mb' },
  { name: 'T-Mobile Internet Światłowód 300', operatorSlug: 't-mobile', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 50, price: 55, promo: 35, promoMonths: 12, contract: '24', slug: 't-mobile-swiatlowod-300mb' },
  { name: 'UPC Internet 300', operatorSlug: 'upc', categorySlug: 'internet-kablowy', technology: 'hfc', speedDown: 300, speedUp: 30, price: 69, promo: 49, promoMonths: 12, contract: '24', slug: 'upc-kablowy-300mb' },
  { name: 'UPC Internet 600', operatorSlug: 'upc', categorySlug: 'internet-kablowy', technology: 'hfc', speedDown: 600, speedUp: 50, price: 89, promo: 59, promoMonths: 12, contract: '24', slug: 'upc-kablowy-600mb' },
  { name: 'UPC Internet 1Gb', operatorSlug: 'upc', categorySlug: 'internet-kablowy', technology: 'hfc', speedDown: 1000, speedUp: 100, price: 109, promo: 79, promoMonths: 12, contract: '24', slug: 'upc-kablowy-1gb' },
  { name: 'Netia Światłowód 300', operatorSlug: 'netia', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 50, price: 55, promo: 39, promoMonths: 6, contract: '12', slug: 'netia-swiatlowod-300mb' },
  { name: 'Vectra Internet 300', operatorSlug: 'vectra', categorySlug: 'internet-kablowy', technology: 'hfc', speedDown: 300, speedUp: 30, price: 59, promo: 39, promoMonths: 12, contract: '24', slug: 'vectra-kablowy-300mb' },
  { name: 'INEA Światłowód 300', operatorSlug: 'inea', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 50, price: 49, promo: 35, promoMonths: 3, contract: '12', slug: 'inea-swiatlowod-300mb' },
  { name: 'INEA Światłowód 1Gb', operatorSlug: 'inea', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 1000, speedUp: 300, price: 79, promo: 55, promoMonths: 3, contract: '12', slug: 'inea-swiatlowod-1gb' },
  { name: 'Toya Światłowód 300', operatorSlug: 'toya', categorySlug: 'internet-swiatlowodowy', technology: 'ftth', speedDown: 300, speedUp: 100, price: 55, promo: 40, promoMonths: 6, contract: '24', slug: 'toya-swiatlowod-300mb' },
  { name: 'Play 5G Internet', operatorSlug: 'play', categorySlug: 'internet-5g', technology: '5g', speedDown: 500, speedUp: 100, price: 70, promo: 50, promoMonths: 6, contract: '24', slug: 'play-5g-500mb' },
  { name: 'Plus 5G Internet', operatorSlug: 'plus', categorySlug: 'internet-5g', technology: '5g', speedDown: 300, speedUp: 50, price: 65, promo: 45, promoMonths: 12, contract: '24', slug: 'plus-5g-300mb' },
  { name: 'T-Mobile 5G Internet', operatorSlug: 't-mobile', categorySlug: 'internet-5g', technology: '5g', speedDown: 400, speedUp: 80, price: 60, promo: 40, promoMonths: 12, contract: '24', slug: 't-mobile-5g-400mb' },
  { name: 'Starlink Standard', operatorSlug: 'starlink', categorySlug: 'internet-satelitarny', technology: 'satellite', speedDown: 150, speedUp: 20, price: 219, promo: 219, promoMonths: 0, contract: '0', slug: 'starlink-standard-150mb' },
]

async function seed() {
  console.log('🌱 Starting seed...')

  const payload = await getPayload({ config })

  // --- Categories ---
  console.log('📂 Seeding categories...')
  const categoryMap: Record<string, string> = {}
  for (const cat of CATEGORIES) {
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      categoryMap[cat.slug] = String(existing.docs[0].id)
      console.log(`  ⏭ Category "${cat.name}" already exists`)
      continue
    }
    const created = await payload.create({
      collection: 'categories',
      data: { ...cat, isActive: true },
    })
    categoryMap[cat.slug] = String(created.id)
    console.log(`  ✅ Created category: ${cat.name}`)
  }

  // --- Operators ---
  console.log('🏢 Seeding operators...')
  const operatorMap: Record<string, string> = {}
  for (const op of OPERATORS) {
    const existing = await payload.find({ collection: 'operators', where: { slug: { equals: op.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      operatorMap[op.slug] = String(existing.docs[0].id)
      console.log(`  ⏭ Operator "${op.name}" already exists`)
      continue
    }
    const created = await payload.create({
      collection: 'operators',
      data: {
        ...op,
        isActive: true,
        isPremiumPartner: false,
        reviewCount: Math.floor(Math.random() * 500) + 50,
        shortDescription: `${op.name} — sprawdź oferty internetowe`,
      },
    })
    operatorMap[op.slug] = String(created.id)
    console.log(`  ✅ Created operator: ${op.name}`)
  }

  // --- Cities ---
  console.log('🏙️ Seeding cities...')
  for (const city of CITIES) {
    const existing = await payload.find({ collection: 'cities', where: { slug: { equals: city.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      console.log(`  ⏭ City "${city.name}" already exists`)
      continue
    }
    await payload.create({
      collection: 'cities',
      data: {
        name: city.name,
        slug: city.slug,
        voivodeship: city.voivodeship as any,
        population: city.population,
        isMainCity: city.isMainCity,
        isActive: true,
        coordinates: { lat: city.lat, lng: city.lng },
      },
    })
    console.log(`  ✅ Created city: ${city.name}`)
  }

  // --- Plans ---
  console.log('📋 Seeding plans...')
  for (const plan of SAMPLE_PLANS) {
    const existing = await payload.find({ collection: 'plans', where: { slug: { equals: plan.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      console.log(`  ⏭ Plan "${plan.name}" already exists`)
      continue
    }

    const operatorId = operatorMap[plan.operatorSlug]
    const categoryId = categoryMap[plan.categorySlug]
    if (!operatorId || !categoryId) {
      console.log(`  ⚠️ Skipping "${plan.name}" — missing operator or category`)
      continue
    }

    await payload.create({
      collection: 'plans',
      data: {
        name: plan.name,
        slug: plan.slug,
        operator: operatorId as any,
        category: categoryId as any,
        technology: plan.technology as 'ftth' | 'fttb' | 'hfc' | '5g' | 'lte' | 'dsl' | 'satellite',
        speeds: {
          download: plan.speedDown,
          upload: plan.speedUp,
        },
        pricing: {
          priceMonthly: plan.price,
          pricePromo: plan.promo,
          promoMonths: plan.promoMonths,
          priceAfterPromo: plan.price,
          installationFee: 0,
          activationFee: 0,
        },
        contract: {
          months: plan.contract as '0' | '12' | '24' | '36',
          freeRouterIncluded: true,
        },
        extras: {
          includesTV: false,
          includesPhone: false,
          includesMobile: false,
        },
        display: {
          sortOrder: 0,
          highlightBox: false,
        },
        affiliate: {},
        sponsoring: {
          isSponsored: false,
        },
        availability: {
          isActive: true,
          isPromoted: false,
        },
        seo: {},
      },
    })
    console.log(`  ✅ Created plan: ${plan.name}`)
  }

  // --- Box Display Config ---
  console.log('📦 Seeding box display config...')
  const existingConfig = await payload.find({ collection: 'box-display-config', where: { slug: { equals: 'default' } }, limit: 1 })
  if (existingConfig.docs.length === 0) {
    await payload.create({
      collection: 'box-display-config',
      data: {
        name: 'Domyślny box',
        slug: 'default',
        layout: 'card',
        visibleFields: [
          { fieldName: 'speedDownload', label: 'Prędkość', displayOrder: 1, showOnMobile: true },
          { fieldName: 'priceMonthly', label: 'Cena/mies.', displayOrder: 2, showOnMobile: true },
          { fieldName: 'pricePromo', label: 'Cena promocyjna', displayOrder: 3, showOnMobile: true },
          { fieldName: 'contractMonths', label: 'Umowa', displayOrder: 4, showOnMobile: false },
          { fieldName: 'technology', label: 'Technologia', displayOrder: 5, showOnMobile: false },
        ],
        showOperatorLogo: true,
        showBadge: true,
        showRating: true,
        showSponsored: true,
        ctaButtonText: 'Sprawdź ofertę',
        ctaButtonColor: '#2563eb',
        isDefault: true,
      },
    })
    console.log('  ✅ Created default box config')
  }

  console.log('\n✅ Seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Operators } from './src/collections/Operators'
import { Plans } from './src/collections/Plans'
import { Categories } from './src/collections/Categories'
import { Cities } from './src/collections/Cities'
import { CityLandingPages } from './src/collections/CityLandingPages'
import { Promotions } from './src/collections/Promotions'
import { ClickEvents } from './src/collections/ClickEvents'
import { AffiliateLinks } from './src/collections/AffiliateLinks'
import { BoxDisplayConfig } from './src/collections/BoxDisplayConfig'
import { Pages } from './src/collections/Pages'
import { Reviews } from './src/collections/Reviews'
import { BlogPosts } from './src/collections/BlogPosts'
import { BlogCategories } from './src/collections/BlogCategories'
import { SpeedStats } from './src/collections/SpeedStats'
import { PriceAlerts } from './src/collections/PriceAlerts'
import { Comparisons } from './src/collections/Comparisons'
import { AnalyticsDaily } from './src/collections/AnalyticsDaily'

import { SiteSettings } from './src/globals/SiteSettings'
import { ComparisonConfig } from './src/globals/ComparisonConfig'
import { Navigation } from './src/globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Porównywarka Internetu CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Operators,
    Plans,
    Categories,
    Cities,
    CityLandingPages,
    Promotions,
    ClickEvents,
    AffiliateLinks,
    BoxDisplayConfig,
    Pages,
    Reviews,
    BlogPosts,
    BlogCategories,
    SpeedStats,
    PriceAlerts,
    Comparisons,
    AnalyticsDaily,
  ],
  globals: [
    SiteSettings,
    ComparisonConfig,
    Navigation,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})

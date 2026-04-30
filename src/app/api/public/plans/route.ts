import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const payload = await getPayloadClient()

    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const sort = searchParams.get('sort') || 'display.sortOrder'
    const categorySlug = searchParams.get('category')
    const citySlug = searchParams.get('city')
    const operatorSlug = searchParams.get('operator')
    const minSpeed = searchParams.get('minSpeed')
    const maxPrice = searchParams.get('maxPrice')
    const technology = searchParams.get('technology')

    const where: any = { 'availability.isActive': { equals: true } }

    // Filtrowanie po kategorii
    if (categorySlug) {
      const cats = await payload.find({
        collection: 'categories',
        where: { slug: { equals: categorySlug } },
        limit: 1,
      })
      if (cats.docs.length > 0) {
        where.category = { equals: cats.docs[0].id }
      }
    }

    // Filtrowanie po operatorze
    if (operatorSlug) {
      const ops = await payload.find({
        collection: 'operators',
        where: { slug: { equals: operatorSlug } },
        limit: 1,
      })
      if (ops.docs.length > 0) {
        where.operator = { equals: ops.docs[0].id }
      }
    }

    // Filtrowanie po mieście
    if (citySlug) {
      const cityResult = await payload.find({
        collection: 'cities',
        where: { slug: { equals: citySlug } },
        limit: 1,
      })
      if (cityResult.docs.length > 0) {
        where['availability.regions'] = { in: [cityResult.docs[0].id] }
      }
    }

    // Filtrowanie po prędkości
    if (minSpeed) {
      where['speeds.download'] = { greater_than_equal: parseInt(minSpeed) }
    }

    // Filtrowanie po cenie
    if (maxPrice) {
      where['pricing.priceMonthly'] = { less_than_equal: parseInt(maxPrice) }
    }

    // Filtrowanie po technologii
    if (technology) {
      where.technology = { equals: technology }
    }

    const plans = await payload.find({
      collection: 'plans',
      where,
      page,
      limit,
      sort,
      depth: 1,
    })

    return NextResponse.json(plans, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    })
  } catch (error) {
    console.error('Public plans API error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

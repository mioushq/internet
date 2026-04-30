import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type Props = {
  params: Promise<{ citySlug: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { citySlug } = await params
    const payload = await getPayloadClient()

    // Znajdź miasto
    const cities = await payload.find({
      collection: 'cities',
      where: { slug: { equals: citySlug } },
      limit: 1,
      depth: 1,
    })

    if (cities.docs.length === 0) {
      return NextResponse.json({ error: 'Miasto nie znalezione' }, { status: 404 })
    }

    const city = cities.docs[0]

    // Pobierz statystyki prędkości
    const speedStats = await payload.find({
      collection: 'speed-stats',
      where: { city: { equals: city.id } },
      sort: '-dataDate',
      limit: 10,
      depth: 1,
    })

    // Policz dostępne oferty
    const plans = await payload.find({
      collection: 'plans',
      where: {
        'availability.isActive': { equals: true },
        'availability.regions': { in: [city.id] },
      },
      limit: 0,
    })

    // Policz operatorów
    const operators = await payload.find({
      collection: 'operators',
      where: { isActive: { equals: true } },
      limit: 0,
    })

    // Pobierz średnią ocenę operatorów w mieście
    const reviews = await payload.find({
      collection: 'reviews',
      where: {
        city: { equals: city.id },
        isApproved: { equals: true },
      },
      limit: 0,
    })

    return NextResponse.json({
      city: {
        name: city.name,
        slug: city.slug,
        voivodeship: city.voivodeship,
        population: city.population,
      },
      stats: {
        totalPlans: plans.totalDocs,
        totalOperators: operators.totalDocs,
        totalReviews: reviews.totalDocs,
        speedStats: speedStats.docs,
      },
    })
  } catch (error) {
    console.error('City stats error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

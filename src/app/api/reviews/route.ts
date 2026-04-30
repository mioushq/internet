import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { hashIp } from '@/lib/tracking'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { author, email, operatorId, planId, cityId, rating, title, content, pros, cons } = body

    if (!author || !operatorId || !rating || !title || !content) {
      return NextResponse.json(
        { error: 'Wymagane pola: author, operatorId, rating, title, content' },
        { status: 400 },
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Ocena musi być od 1 do 5' }, { status: 400 })
    }

    // Honeypot antyspam — jeśli pole "website" jest wypełnione, to bot
    if (body.website) {
      return NextResponse.json({ success: true }) // Cicha odmowa
    }

    const payload = await getPayloadClient()
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    const review = await payload.create({
      collection: 'reviews',
      data: {
        author,
        email: email || undefined,
        operator: operatorId,
        plan: planId || undefined,
        city: cityId || undefined,
        rating,
        title,
        content,
        pros: pros?.map((text: string) => ({ text })) || [],
        cons: cons?.map((text: string) => ({ text })) || [],
        isApproved: false,
        isVerified: false,
        ipHash: hashIp(ip),
      } as any,
    })

    return NextResponse.json({
      success: true,
      message: 'Opinia została wysłana i oczekuje na moderację.',
      id: review.id,
    })
  } catch (error) {
    console.error('Review creation error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const { searchParams } = new URL(req.url)

    const operatorId = searchParams.get('operator')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const sort = searchParams.get('sort') || '-createdAt'

    const where: any = { isApproved: { equals: true } }
    if (operatorId) where.operator = { equals: operatorId }

    const reviews = await payload.find({
      collection: 'reviews',
      where,
      page,
      limit,
      sort,
      depth: 1,
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Reviews fetch error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

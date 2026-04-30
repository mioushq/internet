import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, cityId, categoryId, maxPrice, minSpeed, operatorIds } = body

    if (!email) {
      return NextResponse.json({ error: 'Email jest wymagany' }, { status: 400 })
    }

    if (!maxPrice && !minSpeed) {
      return NextResponse.json(
        { error: 'Podaj przynajmniej maxPrice lub minSpeed' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()

    // Sprawdź czy istnieje aktywny alert z tym mailem
    const existing = await payload.find({
      collection: 'price-alerts',
      where: {
        email: { equals: email },
        isActive: { equals: true },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Aktualizuj istniejący
      await payload.update({
        collection: 'price-alerts',
        id: existing.docs[0].id,
        data: {
          city: cityId || undefined,
          category: categoryId || undefined,
          maxPrice: maxPrice || undefined,
          minSpeed: minSpeed || undefined,
          operators: operatorIds || undefined,
          isActive: true,
        } as any,
      })

      return NextResponse.json({
        success: true,
        message: 'Alert cenowy został zaktualizowany.',
        updated: true,
      })
    }

    // Utwórz nowy
    await payload.create({
      collection: 'price-alerts',
      data: {
        email,
        city: cityId || undefined,
        category: categoryId || undefined,
        maxPrice: maxPrice || undefined,
        minSpeed: minSpeed || undefined,
        operators: operatorIds || undefined,
        isActive: true,
      } as any,
    })

    return NextResponse.json({
      success: true,
      message: 'Alert cenowy został utworzony. Powiadomimy Cię o nowych ofertach.',
    })
  } catch (error) {
    console.error('Price alert error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (!email) {
      return NextResponse.json({ error: 'Email jest wymagany' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    await payload.update({
      collection: 'price-alerts',
      where: { email: { equals: email } },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true, message: 'Alert cenowy został wyłączony.' })
  } catch (error) {
    console.error('Price alert delete error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { hashIp } from '@/lib/tracking'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const planIds = searchParams.get('plans')?.split(',').slice(0, 4)

    if (!planIds || planIds.length < 2) {
      return NextResponse.json(
        { error: 'Podaj minimum 2 plany (max 4): ?plans=id1,id2,id3' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()

    const plans = await Promise.all(
      planIds.map((id) =>
        payload.findByID({
          collection: 'plans',
          id,
          depth: 2,
        }).catch(() => null),
      ),
    )

    const validPlans = plans.filter(Boolean)

    if (validPlans.length < 2) {
      return NextResponse.json(
        { error: 'Nie znaleziono wystarczającej liczby planów' },
        { status: 404 },
      )
    }

    // Zapisz porównanie do analytics
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const sessionId = req.cookies.get('session_id')?.value || hashIp(ip + Date.now())

    await payload.create({
      collection: 'comparisons',
      data: {
        sessionId,
        plans: planIds,
        ipHash: hashIp(ip),
      } as any,
    }).catch(() => {}) // Nie blokuj odpowiedzi jeśli zapis się nie uda

    return NextResponse.json({
      plans: validPlans,
      comparedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Compare error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

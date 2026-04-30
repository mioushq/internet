import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { hashIp, detectDevice, parseUtmParams } from '@/lib/tracking'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { planId, operatorId, promotionId, eventType, sourceUrl } = body

    const payload = await getPayloadClient()

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const referrer = req.headers.get('referer') || ''
    const device = detectDevice(userAgent)

    const url = new URL(req.url)
    const utm = parseUtmParams(url)

    await payload.create({
      collection: 'click-events',
      data: {
        plan: planId || undefined,
        operator: operatorId || undefined,
        promotion: promotionId || undefined,
        eventType: eventType || 'click',
        sourceUrl: sourceUrl || '',
        userAgent,
        ipHash: hashIp(ip),
        referrer,
        utm,
        device,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Click tracking error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

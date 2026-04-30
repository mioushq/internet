import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { hashIp, detectDevice, parseUtmParams } from '@/lib/tracking'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const payload = await getPayloadClient()

    const plan = await payload.findByID({
      collection: 'plans',
      id,
      depth: 1,
    })

    if (!plan) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    const affiliateUrl =
      plan.affiliate?.url ||
      (plan.operator && typeof plan.operator === 'object' && plan.operator.website) ||
      '/'

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const referrer = req.headers.get('referer') || ''
    const device = detectDevice(userAgent)
    const url = new URL(req.url)
    const utm = parseUtmParams(url)

    await payload.create({
      collection: 'click-events',
      data: {
        plan: plan.id,
        operator: typeof plan.operator === 'object' ? plan.operator.id : plan.operator,
        eventType: 'redirect',
        sourceUrl: referrer,
        destinationUrl: affiliateUrl,
        userAgent,
        ipHash: hashIp(ip),
        referrer,
        utm,
        device,
      },
    })

    return NextResponse.redirect(affiliateUrl, { status: 302 })
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.redirect(new URL('/', req.url))
  }
}

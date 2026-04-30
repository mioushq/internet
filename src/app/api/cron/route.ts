import { NextRequest, NextResponse } from 'next/server'

// --- Cron API — uruchamianie scheduled jobs ---
// Wywoływany przez zewnętrzny cron (np. crontab, Railway cron, UptimeRobot)
// Autoryzacja: CRON_SECRET w nagłówku

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') || req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const job = req.nextUrl.searchParams.get('job')

  try {
    switch (job) {
      case 'expire-promotions': {
        const { expirePromotions } = await import('@/jobs/expire-promotions')
        const result = await expirePromotions()
        return NextResponse.json({ job, ...result })
      }

      case 'sync-gus': {
        const { syncGUSData } = await import('@/jobs/sync-gus')
        const result = await syncGUSData()
        return NextResponse.json({ job, ...result })
      }

      case 'sync-speedtest': {
        const { syncSpeedtestData } = await import('@/jobs/sync-speedtest')
        const result = await syncSpeedtestData()
        return NextResponse.json({ job, ...result })
      }

      case 'price-alerts': {
        const { sendPriceAlerts } = await import('@/jobs/send-price-alerts')
        const result = await sendPriceAlerts()
        return NextResponse.json({ job, ...result })
      }

      case 'aggregate-clicks': {
        const { aggregateClicks } = await import('@/jobs/aggregate-clicks')
        const result = await aggregateClicks()
        return NextResponse.json({ job, ...result })
      }

      default:
        return NextResponse.json({
          error: 'Unknown job',
          available: ['expire-promotions', 'sync-gus', 'sync-speedtest', 'price-alerts', 'aggregate-clicks'],
        }, { status: 400 })
    }
  } catch (error) {
    console.error(`Cron job "${job}" error:`, error)
    return NextResponse.json({ error: 'Job failed', job }, { status: 500 })
  }
}

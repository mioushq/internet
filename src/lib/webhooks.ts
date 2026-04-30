// --- Webhook System — powiadomienia o zdarzeniach ---

type WebhookEvent =
  | 'plan.created'
  | 'plan.updated'
  | 'review.created'
  | 'review.approved'
  | 'operator.updated'
  | 'alert.triggered'
  | 'error'

interface WebhookPayload {
  event: WebhookEvent
  timestamp: string
  data: Record<string, any>
}

// --- Wyślij webhook ---
async function sendWebhook(url: string, payload: WebhookPayload): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    })
    return res.ok
  } catch (error) {
    console.error(`Webhook failed (${url}):`, error)
    return false
  }
}

// --- Wyślij do Discord ---
export async function sendDiscordNotification(message: string, color?: number): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) return false

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: 'Porównywarka Internetu',
            description: message,
            color: color || 3447003, // Blue
            timestamp: new Date().toISOString(),
          },
        ],
      }),
      signal: AbortSignal.timeout(5000),
    })
    return res.ok
  } catch {
    return false
  }
}

// --- Wyślij do Slack ---
export async function sendSlackNotification(message: string): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return false

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `[Porównywarka] ${message}` }),
      signal: AbortSignal.timeout(5000),
    })
    return res.ok
  } catch {
    return false
  }
}

// --- Notyfikuj o zdarzeniu ---
export async function notifyEvent(event: WebhookEvent, data: Record<string, any>): Promise<void> {
  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
  }

  // Niestandardowe URL webhooków
  const customUrls = (process.env.WEBHOOK_URLS || '').split(',').filter(Boolean)
  for (const url of customUrls) {
    sendWebhook(url.trim(), payload) // Fire-and-forget
  }

  // Discord/Slack
  const messages: Record<WebhookEvent, string> = {
    'plan.created': `Nowa oferta: **${data.name || data.slug}** (${data.operator || ''})`,
    'plan.updated': `Oferta zaktualizowana: **${data.name || data.slug}**`,
    'review.created': `Nowa opinia od **${data.author}** — ${data.rating}/5 dla ${data.operator}`,
    'review.approved': `Opinia zatwierdzona: ${data.title} (${data.rating}/5)`,
    'operator.updated': `Operator zaktualizowany: **${data.name}**`,
    'alert.triggered': `Alert cenowy: ${data.email} — znaleziono ${data.matchCount} ofert`,
    'error': `❌ Błąd: ${data.message}`,
  }

  const message = messages[event] || `Zdarzenie: ${event}`
  sendDiscordNotification(message)
  sendSlackNotification(message)
}

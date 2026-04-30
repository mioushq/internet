import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const [categories, cities, operators, plans, blogPosts] = await Promise.all([
      payload.find({ collection: 'categories', where: { isActive: { equals: true } }, limit: 100 }),
      payload.find({ collection: 'cities', where: { isActive: { equals: true } }, limit: 500 }),
      payload.find({ collection: 'operators', where: { isActive: { equals: true } }, limit: 100 }),
      payload.find({ collection: 'plans', where: { 'availability.isActive': { equals: true } }, limit: 1000 }),
      payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, limit: 500 }),
    ])

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Strona główna
    xml += `  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n`
    xml += `  <url><loc>${baseUrl}/oferty</loc><changefreq>daily</changefreq><priority>0.9</priority></url>\n`
    xml += `  <url><loc>${baseUrl}/miasta</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`

    // Kategorie
    for (const cat of categories.docs) {
      xml += `  <url><loc>${baseUrl}/${cat.urlPrefix || cat.slug}</loc><changefreq>daily</changefreq><priority>0.9</priority></url>\n`

      // Kategoria + miasto
      for (const city of cities.docs) {
        xml += `  <url><loc>${baseUrl}/${cat.urlPrefix || cat.slug}/${city.slug}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>\n`
      }
    }

    // Landing pages miast
    for (const city of cities.docs) {
      xml += `  <url><loc>${baseUrl}/miasta/${city.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`
    }

    // Operatorzy
    for (const op of operators.docs) {
      xml += `  <url><loc>${baseUrl}/operator/${op.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`
    }

    // Blog posts
    for (const post of blogPosts.docs) {
      xml += `  <url><loc>${baseUrl}/blog/${post.slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`
    }

    xml += '</urlset>'

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

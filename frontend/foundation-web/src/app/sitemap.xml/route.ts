// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://foundation.xalorra.com' // Ganti sesuai domain kamu
  const locales = ['en', 'id']
  const staticPages = [
    '', // homepage
    'about',
    'whitepaper',
    'blog',
    'studio',
    'pricing',
    'privacy',
    'tos',
    'login',
    'client-login',
    'client-signup',
    'gitlab',
  ]

  let urls = ''

  for (const locale of locales) {
    for (const page of staticPages) {
      const path = page ? `/${locale}/${page}` : `/${locale}`
      urls += `
  <url>
    <loc>${baseUrl}${path}</loc>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

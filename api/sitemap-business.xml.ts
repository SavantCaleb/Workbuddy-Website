import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const { data: leads, error } = await supabase
    .from('workbuddy_leads')
    .select('slug, updated_at')
    .eq('is_published', true)
    .in('subscription_status', ['trial', 'active'])
    .not('slug', 'is', null);

  if (error) {
    console.error('Sitemap query error:', error);
    return res.status(500).send('Internal Server Error');
  }

  const urls = (leads || [])
    .map((lead) => {
      const lastmod = lead.updated_at
        ? new Date(lead.updated_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      return `  <url>
    <loc>https://getworkbuddy.com/s/${lead.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return res
    .status(200)
    .setHeader('Content-Type', 'application/xml')
    .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
    .send(xml);
}

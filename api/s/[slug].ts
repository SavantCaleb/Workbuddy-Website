import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { renderBusinessPage, renderPausedPage, renderNotFound } from '../_lib/template.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method Not Allowed');
  }

  const slug = req.query.slug as string;
  if (!slug) {
    return res.status(404).setHeader('Content-Type', 'text/html').send(renderNotFound());
  }

  const { data: page, error } = await supabase
    .from('business_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !page) {
    return res.status(404).setHeader('Content-Type', 'text/html').send(renderNotFound());
  }

  // Paused: page exists but is inactive
  const pausedStatuses = ['trial_expired', 'churned'];
  if (!page.is_published || pausedStatuses.includes(page.subscription_status)) {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      .send(renderPausedPage(page.business_name));
  }

  // Published: active page
  const activeStatuses = ['trial', 'active'];
  if (page.is_published && activeStatuses.includes(page.subscription_status)) {
    const html = renderBusinessPage(page);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600')
      .send(html);
  }

  // Any other state (e.g. 'lead') — treat as not found
  return res.status(404).setHeader('Content-Type', 'text/html').send(renderNotFound());
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { renderBusinessPage, renderPausedPage, renderNotFound } from '../_lib/template.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method Not Allowed');
  }

  const slug = req.query.slug as string;
  if (!slug) {
    return res.status(404).setHeader('Content-Type', 'text/html').send(renderNotFound());
  }

  const { data: lead, error } = await supabase
    .from('workbuddy_leads')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !lead) {
    return res.status(404).setHeader('Content-Type', 'text/html').send(renderNotFound());
  }

  // Paused: page exists but is inactive
  const pausedStatuses = ['trial_expired', 'churned'];
  if (!lead.is_published || pausedStatuses.includes(lead.subscription_status)) {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      .send(renderPausedPage(lead.business_name));
  }

  // Published: active page
  const activeStatuses = ['trial', 'active'];
  if (lead.is_published && activeStatuses.includes(lead.subscription_status)) {
    const html = renderBusinessPage(lead);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600')
      .send(html);
  }

  // Any other state (e.g. 'lead') — treat as not found
  return res.status(404).setHeader('Content-Type', 'text/html').send(renderNotFound());
}

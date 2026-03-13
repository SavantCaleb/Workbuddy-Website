import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).end(); }
  }

  const { slug, event } = body || {};
  if (!slug) return res.status(400).end();

  const column = event === 'call_click' ? 'total_call_clicks' : 'total_page_views';

  const { error } = await supabase.rpc('increment_counter_by_slug', {
    p_slug: slug,
    p_column: column,
  });

  if (error) console.error('Track increment error:', error);

  return res.status(204).end();
}

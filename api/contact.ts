import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { slug, visitor_name, visitor_phone, visitor_message } = req.body || {};

  if (!slug || !visitor_name) {
    return res.status(400).json({ error: 'slug and visitor_name are required' });
  }

  // Look up lead by slug
  const { data: lead, error: leadError } = await supabase
    .from('workbuddy_leads')
    .select('id, is_published, subscription_status')
    .eq('slug', slug)
    .single();

  if (leadError || !lead) {
    return res.status(404).json({ error: 'Business not found' });
  }

  const activeStatuses = ['trial', 'active'];
  if (!lead.is_published || !activeStatuses.includes(lead.subscription_status)) {
    return res.status(403).json({ error: 'This business page is not active' });
  }

  // Insert contact submission
  const { error: insertError } = await supabase
    .from('contact_submissions')
    .insert({
      lead_id: lead.id,
      visitor_name,
      visitor_phone: visitor_phone || null,
      visitor_message: visitor_message || null,
      ip_address: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || null,
    });

  if (insertError) {
    console.error('Contact insert error:', insertError);
    return res.status(500).json({ error: 'Failed to submit message' });
  }

  // Increment contact clicks counter (non-critical)
  await supabase.rpc('increment_counter_by_slug', {
    p_slug: slug,
    p_column: 'total_contact_clicks',
  }).then(({ error: rpcErr }) => {
    if (rpcErr) console.error('Counter increment error:', rpcErr);
  });

  return res.status(200).json({ success: true });
}

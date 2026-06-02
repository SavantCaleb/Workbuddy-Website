import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const PIXEL_ID = '1763378975020525';
const ACCESS_TOKEN =
  'EAALVXyTSfq0BRpDJOSpBlSqiZCYZC7Q8YZA07rFxArnQHxfnnY5eQvlapQmCctWdKCfIJsVNMsDOVeMQZB7cqgFZBtcYzKlPqRSTkZCyvqkZBuA5ZCfRVSfG8YywQAZCHv8ZAh28sHkLZBuQo7gs3Oww2zLStXEKvrnQZAvIbYUTFz70TPdDUKwcQbxXopCqmucFG26xagZDZD';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).end(); }
  }

  const {
    event_name,
    event_source_url,
    user_agent,
    fbc,
    fbp,
    content_name,
    content_category,
  } = body || {};

  if (!event_name) return res.status(400).json({ error: 'event_name required' });

  const event_time = Math.floor(Date.now() / 1000);
  const event_id = `${event_name}_${event_time}_${crypto.randomBytes(8).toString('hex')}`;

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '';

  const payload = {
    data: [
      {
        event_name,
        event_time,
        event_id,
        event_source_url,
        action_source: 'website',
        user_data: {
          client_ip_address: ip,
          client_user_agent: user_agent || req.headers['user-agent'] || '',
          fbc: fbc || undefined,
          fbp: fbp || undefined,
        },
        custom_data: {
          content_name,
          content_category,
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI error:', result);
      return res.status(502).json({ error: 'Meta API error', detail: result });
    }

    return res.status(200).json({ success: true, event_id });
  } catch (err) {
    console.error('Meta CAPI fetch error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secret = req.headers['x-revalidation-secret'];
  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  // With Vercel CDN caching (s-maxage=900), pages auto-refresh every 15 minutes.
  // Explicit purge can be added later via Vercel Purge API if needed.
  return res.status(200).json({ revalidated: true });
}

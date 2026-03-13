-- Migration: Add business page columns to workbuddy_leads and create supporting tables
-- Run this against your Supabase project

-- 1. Add business page columns to workbuddy_leads
ALTER TABLE workbuddy_leads
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS address_street TEXT,
  ADD COLUMN IF NOT EXISTS address_city TEXT,
  ADD COLUMN IF NOT EXISTS address_state TEXT,
  ADD COLUMN IF NOT EXISTS address_zip TEXT,
  ADD COLUMN IF NOT EXISTS latitude DECIMAL,
  ADD COLUMN IF NOT EXISTS longitude DECIMAL,
  ADD COLUMN IF NOT EXISTS business_type TEXT,
  ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS hours JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS google_place_id TEXT,
  ADD COLUMN IF NOT EXISTS cached_reviews JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS cached_rating DECIMAL,
  ADD COLUMN IF NOT EXISTS cached_review_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cached_photos JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS photos JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS template TEXT DEFAULT 'default',
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'lead',
  ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS card_collected BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS last_drip_sent TEXT,
  ADD COLUMN IF NOT EXISTS last_drip_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS total_page_views INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_contact_clicks INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_call_clicks INTEGER DEFAULT 0;

-- 2. Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_workbuddy_leads_slug ON workbuddy_leads(slug);
CREATE INDEX IF NOT EXISTS idx_workbuddy_leads_published ON workbuddy_leads(is_published) WHERE is_published = true;

-- 3. Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  lead_id UUID REFERENCES workbuddy_leads(id),
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT,
  visitor_message TEXT,
  ip_address TEXT,
  notified BOOLEAN DEFAULT false
);

-- 4. RPC function: increment counter by slug
-- Used by /api/track and /api/contact for atomic counter increments
CREATE OR REPLACE FUNCTION increment_counter_by_slug(p_slug TEXT, p_column TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_column NOT IN ('total_page_views', 'total_contact_clicks', 'total_call_clicks') THEN
    RAISE EXCEPTION 'Invalid column name: %', p_column;
  END IF;

  EXECUTE format(
    'UPDATE workbuddy_leads SET %I = COALESCE(%I, 0) + 1 WHERE slug = $1',
    p_column, p_column
  ) USING p_slug;
END;
$$;

-- 5. RLS Policies
-- Allow anonymous reads on published leads
ALTER TABLE workbuddy_leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workbuddy_leads' AND policyname = 'anon_read_published'
  ) THEN
    CREATE POLICY anon_read_published ON workbuddy_leads
      FOR SELECT
      TO anon
      USING (true);  -- The serverless function handles access logic
  END IF;
END
$$;

-- Allow anonymous inserts into contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_submissions' AND policyname = 'anon_insert_contact'
  ) THEN
    CREATE POLICY anon_insert_contact ON contact_submissions
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END
$$;

-- Grant execute on RPC function to anon
GRANT EXECUTE ON FUNCTION increment_counter_by_slug(TEXT, TEXT) TO anon;

-- 6. RLS policy for anon SELECT (serverless function handles access logic)
CREATE POLICY anon_read_leads ON workbuddy_leads
  FOR SELECT
  TO anon
  USING (slug IS NOT NULL);

-- 7. Seed data (4 test businesses)
-- Note: workbuddy_leads requires `name` and `email` as NOT NULL columns
INSERT INTO workbuddy_leads (
  name, email, business_name, slug, tagline, phone, website_url, industry, business_type,
  address_street, address_city, address_state, address_zip, latitude, longitude,
  services, hours, google_place_id,
  cached_reviews, cached_rating, cached_review_count,
  is_published, subscription_status, trial_started_at, trial_ends_at
) VALUES
-- 1. Full-featured published business
(
  'Friendly City Laundry', 'hello@friendlycitylaundry.com',
  'Friendly City Laundry', 'friendly-city-laundry',
  'Harrisonburg''s favorite full-service laundromat',
  '(540) 555-0123', 'https://friendlycitylaundry.com',
  'Laundromat', 'Laundromat',
  '123 S Main St', 'Harrisonburg', 'VA', '22801',
  38.4496, -78.8689,
  '["Self-Service Washers & Dryers", "Wash & Fold Drop-off", "Commercial Laundry", "Pickup & Delivery", "Alterations"]',
  '{"monday": {"open": "6:00 AM", "close": "10:00 PM"}, "tuesday": {"open": "6:00 AM", "close": "10:00 PM"}, "wednesday": {"open": "6:00 AM", "close": "10:00 PM"}, "thursday": {"open": "6:00 AM", "close": "10:00 PM"}, "friday": {"open": "6:00 AM", "close": "11:00 PM"}, "saturday": {"open": "7:00 AM", "close": "11:00 PM"}, "sunday": {"open": "7:00 AM", "close": "9:00 PM"}}',
  'ChIJExample123',
  '[{"author": "Sarah M.", "rating": 5, "text": "Best laundromat in town! Always clean and the staff is super friendly.", "relative_time": "2 weeks ago"}, {"author": "James R.", "rating": 5, "text": "Their wash and fold service saved my life during a busy week. Highly recommend!", "relative_time": "1 month ago"}, {"author": "Maria L.", "rating": 4, "text": "Great machines, fair prices. The pickup service is very convenient.", "relative_time": "3 weeks ago"}]',
  4.8, 127,
  true, 'active', '2025-01-15T00:00:00Z', NULL
),
-- 2. Minimal published business (name + phone only, tests graceful degradation)
(
  'Interstate Logging', 'noemail@interstate-logging.com',
  'Interstate Logging', 'interstate-logging',
  NULL,
  '(304) 555-9876', NULL,
  'Logging', 'ProfessionalService',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  '[]', '{}', NULL,
  '[]', NULL, 0,
  true, 'trial', '2026-03-01T00:00:00Z', '2026-03-15T00:00:00Z'
),
-- 3. Churned / paused business (should show "page inactive")
(
  'Doug''s Wood Creations', 'doug@woodcreations.com',
  'Doug''s Wood Creations', 'dougs-wood-creations',
  'Custom woodworking and furniture',
  '(540) 555-4567', NULL,
  'Woodworking', 'LocalBusiness',
  '456 Oak Lane', 'Staunton', 'VA', '24401',
  38.1496, -79.0714,
  '["Custom Furniture", "Kitchen Cabinets", "Wood Restoration"]',
  '{}', NULL,
  '[]', NULL, 0,
  false, 'churned', '2025-06-01T00:00:00Z', '2025-06-15T00:00:00Z'
),
-- 4. Lead state (not published, should 404)
(
  'Valley Plumbing Co', 'info@valleyplumbing.com',
  'Valley Plumbing Co', 'valley-plumbing-co',
  'Licensed plumbing for the Shenandoah Valley',
  '(540) 555-7890', NULL,
  'Plumbing', 'Plumber',
  '789 Water St', 'Waynesboro', 'VA', '22980',
  38.0685, -78.8895,
  '["Emergency Repairs", "Water Heater Installation", "Drain Cleaning"]',
  '{}', NULL,
  '[]', NULL, 0,
  false, 'lead', NULL, NULL
)
ON CONFLICT (slug) DO NOTHING;

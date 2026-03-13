-- Migration: Add industry-aware template columns to business_pages
-- Adds rendering fields (address, services, hours, etc.) and new template sections
-- (about, trust signals, gallery, FAQ, social links, CTAs, service areas)

-- Add all page-rendering columns to business_pages
ALTER TABLE business_pages
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS website_url TEXT,
  ADD COLUMN IF NOT EXISTS business_type TEXT,
  ADD COLUMN IF NOT EXISTS address_street TEXT,
  ADD COLUMN IF NOT EXISTS address_city TEXT,
  ADD COLUMN IF NOT EXISTS address_state TEXT,
  ADD COLUMN IF NOT EXISTS address_zip TEXT,
  ADD COLUMN IF NOT EXISTS latitude DECIMAL,
  ADD COLUMN IF NOT EXISTS longitude DECIMAL,
  ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS hours JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS photos JSONB DEFAULT '[]',

  -- About section
  ADD COLUMN IF NOT EXISTS about_text TEXT,
  ADD COLUMN IF NOT EXISTS owner_name TEXT,
  ADD COLUMN IF NOT EXISTS owner_photo_url TEXT,
  ADD COLUMN IF NOT EXISTS year_established INTEGER,

  -- Trust signals
  ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS license_number TEXT,
  ADD COLUMN IF NOT EXISTS insurance_verified BOOLEAN DEFAULT false,

  -- Gallery
  ADD COLUMN IF NOT EXISTS gallery_photos JSONB DEFAULT '[]',

  -- FAQ
  ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]',

  -- Social links
  ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',

  -- CTA override
  ADD COLUMN IF NOT EXISTS primary_cta_text TEXT,
  ADD COLUMN IF NOT EXISTS primary_cta_url TEXT,

  -- Social proof
  ADD COLUMN IF NOT EXISTS customers_served INTEGER,

  -- Service area
  ADD COLUMN IF NOT EXISTS service_area_cities JSONB DEFAULT '[]',

  -- Emergency service flag
  ADD COLUMN IF NOT EXISTS is_emergency_service BOOLEAN DEFAULT false,

  -- Service pricing
  ADD COLUMN IF NOT EXISTS service_prices JSONB DEFAULT '{}';

-- RLS: allow anon reads (serverless handler controls access logic)
CREATE POLICY IF NOT EXISTS anon_read_business_pages ON business_pages
  FOR SELECT TO anon USING (slug IS NOT NULL);

-- Seed data: see individual INSERT statements in 002_seed_business_pages.sql

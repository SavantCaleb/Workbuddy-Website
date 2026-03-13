export interface BusinessData {
  id: string;
  slug: string;
  business_name: string;
  tagline?: string;
  phone?: string;
  email?: string;
  website_url?: string;
  industry?: string;
  business_type?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  latitude?: number;
  longitude?: number;
  services?: string[];
  hours?: Record<string, { open: string; close: string } | null>;
  google_place_id?: string;
  cached_reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    time?: string;
    relative_time?: string;
  }>;
  cached_rating?: number;
  cached_review_count?: number;
  cached_photos?: string[];
  logo_url?: string;
  photos?: string[];
  meta_title?: string;
  meta_description?: string;

  // New fields
  about_text?: string;
  owner_name?: string;
  owner_photo_url?: string;
  year_established?: number;
  certifications?: string[];
  license_number?: string;
  insurance_verified?: boolean;
  gallery_photos?: Array<{ url: string; alt?: string; caption?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  social_links?: Record<string, string>;
  primary_cta_text?: string;
  primary_cta_url?: string;
  customers_served?: number;
  service_area_cities?: string[];
  is_emergency_service?: boolean;
  service_prices?: Record<string, string>;
}

export type BusinessCategory =
  | 'home_services'
  | 'health_wellness'
  | 'food_beverage'
  | 'professional'
  | 'retail'
  | 'education'
  | 'events'
  | 'facility'
  | 'general';

export interface CTAConfig {
  primaryText: string;
  primaryAction: 'phone' | 'form' | 'url';
  formHeading: string;
  formSubmitText: string;
}

export type SectionRenderer = (data: BusinessData, cta: CTAConfig) => string;

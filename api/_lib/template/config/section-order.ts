import type { BusinessCategory } from '../types.js';

export type SectionName =
  | 'sticky-header'
  | 'hero'
  | 'social-proof-bar'
  | 'services'
  | 'about'
  | 'trust-signals'
  | 'gallery'
  | 'reviews'
  | 'faq'
  | 'hours'
  | 'location'
  | 'contact'
  | 'footer';

const DEFAULT_ORDER: SectionName[] = [
  'sticky-header',
  'hero',
  'social-proof-bar',
  'services',
  'about',
  'trust-signals',
  'gallery',
  'reviews',
  'faq',
  'hours',
  'location',
  'contact',
  'footer',
];

const CATEGORY_OVERRIDES: Partial<Record<BusinessCategory, SectionName[]>> = {
  home_services: [
    'sticky-header',
    'hero',
    'social-proof-bar',
    'trust-signals',
    'services',
    'about',
    'gallery',
    'reviews',
    'faq',
    'hours',
    'location',
    'contact',
    'footer',
  ],
  food_beverage: [
    'sticky-header',
    'hero',
    'social-proof-bar',
    'gallery',
    'services',
    'hours',
    'about',
    'trust-signals',
    'reviews',
    'faq',
    'location',
    'contact',
    'footer',
  ],
  professional: [
    'sticky-header',
    'hero',
    'social-proof-bar',
    'about',
    'services',
    'trust-signals',
    'reviews',
    'gallery',
    'faq',
    'hours',
    'location',
    'contact',
    'footer',
  ],
  events: [
    'sticky-header',
    'hero',
    'social-proof-bar',
    'gallery',
    'services',
    'about',
    'trust-signals',
    'reviews',
    'faq',
    'hours',
    'location',
    'contact',
    'footer',
  ],
};

export function getSectionOrder(category: BusinessCategory): SectionName[] {
  return CATEGORY_OVERRIDES[category] || DEFAULT_ORDER;
}

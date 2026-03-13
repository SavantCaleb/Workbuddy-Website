import type { BusinessCategory, BusinessData, CTAConfig } from '../types.js';

const CTA_DEFAULTS: Record<BusinessCategory, CTAConfig> = {
  home_services: {
    primaryText: 'Get a Free Estimate',
    primaryAction: 'form',
    formHeading: 'Request a Free Estimate',
    formSubmitText: 'Request Estimate',
  },
  health_wellness: {
    primaryText: 'Book an Appointment',
    primaryAction: 'form',
    formHeading: 'Schedule Your Visit',
    formSubmitText: 'Request Appointment',
  },
  food_beverage: {
    primaryText: 'Order Now',
    primaryAction: 'phone',
    formHeading: 'Contact Us',
    formSubmitText: 'Send Message',
  },
  professional: {
    primaryText: 'Free Consultation',
    primaryAction: 'form',
    formHeading: 'Schedule a Consultation',
    formSubmitText: 'Request Consultation',
  },
  retail: {
    primaryText: 'Visit Us Today',
    primaryAction: 'form',
    formHeading: 'Get in Touch',
    formSubmitText: 'Send Message',
  },
  education: {
    primaryText: 'Schedule a Tour',
    primaryAction: 'form',
    formHeading: 'Enroll Today',
    formSubmitText: 'Get Started',
  },
  events: {
    primaryText: 'Book Your Event',
    primaryAction: 'form',
    formHeading: 'Check Availability',
    formSubmitText: 'Check Availability',
  },
  facility: {
    primaryText: 'Visit Us Today',
    primaryAction: 'form',
    formHeading: 'Contact Us',
    formSubmitText: 'Send Message',
  },
  general: {
    primaryText: 'Contact Us',
    primaryAction: 'form',
    formHeading: 'Send Us a Message',
    formSubmitText: 'Send Message',
  },
};

export function getCTAConfig(category: BusinessCategory, data: BusinessData): CTAConfig {
  const defaults = CTA_DEFAULTS[category];
  return {
    ...defaults,
    primaryText: data.primary_cta_text || defaults.primaryText,
    primaryAction: data.primary_cta_url ? 'url' : defaults.primaryAction,
  };
}

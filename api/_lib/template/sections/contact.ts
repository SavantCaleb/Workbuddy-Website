import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';
import { getBusinessCategory } from '../config/industry-map.js';

export function renderContactSection(data: BusinessData, cta: CTAConfig): string {
  const category = getBusinessCategory(data.industry);
  const isHomeServices = category === 'home_services';
  const showServiceDropdown = isHomeServices && data.services && data.services.length > 0;
  const showPreferredDate = category === 'health_wellness' || category === 'events';
  const showProjectDetails = isHomeServices;

  return `
    <section class="section section--contact section--dark" id="contact">
      <div class="wrap">
        <div class="contact__layout">
          <div class="contact__info">
            <span class="section__label section__label--light">Get in Touch</span>
            <h2>${escapeHtml(cta.formHeading)}</h2>
            <p class="contact__desc">Fill out the form and we&rsquo;ll get back to you as soon as possible.</p>
            ${data.phone ? `<div class="contact__method">
              <div class="contact__method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
              <div><span class="contact__method-label">Call us</span><a href="tel:${escapeHtml(data.phone)}" class="contact__method-value" data-track="call">${escapeHtml(data.phone)}</a></div>
            </div>` : ''}
            ${data.email ? `<div class="contact__method">
              <div class="contact__method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg></div>
              <div><span class="contact__method-label">Email us</span><a href="mailto:${escapeHtml(data.email)}" class="contact__method-value">${escapeHtml(data.email)}</a></div>
            </div>` : ''}
          </div>
          <div class="contact__form-wrap">
            <form id="contact-form" class="contact-form">
              <input type="hidden" name="slug" value="${escapeHtml(data.slug)}" />
              <div class="form-row">
                <div class="form-group">
                  <label for="visitor_name">Full Name *</label>
                  <input type="text" id="visitor_name" name="visitor_name" required placeholder="John Smith" />
                </div>
                <div class="form-group">
                  <label for="visitor_phone">Phone Number</label>
                  <input type="tel" id="visitor_phone" name="visitor_phone" placeholder="(555) 123-4567" />
                </div>
              </div>
              ${showServiceDropdown ? `
                <div class="form-group">
                  <label for="visitor_service">Service Needed</label>
                  <select id="visitor_service" name="visitor_service">
                    <option value="">Select a service...</option>
                    ${data.services!.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('')}
                  </select>
                </div>
              ` : ''}
              ${showProjectDetails ? `
                <div class="form-row">
                  <div class="form-group">
                    <label for="visitor_project_type">Project Type</label>
                    <select id="visitor_project_type" name="visitor_project_type">
                      <option value="">Select type...</option>
                      <option value="repair">Repair</option>
                      <option value="installation">New Installation</option>
                      <option value="replacement">Replacement</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inspection">Inspection</option>
                      <option value="emergency">Emergency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="visitor_timeline">Timeline</label>
                    <select id="visitor_timeline" name="visitor_timeline">
                      <option value="">When do you need this?</option>
                      <option value="emergency">Emergency / ASAP</option>
                      <option value="this_week">This week</option>
                      <option value="this_month">This month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              ` : ''}
              ${showPreferredDate ? `
                <div class="form-group">
                  <label for="visitor_preferred_date">Preferred Date</label>
                  <input type="date" id="visitor_preferred_date" name="visitor_preferred_date" />
                </div>
              ` : ''}
              <div class="form-group">
                <label for="visitor_message">Message</label>
                <textarea id="visitor_message" name="visitor_message" rows="4" placeholder="${isHomeServices ? 'Describe your project or issue...' : 'How can we help you?'}"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">${escapeHtml(cta.formSubmitText)}</button>
              <div id="form-status" class="form-status" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </div>
    </section>`;
}

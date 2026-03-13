import type { BusinessData } from './types.js';
import type { CTAConfig } from './types.js';

export function getScripts(data: BusinessData, cta: CTAConfig): string {
  const hasGallery = data.gallery_photos && data.gallery_photos.length > 0;
  const galleryUrls = hasGallery
    ? JSON.stringify(data.gallery_photos!.map(p => p.url))
    : '[]';

  return `
    (function() {
      // Page view tracking
      try {
        navigator.sendBeacon('/api/track', JSON.stringify({ slug: '${data.slug}' }));
      } catch(e) {}

      // Sticky header show/hide on scroll
      var header = document.getElementById('sticky-header');
      if (header) {
        var threshold = 300;
        window.addEventListener('scroll', function() {
          var y = window.pageYOffset || document.documentElement.scrollTop;
          if (y > threshold) {
            header.classList.add('visible');
          } else {
            header.classList.remove('visible');
          }
        }, { passive: true });
      }

      // Hamburger menu toggle
      var hamburger = document.getElementById('hamburger');
      var mobileMenu = document.getElementById('mobile-menu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
          var isOpen = mobileMenu.classList.toggle('active');
          hamburger.classList.toggle('active');
          hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
          });
        });
      }

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
          var id = link.getAttribute('href').slice(1);
          var target = document.getElementById(id);
          if (target) {
            e.preventDefault();
            var offset = header ? 70 : 0;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        });
      });

      // Contact form
      var form = document.getElementById('contact-form');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          var status = document.getElementById('form-status');
          var btn = form.querySelector('button[type="submit"]');
          var originalText = btn.textContent;
          btn.disabled = true;
          btn.textContent = 'Sending...';
          status.textContent = '';
          status.className = 'form-status';

          var formData = {
            slug: '${data.slug}',
            visitor_name: form.visitor_name.value,
            visitor_phone: form.visitor_phone ? form.visitor_phone.value : '',
            visitor_message: form.visitor_message ? form.visitor_message.value : ''
          };

          // Include optional fields if present
          var optionalFields = ['visitor_service', 'visitor_preferred_date', 'visitor_project_type', 'visitor_timeline'];
          optionalFields.forEach(function(field) {
            if (form[field] && form[field].value) formData[field] = form[field].value;
          });

          fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              status.textContent = 'Message sent! We\\'ll be in touch soon.';
              status.className = 'form-status success';
              form.reset();
            } else {
              status.textContent = res.error || 'Something went wrong. Please try again.';
              status.className = 'form-status error';
            }
          })
          .catch(function() {
            status.textContent = 'Something went wrong. Please try again.';
            status.className = 'form-status error';
          })
          .finally(function() {
            btn.disabled = false;
            btn.textContent = originalText;
          });
        });
      }

      // Click tracking (call, CTA)
      document.querySelectorAll('[data-track]').forEach(function(el) {
        el.addEventListener('click', function() {
          try {
            var event = el.getAttribute('data-track') + '_click';
            navigator.sendBeacon('/api/track', JSON.stringify({ slug: '${data.slug}', event: event }));
          } catch(e) {}
        });
      });

      // Open Now indicator
      try {
        var rows = document.querySelectorAll('.hours-row[data-day]');
        if (rows.length) {
          var now = new Date();
          var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
          var today = days[now.getDay()];
          rows.forEach(function(row) {
            var badge = row.querySelector('.hours-row__badge');
            if (!badge) return;
            if (row.getAttribute('data-day') === today) {
              var timeEl = row.querySelector('.hours-row__time');
              var timeText = timeEl ? timeEl.textContent.trim() : '';
              if (timeText !== 'Closed') {
                badge.textContent = 'Today';
                badge.style.color = '#16a34a';
              } else {
                badge.textContent = 'Closed';
                badge.style.color = '#72788a';
              }
            }
          });
        }
      } catch(e) {}

      ${hasGallery ? `
      // Gallery lightbox
      var galleryPhotos = ${galleryUrls};
      var currentIndex = 0;
      window.openLightbox = function(index) {
        currentIndex = index;
        var lb = document.getElementById('lightbox');
        var img = document.getElementById('lightbox-img');
        img.src = galleryPhotos[index];
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      window.closeLightbox = function(e) {
        if (e.target === e.currentTarget || e.target.classList.contains('lightbox__close')) {
          document.getElementById('lightbox').classList.remove('active');
          document.body.style.overflow = '';
        }
      };
      window.navigateLightbox = function(dir) {
        currentIndex = (currentIndex + dir + galleryPhotos.length) % galleryPhotos.length;
        document.getElementById('lightbox-img').src = galleryPhotos[currentIndex];
      };
      document.addEventListener('keydown', function(e) {
        var lb = document.getElementById('lightbox');
        if (!lb || !lb.classList.contains('active')) return;
        if (e.key === 'Escape') { lb.classList.remove('active'); document.body.style.overflow = ''; }
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
      });
      ` : ''}
    })();
  `;
}

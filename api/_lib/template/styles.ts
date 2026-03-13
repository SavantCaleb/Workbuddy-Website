export function getStyles(): string {
  return `
    /* ─── Reset & Base ─────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --c-dark: #1c1c28;
      --c-body: #333946;
      --c-muted: #72788a;
      --c-accent: #c4954a;
      --c-accent-hover: #b3863f;
      --c-sage: #3d7a6a;
      --c-page-bg: #fdfcfa;
      --c-alt-bg: #f6f3ef;
      --c-dark-bg: #1c1c28;
      --c-card-bg: #ffffff;
      --c-border: #e9e5df;
      --c-border-light: #f0ede8;
      --c-star: #c4954a;
      --c-success: #16a34a;
      --c-error: #dc2626;
      --c-white: #ffffff;
      --c-overlay: rgba(28, 28, 40, 0.72);
      --font-display: 'DM Serif Display', Georgia, 'Times New Roman', serif;
      --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --wrap: 1200px;
      --gutter: 24px;
      --section-py: 88px;
      --radius: 12px;
      --radius-sm: 8px;
      --radius-lg: 16px;
      --shadow-sm: 0 1px 3px rgba(28,28,40,0.06);
      --shadow-md: 0 4px 24px rgba(28,28,40,0.08);
      --shadow-lg: 0 12px 48px rgba(28,28,40,0.12);
      --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      color: var(--c-body);
      background: var(--c-page-bg);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    img { display: block; max-width: 100%; }
    a { color: var(--c-accent); text-decoration: none; transition: color var(--transition); }
    a:hover { color: var(--c-accent-hover); }
    ul { list-style: none; }

    /* ─── Typography ───────────────────────────────────────────── */
    h1, h2, h3, h4 {
      font-family: var(--font-display);
      color: var(--c-dark);
      line-height: 1.15;
      letter-spacing: -0.01em;
    }
    h1 { font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 400; }
    h2 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 400; margin-bottom: 16px; }
    h3 { font-size: 1.25rem; font-weight: 400; }
    h4 { font-size: 1rem; font-weight: 400; }

    /* ─── Layout ───────────────────────────────────────────────── */
    .wrap {
      max-width: var(--wrap);
      margin: 0 auto;
      padding: 0 var(--gutter);
    }

    .section {
      padding: var(--section-py) 0;
      position: relative;
    }
    .section--alt { background: var(--c-alt-bg); }
    .section--dark {
      background: var(--c-dark-bg);
      color: rgba(255,255,255,0.85);
    }
    .section--dark h2,
    .section--dark h3,
    .section--dark h4 { color: var(--c-white); }
    .section--dark a { color: var(--c-accent); }
    .section--dark a:hover { color: #ddb06a; }

    .section__header { margin-bottom: 48px; }
    .section__header--center { text-align: center; }
    .section__label {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--c-accent);
      margin-bottom: 12px;
    }
    .section__label--light { color: var(--c-accent); }
    .section__actions {
      text-align: center;
      margin-top: 40px;
    }

    /* ─── Buttons ──────────────────────────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 32px;
      border-radius: var(--radius);
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      border: none;
      transition: all var(--transition);
      text-decoration: none;
      min-height: 48px;
      min-width: 48px;
      line-height: 1.2;
    }
    .btn:hover { text-decoration: none; }

    .btn-primary {
      background: var(--c-dark);
      color: var(--c-white);
    }
    .btn-primary:hover {
      background: #2a2a3a;
      color: var(--c-white);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .section--dark .btn-primary {
      background: var(--c-accent);
      color: var(--c-dark);
    }
    .section--dark .btn-primary:hover {
      background: var(--c-accent-hover);
      color: var(--c-dark);
    }

    .btn-ghost {
      background: rgba(255,255,255,0.15);
      color: var(--c-white);
      border: 1px solid rgba(255,255,255,0.3);
      backdrop-filter: blur(4px);
    }
    .btn-ghost:hover {
      background: rgba(255,255,255,0.25);
      color: var(--c-white);
    }

    .btn-outline {
      background: transparent;
      color: var(--c-dark);
      border: 2px solid var(--c-border);
    }
    .btn-outline:hover {
      border-color: var(--c-dark);
      color: var(--c-dark);
    }
    .section--dark .btn-outline {
      color: var(--c-white);
      border-color: rgba(255,255,255,0.3);
    }
    .section--dark .btn-outline:hover {
      border-color: var(--c-white);
      color: var(--c-white);
    }

    .btn-lg {
      padding: 18px 40px;
      font-size: 1.05rem;
      border-radius: var(--radius-lg);
    }
    .btn-sm {
      padding: 10px 20px;
      font-size: 0.85rem;
      min-height: 40px;
    }
    .btn-block { width: 100%; }

    /* ─── Stars ────────────────────────────────────────────────── */
    .star { font-size: 1rem; line-height: 1; }
    .star.full { color: var(--c-star); }
    .star.half { color: var(--c-star); opacity: 0.5; }
    .star.empty { color: var(--c-border); }

    /* ─── Sticky Header ────────────────────────────────────────── */
    .sticky-header {
      position: fixed;
      top: -100px;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(253, 252, 250, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 var(--c-border-light);
      transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .sticky-header.visible {
      top: 0;
      box-shadow: var(--shadow-sm), 0 1px 0 var(--c-border-light);
    }
    .sticky-header-inner {
      max-width: var(--wrap);
      margin: 0 auto;
      padding: 0 var(--gutter);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      gap: 16px;
    }
    .sticky-header-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      text-decoration: none;
      color: var(--c-dark);
    }
    .sticky-header-brand:hover { color: var(--c-dark); text-decoration: none; }
    .sticky-logo {
      width: 34px;
      height: 34px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      flex-shrink: 0;
    }
    .sticky-name {
      font-family: var(--font-display);
      font-size: 1.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sticky-nav {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .nav-link {
      padding: 8px 14px;
      font-size: 0.875rem;
      color: var(--c-muted);
      font-weight: 500;
      border-radius: var(--radius-sm);
      transition: color var(--transition), background var(--transition);
      white-space: nowrap;
    }
    .nav-link:hover {
      color: var(--c-dark);
      background: var(--c-alt-bg);
      text-decoration: none;
    }

    .sticky-header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
    }
    .sticky-phone {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--c-dark);
      white-space: nowrap;
    }
    .sticky-phone:hover { color: var(--c-accent); text-decoration: none; }

    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: background var(--transition);
    }
    .hamburger:hover { background: var(--c-alt-bg); }
    .hamburger span {
      display: block;
      height: 2px;
      background: var(--c-dark);
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.2s ease;
    }
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .mobile-menu {
      display: none;
      flex-direction: column;
      padding: 8px var(--gutter) 20px;
      border-top: 1px solid var(--c-border-light);
      background: rgba(253, 252, 250, 0.98);
    }
    .mobile-menu.active { display: flex; }
    .mobile-menu-inner {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .mobile-menu-link {
      display: block;
      padding: 14px 0;
      font-size: 1rem;
      color: var(--c-dark);
      font-weight: 500;
      border-bottom: 1px solid var(--c-border-light);
    }
    .mobile-menu-link:hover { text-decoration: none; color: var(--c-accent); }
    .mobile-menu-link:last-of-type { border-bottom: none; }
    .mobile-menu-inner .btn { margin-top: 8px; }

    /* ─── Hero ─────────────────────────────────────────────────── */
    .hero {
      position: relative;
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px var(--gutter) 48px;
      background: var(--c-dark-bg);
      overflow: hidden;
    }
    .hero--has-bg {
      background-size: cover;
      background-position: center;
      background-image: var(--hero-bg);
    }
    .hero__overlay {
      position: absolute;
      inset: 0;
      background: var(--c-overlay);
    }
    .hero--has-bg .hero__overlay {
      background: linear-gradient(
        180deg,
        rgba(28,28,40,0.45) 0%,
        rgba(28,28,40,0.65) 50%,
        rgba(28,28,40,0.85) 100%
      );
    }
    .hero__content {
      position: relative;
      z-index: 1;
      max-width: 740px;
    }
    .hero__logo {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-lg);
      object-fit: cover;
      margin: 0 auto 28px;
      box-shadow: var(--shadow-lg);
      border: 3px solid rgba(255,255,255,0.15);
    }
    .hero__title {
      color: var(--c-white);
      margin-bottom: 16px;
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
    .hero__tagline {
      font-size: clamp(1.1rem, 2.5vw, 1.35rem);
      color: rgba(255,255,255,0.75);
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .hero__rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .hero__stars { display: flex; gap: 2px; }
    .hero__stars .star { font-size: 1.1rem; }
    .hero__rating-text {
      font-size: 0.95rem;
      color: rgba(255,255,255,0.7);
    }
    .hero__address {
      font-size: 0.95rem;
      color: rgba(255,255,255,0.55);
      margin-bottom: 8px;
    }
    .hero__actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 36px;
    }
    .hero__fade {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(to bottom, transparent, var(--c-page-bg));
      z-index: 1;
      pointer-events: none;
    }

    /* ─── Social Proof Bar ─────────────────────────────────────── */
    .proof-bar {
      padding: 0;
      position: relative;
      z-index: 2;
      margin-top: -48px;
    }
    .proof-bar__inner {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      background: var(--c-card-bg);
      border-radius: var(--radius-lg);
      padding: 24px 32px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--c-border-light);
    }
    .proof__item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 20px;
      white-space: nowrap;
      position: relative;
    }
    .proof__item + .proof__item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: var(--c-border);
    }
    .proof__stars { display: flex; gap: 1px; }
    .proof__stars .star { font-size: 0.9rem; }
    .proof__number {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--c-dark);
      line-height: 1;
    }
    .proof__label {
      font-size: 0.875rem;
      color: var(--c-muted);
      font-weight: 500;
    }
    .proof__label strong {
      color: var(--c-dark);
      font-weight: 700;
    }
    .proof__icon {
      font-size: 1rem;
      line-height: 1;
    }
    .proof__item--cert .proof__icon { color: var(--c-sage); }
    .proof__item--emergency {
      background: var(--c-error);
      color: var(--c-white);
      border-radius: 100px;
      padding: 8px 18px;
    }
    .proof__item--emergency::before { display: none; }
    .proof__item--emergency .proof__icon {
      color: var(--c-white);
      font-size: 0.7rem;
      animation: pulse 2s infinite;
    }
    .proof__item--emergency .proof__label {
      color: var(--c-white);
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ─── Services ─────────────────────────────────────────────── */
    .svc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .svc-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 20px 24px;
      background: var(--c-card-bg);
      border: 1px solid var(--c-border-light);
      border-radius: var(--radius);
      transition: all var(--transition);
      cursor: default;
      animation: fadeInUp 0.5s ease both;
    }
    .svc-card:hover {
      border-color: var(--c-border);
      box-shadow: var(--shadow-sm);
      transform: translateY(-2px);
    }
    .svc-card__body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .svc-card__name {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--c-dark);
    }
    .svc-card__price {
      font-size: 0.85rem;
      color: var(--c-muted);
      font-weight: 500;
    }
    .svc-card__arrow {
      font-size: 1.5rem;
      color: var(--c-border);
      transition: color var(--transition), transform var(--transition);
      flex-shrink: 0;
    }
    .svc-card:hover .svc-card__arrow {
      color: var(--c-accent);
      transform: translateX(3px);
    }
    .svc-hidden { display: none; }
    .svc-expanded .svc-hidden { display: flex; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ─── About ────────────────────────────────────────────────── */
    .about__grid {
      max-width: 720px;
    }
    .about__grid--has-photo {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 56px;
      align-items: start;
      max-width: 100%;
    }
    .about__photo-col {
      position: relative;
    }
    .about__photo-frame {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      aspect-ratio: 3/4;
      box-shadow: var(--shadow-lg);
    }
    .about__photo-frame::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(0,0,0,0.05);
    }
    .about__photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .about__text-col {}
    .about__body {
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--c-body);
    }
    .about__attribution {
      margin-top: 32px;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .about__sig-line {
      width: 48px;
      height: 2px;
      background: var(--c-accent);
      flex-shrink: 0;
    }
    .about__sig {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .about__owner-name {
      font-family: var(--font-display);
      font-size: 1.1rem;
      color: var(--c-dark);
    }
    .about__since {
      font-size: 0.85rem;
      color: var(--c-muted);
    }

    /* ─── Trust Signals ────────────────────────────────────────── */
    .trust-grid {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .trust-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 20px 28px;
      background: var(--c-card-bg);
      border: 1px solid var(--c-border-light);
      border-radius: var(--radius);
      transition: all var(--transition);
    }
    .trust-card:hover {
      border-color: var(--c-accent);
      box-shadow: var(--shadow-sm);
    }
    .trust-card__icon {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }
    .trust-card__icon svg {
      width: 100%;
      height: 100%;
      stroke: var(--c-accent);
    }
    .trust-card__icon--shield svg {
      stroke: var(--c-sage);
    }
    .trust-card__text {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--c-dark);
    }

    /* ─── Reviews ──────────────────────────────────────────────── */
    .reviews__aggregate {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 24px;
    }
    .reviews__big-rating {
      font-family: var(--font-display);
      font-size: 3.5rem;
      color: var(--c-dark);
      line-height: 1;
    }
    .reviews__aggregate-detail {
      display: flex;
      flex-direction: column;
      gap: 4px;
      text-align: left;
    }
    .reviews__aggregate-stars {
      display: flex;
      gap: 2px;
    }
    .reviews__aggregate-stars .star { font-size: 1.2rem; }
    .reviews__aggregate-count {
      font-size: 0.875rem;
      color: var(--c-muted);
    }

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }
    .review-card {
      background: var(--c-card-bg);
      border: 1px solid var(--c-border-light);
      border-radius: var(--radius);
      padding: 28px;
      position: relative;
      transition: all var(--transition);
    }
    .review-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .review-card__quote {
      font-family: var(--font-display);
      font-size: 3.5rem;
      color: var(--c-accent);
      line-height: 0.8;
      margin-bottom: 8px;
      opacity: 0.6;
    }
    .review-card__text {
      font-size: 0.95rem;
      color: var(--c-body);
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .review-card__footer {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .review-card__avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--c-dark);
      color: var(--c-white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.8rem;
      flex-shrink: 0;
      letter-spacing: 0.02em;
    }
    .review-card__meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }
    .review-card__author {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--c-dark);
    }
    .review-card__stars { display: flex; gap: 1px; }
    .review-card__stars .star { font-size: 0.85rem; }
    .review-card__time {
      font-size: 0.8rem;
      color: var(--c-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ─── Gallery ──────────────────────────────────────────────── */
    .gallery-scroll {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .gallery-card {
      position: relative;
      border-radius: var(--radius);
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 4/3;
    }
    .gallery-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .gallery-card:hover img { transform: scale(1.06); }
    .gallery-card__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        transparent 40%,
        rgba(28,28,40,0.7) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 20px;
      opacity: 0;
      transition: opacity var(--transition);
    }
    .gallery-card:hover .gallery-card__overlay { opacity: 1; }
    .gallery-card__caption {
      color: var(--c-white);
      font-size: 0.875rem;
      font-weight: 500;
    }
    .gallery-card__zoom {
      position: absolute;
      top: 16px;
      right: 16px;
      color: var(--c-white);
      font-size: 1.5rem;
      opacity: 0;
      transform: scale(0.8);
      transition: all var(--transition);
    }
    .gallery-card:hover .gallery-card__zoom {
      opacity: 1;
      transform: scale(1);
    }

    /* Lightbox */
    .lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(0,0,0,0.92);
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
    }
    .lightbox.active { display: flex; }
    .lightbox__img {
      max-width: 90vw;
      max-height: 85vh;
      border-radius: var(--radius-sm);
      object-fit: contain;
      box-shadow: 0 0 80px rgba(0,0,0,0.5);
    }
    .lightbox__close {
      position: absolute;
      top: 20px;
      right: 24px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.8);
      font-size: 2.5rem;
      cursor: pointer;
      line-height: 1;
      min-height: 48px;
      min-width: 48px;
      transition: color var(--transition);
    }
    .lightbox__close:hover { color: var(--c-white); }
    .lightbox__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: var(--c-white);
      font-size: 2rem;
      padding: 12px 18px;
      cursor: pointer;
      border-radius: var(--radius);
      min-height: 48px;
      min-width: 48px;
      transition: background var(--transition);
    }
    .lightbox__nav:hover { background: rgba(255,255,255,0.2); }
    .lightbox__nav--prev { left: 20px; }
    .lightbox__nav--next { right: 20px; }

    /* ─── FAQ ──────────────────────────────────────────────────── */
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-item {
      border-bottom: 1px solid var(--c-border-light);
      overflow: hidden;
    }
    .faq-item:first-child { border-top: 1px solid var(--c-border-light); }
    .faq-item summary {
      padding: 24px 0;
      font-weight: 500;
      cursor: pointer;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 1.05rem;
      min-height: 48px;
      transition: color var(--transition);
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item summary:hover { color: var(--c-dark); }
    .faq-item__num {
      font-family: var(--font-display);
      font-size: 1.1rem;
      color: var(--c-accent);
      flex-shrink: 0;
      width: 32px;
    }
    .faq-item__q {
      flex: 1;
      color: var(--c-dark);
    }
    .faq-item__toggle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid var(--c-border);
      flex-shrink: 0;
      position: relative;
      transition: all var(--transition);
    }
    .faq-item__toggle::before,
    .faq-item__toggle::after {
      content: '';
      position: absolute;
      background: var(--c-muted);
      border-radius: 1px;
      transition: transform 0.3s ease;
    }
    .faq-item__toggle::before {
      width: 12px;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .faq-item__toggle::after {
      width: 2px;
      height: 12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .faq-item[open] .faq-item__toggle {
      border-color: var(--c-accent);
      background: var(--c-accent);
    }
    .faq-item[open] .faq-item__toggle::before,
    .faq-item[open] .faq-item__toggle::after {
      background: var(--c-white);
    }
    .faq-item[open] .faq-item__toggle::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
    .faq-item__answer {
      padding: 0 0 24px 52px;
    }
    .faq-item__answer p {
      font-size: 0.95rem;
      line-height: 1.75;
      color: var(--c-muted);
    }

    /* ─── Hours ────────────────────────────────────────────────── */
    .hours__layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }
    .hours__text {}
    .hours__cta {
      margin-top: 24px;
      font-size: 0.95rem;
      color: var(--c-muted);
    }
    .hours__cta a {
      color: var(--c-accent);
      font-weight: 600;
    }
    .hours__card {
      background: var(--c-card-bg);
      border: 1px solid var(--c-border-light);
      border-radius: var(--radius-lg);
      padding: 32px;
      box-shadow: var(--shadow-sm);
    }
    .hours-row {
      display: flex;
      align-items: center;
      padding: 12px 0;
      gap: 12px;
    }
    .hours-row + .hours-row {
      border-top: 1px solid var(--c-border-light);
    }
    .hours-row__day {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--c-dark);
      width: 110px;
      flex-shrink: 0;
    }
    .hours-row__sep {
      flex: 1;
      height: 1px;
      border-bottom: 1px dotted var(--c-border);
    }
    .hours-row__time {
      font-size: 0.9rem;
      color: var(--c-body);
      white-space: nowrap;
    }
    .hours-row__badge {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      min-width: 44px;
      text-align: right;
    }
    .hours-row--closed .hours-row__day { color: var(--c-muted); }
    .hours-row--closed .hours-row__time { color: var(--c-muted); }

    /* ─── Location ─────────────────────────────────────────────── */
    .location__layout {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 48px;
      align-items: start;
    }
    .location__info {}
    .location__address {
      font-size: 1.05rem;
      color: var(--c-muted);
      margin-bottom: 24px;
      line-height: 1.7;
    }
    .location__map {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      aspect-ratio: 16/10;
    }
    .location__map iframe {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* ─── Contact ──────────────────────────────────────────────── */
    .contact__layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 64px;
      align-items: start;
    }
    .contact__info {}
    .contact__desc {
      font-size: 1rem;
      color: rgba(255,255,255,0.6);
      margin-bottom: 36px;
      line-height: 1.7;
    }
    .contact__method {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 0;
    }
    .contact__method + .contact__method {
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .contact__method-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius);
      background: rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .contact__method-icon svg {
      width: 20px;
      height: 20px;
      stroke: var(--c-accent);
    }
    .contact__method-label {
      display: block;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.45);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .contact__method-value {
      font-size: 1rem;
      color: var(--c-white);
      font-weight: 600;
    }
    .contact__method-value:hover { color: var(--c-accent); }

    .contact__form-wrap {}

    /* ─── Contact Form ─────────────────────────────────────────── */
    .contact-form {}
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-group { margin-bottom: 20px; }
    .form-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 0.875rem;
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.02em;
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--radius);
      font-size: 0.95rem;
      font-family: var(--font-body);
      color: var(--c-white);
      background: rgba(255,255,255,0.06);
      transition: border-color var(--transition), background var(--transition), box-shadow var(--transition);
      -webkit-appearance: none;
      min-height: 48px;
    }
    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: rgba(255,255,255,0.3);
    }
    .form-group select option {
      background: var(--c-dark-bg);
      color: var(--c-white);
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: var(--c-accent);
      background: rgba(255,255,255,0.1);
      box-shadow: 0 0 0 3px rgba(196, 149, 74, 0.15);
    }
    .form-status {
      margin-top: 16px;
      font-size: 0.9rem;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
    }
    .form-status.success {
      color: var(--c-success);
      background: rgba(22, 163, 74, 0.1);
    }
    .form-status.error {
      color: var(--c-error);
      background: rgba(220, 38, 38, 0.1);
    }

    /* ─── Footer ───────────────────────────────────────────────── */
    .footer {
      background: var(--c-dark-bg);
      color: rgba(255,255,255,0.5);
      padding: 72px 0 0;
    }
    .footer h3, .footer h4 { color: var(--c-white); }
    .footer a { color: rgba(255,255,255,0.5); }
    .footer a:hover { color: var(--c-white); }

    .footer__grid {
      display: grid;
      grid-template-columns: 1.5fr repeat(auto-fit, minmax(160px, 1fr));
      gap: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .footer__brand {}
    .footer__logo {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      margin-bottom: 16px;
    }
    .footer__name {
      font-family: var(--font-display);
      font-size: 1.25rem;
      color: var(--c-white);
      margin-bottom: 8px;
      font-weight: 400;
    }
    .footer__tagline {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.4);
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .footer__social {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .footer__social-link {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.4);
      font-weight: 500;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255,255,255,0.08);
      transition: all var(--transition);
    }
    .footer__social-link:hover {
      color: var(--c-white);
      border-color: rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.05);
    }
    .footer__col {}
    .footer__heading {
      font-family: var(--font-body);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      margin-bottom: 20px;
    }
    .footer__links { display: flex; flex-direction: column; gap: 10px; }
    .footer__links li {}
    .footer__links a {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.5);
      transition: color var(--transition);
    }
    .footer__links a:hover { color: var(--c-white); }
    .footer__detail {
      font-size: 0.9rem;
      margin-bottom: 8px;
      line-height: 1.6;
    }
    .footer__detail a {
      color: rgba(255,255,255,0.6);
    }
    .footer__detail a:hover { color: var(--c-accent); }

    .footer__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.3);
    }
    .footer__legal {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .footer__legal a {
      color: rgba(255,255,255,0.3);
      transition: color var(--transition);
    }
    .footer__legal a:hover { color: rgba(255,255,255,0.6); }
    .footer__powered {
      color: rgba(255,255,255,0.25);
    }
    .footer__powered a {
      color: rgba(255,255,255,0.35);
      font-weight: 600;
    }
    .footer__powered a:hover { color: var(--c-accent); }

    /* ─── Paused Page ──────────────────────────────────────────── */
    .paused-page {
      text-align: center;
      padding: 120px var(--gutter);
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .paused-page h1 {
      font-size: 1.5rem;
      color: var(--c-muted);
      font-weight: 400;
    }
    .paused-page p { color: var(--c-muted); margin-top: 12px; }

    /* ─── 404 ──────────────────────────────────────────────────── */
    .not-found {
      text-align: center;
      padding: 120px var(--gutter);
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .not-found h1 {
      font-size: 5rem;
      color: var(--c-border);
    }
    .not-found p { color: var(--c-muted); margin-top: 12px; }
    .not-found a {
      margin-top: 24px;
      color: var(--c-accent);
      font-weight: 600;
    }

    /* ─── Responsive: Tablet ───────────────────────────────────── */
    @media (max-width: 1024px) {
      :root {
        --section-py: 72px;
      }
      .about__grid--has-photo {
        grid-template-columns: 220px 1fr;
        gap: 40px;
      }
      .hours__layout { gap: 40px; }
      .location__layout { gap: 32px; }
      .contact__layout { gap: 40px; }
    }

    /* ─── Responsive: Mobile ───────────────────────────────────── */
    @media (max-width: 768px) {
      :root {
        --section-py: 56px;
        --gutter: 20px;
      }

      .hero {
        min-height: 90vh;
        min-height: 90dvh;
        padding: 60px var(--gutter) 40px;
      }
      .hero__actions { flex-direction: column; align-items: center; }
      .hero__actions .btn { width: 100%; max-width: 340px; }
      .hero__fade { height: 80px; }

      /* Sticky header: collapse to hamburger */
      .sticky-nav { display: none; }
      .sticky-phone { display: none; }
      .hamburger { display: flex; }

      /* Proof bar */
      .proof-bar { margin-top: -32px; }
      .proof-bar__inner {
        flex-direction: column;
        align-items: center;
        padding: 20px 24px;
        gap: 4px;
      }
      .proof__item + .proof__item::before { display: none; }
      .proof__item {
        padding: 8px 12px;
        width: 100%;
        justify-content: center;
      }

      /* Services */
      .svc-grid { grid-template-columns: 1fr; }

      /* About */
      .about__grid--has-photo {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .about__photo-col { order: -1; }
      .about__photo-frame {
        aspect-ratio: 16/9;
        max-height: 280px;
      }

      /* Trust */
      .trust-grid {
        flex-direction: column;
        align-items: stretch;
      }

      /* Reviews */
      .reviews-grid { grid-template-columns: 1fr; }
      .reviews__aggregate { flex-wrap: wrap; }

      /* Gallery: horizontal scroll */
      .gallery-scroll {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        gap: 12px;
        padding-bottom: 12px;
      }
      .gallery-scroll::-webkit-scrollbar { height: 4px; }
      .gallery-scroll::-webkit-scrollbar-track { background: transparent; }
      .gallery-scroll::-webkit-scrollbar-thumb {
        background: var(--c-border);
        border-radius: 4px;
      }
      .gallery-card {
        flex: 0 0 80vw;
        max-width: 80vw;
        scroll-snap-align: start;
      }
      .gallery-card__overlay { opacity: 1; }

      /* Hours */
      .hours__layout { grid-template-columns: 1fr; gap: 32px; }

      /* Location */
      .location__layout { grid-template-columns: 1fr; gap: 32px; }
      .location__map { aspect-ratio: 16/9; }

      /* Contact */
      .contact__layout { grid-template-columns: 1fr; gap: 40px; }
      .form-row { grid-template-columns: 1fr; }

      /* Footer */
      .footer__grid { grid-template-columns: 1fr; gap: 32px; }
      .footer__bottom {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
      .footer__legal { flex-wrap: wrap; justify-content: center; }
    }

    @media (max-width: 480px) {
      .gallery-card {
        flex: 0 0 88vw;
        max-width: 88vw;
      }
      .lightbox__nav { display: none; }
    }
  `;
}

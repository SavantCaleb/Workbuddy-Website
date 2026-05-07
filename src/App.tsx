import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyles } from './styles/GlobalStyles';
import { SmoothScroll } from './components/SmoothScroll';
import { ReceptionistLayout } from './components/ReceptionistLayout';

// New pages (local service business marketing)
import { HomePage } from './pages/NewHome/HomePage';
import { AboutPage } from './pages/NewAbout/AboutPage';
import { CustomersPage } from './pages/Customers/CustomersPage';
import { PricingPage } from './pages/NewPricing/PricingPage';
import { FreeReportPage } from './pages/FreeReport/FreeReportPage';

// Receptionist / Laundromat pages (legacy product)
import { LaundromatLP } from './pages/Laundromat/LaundromatLP';
import { LaundromatAdsLP } from './pages/LaundromatAds/LaundromatAdsLP';
import { LaundromatAdsShortLP } from './pages/LaundromatAds/LaundromatAdsShortLP';
import { ThankYou } from './pages/Laundromat/ThankYou';
import { LaundromatAdsThankYou } from './pages/LaundromatAds/ThankYou';
import { PropertyManagementLP } from './pages/PropertyManagement/PropertyManagementLP';
import { BellaLP } from './pages/Bella/BellaLP';
import { Blog } from './pages/Blog/Blog';
import { BlogArticle } from './pages/Blog/BlogArticle';
import { FAQ } from './pages/FAQ/FAQ';
import { Contact } from './pages/Contact/Contact';
import { Demo } from './pages/Demo/Demo';
import { SecretShop } from './pages/SecretShop/SecretShop';
import { Privacy } from './pages/Privacy/Privacy';
import { Terms } from './pages/Terms/Terms';
import { FreeMakeoverPage } from './pages/LeadMagnet/FreeMakeoverPage';
import { FreeAuditPage } from './pages/LeadMagnet/FreeAuditPage';
import { NotFound } from './pages/NotFound/NotFound';
import { JoinRedirect } from './pages/Join/JoinRedirect';

/* Wrap receptionist pages so they keep their old Apple-style typography */
const R = ({ children }: { children: React.ReactNode }) => (
  <ReceptionistLayout>{children}</ReceptionistLayout>
);

function App() {
  return (
    <Router>
      <GlobalStyles />
      <SmoothScroll />
      <Routes>
        {/* ── New main pages ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* ── Receptionist / Laundromat vertical (under /receptionist) ── */}
        <Route path="/receptionist" element={<R><LaundromatLP /></R>} />
        <Route path="/receptionist/ads" element={<R><LaundromatAdsLP /></R>} />
        <Route path="/receptionist/ads-short" element={<R><LaundromatAdsShortLP /></R>} />
        <Route path="/receptionist/ads/thank-you" element={<R><LaundromatAdsThankYou /></R>} />
        <Route path="/receptionist/thank-you" element={<R><ThankYou /></R>} />
        <Route path="/receptionist/property-management" element={<R><PropertyManagementLP /></R>} />
        <Route path="/receptionist/bella" element={<R><BellaLP /></R>} />

        {/* ── Redirects from old routes ── */}
        <Route path="/laundromats" element={<Navigate to="/receptionist" replace />} />
        <Route path="/laundromat-ads" element={<Navigate to="/receptionist/ads" replace />} />
        <Route path="/laundromat-ads-short" element={<Navigate to="/receptionist/ads-short" replace />} />
        <Route path="/laundromat-ads/thank-you" element={<Navigate to="/receptionist/ads/thank-you" replace />} />
        <Route path="/laundromats/thank-you" element={<Navigate to="/receptionist/thank-you" replace />} />
        <Route path="/property-management" element={<Navigate to="/receptionist/property-management" replace />} />
        <Route path="/bella" element={<Navigate to="/receptionist/bella" replace />} />

        {/* ── Shared pages (use receptionist layout for legacy pages) ── */}
        <Route path="/blog" element={<R><Blog /></R>} />
        <Route path="/blog/:slug" element={<R><BlogArticle /></R>} />
        <Route path="/faq" element={<R><FAQ /></R>} />
        <Route path="/contact" element={<R><Contact /></R>} />
        <Route path="/demo" element={<R><Demo /></R>} />

        {/* ── Lead Magnets ── */}
        <Route path="/free-makeover" element={<R><FreeMakeoverPage /></R>} />
        <Route path="/free-audit" element={<R><FreeAuditPage /></R>} />
        <Route path="/free-report" element={<FreeReportPage />} />

        {/* ── Other ── */}
        <Route path="/secret-shop" element={<R><SecretShop /></R>} />
        <Route path="/privacy" element={<R><Privacy /></R>} />
        <Route path="/terms" element={<R><Terms /></R>} />

        {/* ── Membership join redirect ── */}
        <Route path="/join/:slug" element={<JoinRedirect />} />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;

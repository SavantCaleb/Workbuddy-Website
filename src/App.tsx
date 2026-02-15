import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyles } from './styles/GlobalStyles';
import { SmoothScroll } from './components/SmoothScroll';

// Pages
import { NewHomepage } from './pages/Homepage/NewHomepage';
import { LandingPage } from './pages/Homepage/AppleHomepage';
import { LaundromatLP } from './pages/Laundromat/LaundromatLP';
import { LaundromatAdsLP } from './pages/LaundromatAds/LaundromatAdsLP';
import { LaundromatAdsShortLP } from './pages/LaundromatAds/LaundromatAdsShortLP';
import { ThankYou } from './pages/Laundromat/ThankYou';
import { LaundromatAdsThankYou } from './pages/LaundromatAds/ThankYou';
import { PropertyManagementLP } from './pages/PropertyManagement/PropertyManagementLP';
import { BellaLP } from './pages/Bella/BellaLP';
import { Pricing } from './pages/Pricing/Pricing';
import { About } from './pages/About/About';
import { Blog } from './pages/Blog/Blog';
import { FAQ } from './pages/FAQ/FAQ';
import { Contact } from './pages/Contact/Contact';
import { Demo } from './pages/Demo/Demo';
import { SecretShop } from './pages/SecretShop/SecretShop';
import { Privacy } from './pages/Privacy/Privacy';
import { Terms } from './pages/Terms/Terms';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<NewHomepage />} />

        {/* Solutions / Verticals */}
        <Route path="/laundromats" element={<LaundromatLP />} />
        <Route path="/laundromat-ads" element={<LaundromatAdsLP />} />
        <Route path="/laundromat-ads-short" element={<LaundromatAdsShortLP />} />
        <Route path="/laundromat-ads/thank-you" element={<LaundromatAdsThankYou />} />
        <Route path="/laundromats/thank-you" element={<ThankYou />} />
        <Route path="/property-management" element={<PropertyManagementLP />} />
        <Route path="/bella" element={<BellaLP />} />

        {/* Core Pages */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />

        {/* Existing Routes */}
        <Route path="/secret-shop" element={<SecretShop />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/laundromats" replace />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;

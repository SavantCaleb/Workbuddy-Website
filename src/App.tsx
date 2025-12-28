import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyles } from './styles/GlobalStyles';
import { LandingPage } from './pages/Homepage/AppleHomepage';
import { Privacy } from './pages/Privacy/Privacy';
import { Terms } from './pages/Terms/Terms';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;

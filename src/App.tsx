import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyles } from './styles/GlobalStyles';
import { Privacy } from './pages/Privacy/Privacy';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<div><h1>WorkBuddy</h1><a href="/privacy">Privacy Policy</a></div>} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
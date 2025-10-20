import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { MinimalHeader } from './components/Header/MinimalHeader';
import { MinimalFooter } from './components/Footer/MinimalFooter';
import { NewHomepage } from './pages/Homepage/NewHomepage';
import { Privacy } from './pages/Privacy/Privacy';
import { Terms } from './pages/Terms/Terms';

function App() {
  return (
    <Router>
      <MinimalHeader />
      <Routes>
        <Route path="/" element={<NewHomepage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Add more routes as needed */}
      </Routes>
      <MinimalFooter />
    </Router>
  );
}

export default App;
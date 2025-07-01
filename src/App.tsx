import './App.css';
import Hero from './components/Hero/Hero';
import Testimonials from './components/Testimonials/Testimonials';
import WhatInside from './components/WhatInside/WhatInside';
import YourJourney from './components/YourJourney/YourJourney';
import Pricing from './components/Pricing/Pricing';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Page */}
        <Route
          path="/"
          element={
            <div className="App">
              <Hero />
              <WhatInside />
              <Testimonials />
              <YourJourney />
              <Pricing />
            </div>
          }
        />

        {/* Stripe Success & Cancel Pages */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;

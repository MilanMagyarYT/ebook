import "./App.css";
import Hero from "./components/Hero/Hero";
import Testimonials from "./components/Testimonials/Testimonials";
import WhatInside from "./components/WhatInside/WhatInside";
import VideoIntro from "./components/VideoIntro/VideoIntro";
import Pricing from "./components/Pricing/Pricing";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import FAQ from "./components/FAQ/FAQ";
import RefundPolicy from "./components/RefundPolicy/RefundPolicy";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
              <VideoIntro />
              <WhatInside />
              <Testimonials />
              <Pricing />
              <FAQ />
            </div>
          }
        />

        {/* Stripe Success & Cancel Pages */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;

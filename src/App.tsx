import './App.css';
import Hero from './components/Hero/Hero';
import Testimonials from './components/Testimonials/Testimonials';
import WhatInside from './components/WhatInside/WhatInside';
import YourJourney from './components/YourJourney/YourJourney';
import Pricing from './components/Pricing/Pricing';

function App() {
  return (
    <div className="App">
      <Hero />
      <WhatInside />
      <Testimonials />
      <YourJourney />
      <Pricing />
    </div>
  );
}

export default App;

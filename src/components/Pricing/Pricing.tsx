import './Pricing.css';
import CTAButton from './PricingCTA';
import Footer from './Footer';

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-label-wrapper">
        <span className="pricing-label-badge">Pricing</span>
      </div>

      <h2 className="pricing-title">Find your room faster</h2>
      <p className="pricing-subtitle">One-time payment</p>

      <div className="pricing-card">
        <p className="pricing-card-title">Student Housing Guide</p>
        <h3 className="pricing-price">€14.99</h3>
        <p className="pricing-description">
          A complete housing guide including daily application strategies and insider advice. The e-book will be sent to your email right after purchase.
        </p>
        <CTAButton text="Buy Now" />
        <p className="pricing-guarantee">
          If you follow our daily strategy and don’t find housing within 2 months, we’ll personally help you at no extra cost.
        </p>
      </div>

      <Footer />
    </section>
  );
}

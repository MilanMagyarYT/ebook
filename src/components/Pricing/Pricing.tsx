import './Pricing.css';
import CTAButton from './PricingCTA';

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-label-wrapper">
        <span className="pricing-label-badge">Pricing</span>
      </div>

      <h2 className="pricing-title">Find your home in under 30 days</h2>
      <p className="pricing-subtitle">One-time payment</p>

      <div className="pricing-card">
        <p className="pricing-card-title">Student Housing Guide</p>
        <h3 className="pricing-price">€14.99</h3>
        <ul className="pricing-description">
          <li><span>40+ pages</span></li>
          <li><span>Written by students who already succeeded</span></li>
          <li><span>30 day plan, sample emails & checklist</span></li>
          <li><span>Essential red flags</span></li>
          <li><span>Money-back if it doesn’t help</span></li>
          <li><span>24/7 support whenever you need help</span></li>
        </ul>
        <CTAButton text="Buy Now" />
        <p className="pricing-guarantee">
          Follow our strategy and get a room in under 30 days, or we'll help you personally, with 24/7 support
        </p>
      </div>
    </section>
  );
}

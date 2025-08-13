import './RefundPolicy.css';
import Logo from '../../assets/logo.png';

export default function RefundPolicy() {
  return (
    <section className="refund-policy-section">
      <div className="refund-policy-wrapper">
        <img src={Logo} alt="Find Student Housing" className="refund-logo" />

        <h1 className="refund-title">Refund Policy</h1>

        <p className="refund-text">
          We’re a small team, and this is our first eBook: <em>“Student Housing in The Netherlands – Ultimate Guide.”</em>
          We’ve poured a lot into it. Because it’s a digital product, we can’t offer automatic refunds, but we do want to be fair.
        </p>

        <h3 className="refund-subtitle">When a refund may be possible</h3>
        <p className="refund-text">
          You can request a refund within 24 hours of purchase if you didn’t find the guide helpful <strong>after trying the steps</strong>.
          We’ll ask a few short questions so we can understand what went wrong and improve. If you clearly followed the strategy and it didn’t help,
          we’ll gladly issue a refund.
        </p>

        <h3 className="refund-subtitle">When refunds aren’t possible</h3>
        <ul className="refund-list">
          <li>It’s been more than 24 hours since purchase.</li>
          <li>The steps from the guide weren’t attempted.</li>
          <li>You changed your mind after accessing the product.</li>
        </ul>

        <p className="refund-text">
          Need help? Email us at <a href="mailto:findstudenthousingnl@gmail.com">findstudenthousingnl@gmail.com</a>
        </p>

        {/* CTA to Google Form */}
        <a
          className="refund-btn"
          href="https://forms.gle/BF9CYZMoaCZZu1Dz6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start Refund Request
        </a>

        <p className="refund-privacy">
          We only use your responses to review your request. We don’t share your data with third parties.
        </p>
      </div>
    </section>
  );
}

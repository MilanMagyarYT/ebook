import "./CheckoutPages.css";

export default function Cancel() {
  const retry = () => window.location.replace("#pricing");

  return (
    <section className="checkout-wrapper cancel">
      <div className="icon">❌</div>
      <h1>Payment cancelled</h1>

      <p className="lead">
        No worries—your card hasn’t been charged. You can try again or reach out
        if you’re having trouble.
      </p>

      <button className="primary-btn" onClick={retry}>
        Try again
      </button>

      <p className="meta">
        Questions? <a href="mailto:findstudenthousingnl@gmail.com">E-mail us</a>
      </p>
    </section>
  );
}

import "./CheckoutPages.css"; // styles below
import Logo from "../../assets/logo.png";

export default function Success() {
  return (
    <section className="checkout-wrapper success">
      <img src={Logo} alt="Logo" className="hero-logo" />

      <div className="icon">✅</div>
      <h1>Thank you for your purchase!</h1>

      <p className="lead">
        Your Student Housing Guide is being sent to your inbox right now.
      </p>

      <div className="order-info">
        <span>
          Need help?{" "}
          <a href="mailto:findstudenthousingnl@gmail.com">Contact us</a>
        </span>
      </div>
    </section>
  );
}

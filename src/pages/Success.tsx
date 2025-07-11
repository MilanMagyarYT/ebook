import "./CheckoutPages.css";
import Logo from "../assets/logo.png";

export default function Success() {
  return (
    <div className="center-screen">
      <img src={Logo} alt="Logo" className="hero-logo" />

      <section className="checkout-wrapper success">
        <div className="icon">✅</div>
        <h1>Thank you for your purchase!</h1>

        <p className="lead">
          Your Student Housing Guide is being sent to your inbox right now.
        </p>

        <div className="meta">
          <span>
            Need help?{" "}
            <a href="mailto:findstudenthousingnl@gmail.com">Contact us</a>
          </span>
        </div>
      </section>
    </div>
  );
}

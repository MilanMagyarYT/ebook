import "./CheckoutPages.css"; // styles below

export default function Success() {
  const orderNo =
    new URLSearchParams(window.location.search).get("order") ?? "N/A";
  const email =
    new URLSearchParams(window.location.search).get("email") ?? "your inbox";

  return (
    <section className="checkout-wrapper success">
      <div className="icon">✅</div>
      <h1>Thank you for your purchase!</h1>

      <p className="lead">
        Your Student Housing Guide is being sent to <strong>{email}</strong>{" "}
        right now.
      </p>

      <div className="order-info">
        <span>Order&nbsp;#{orderNo}</span>
        <span>
          Need help?{" "}
          <a href="mailto:findstudenthousingnl@gmail.com">Contact us</a>
        </span>
      </div>
    </section>
  );
}

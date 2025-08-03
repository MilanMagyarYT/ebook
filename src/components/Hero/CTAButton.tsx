import "./CTAButton.css";

const CTAButton = () => {
  const handleCheckout = async () => {
    const ref = new URLSearchParams(window.location.search).get("ref") ?? "none";

    const response = await fetch(`/api/create-checkout-session?ref=${ref}`);
    const data = await response.json();

    if (data?.url) {
    window.location.href = data.url;
  } else {
    console.error("Checkout session failed", data);
    alert("Something went wrong. Please try again later.");
  }
  };


  return (
    <button className="cta-button" onClick={handleCheckout}>
      Buy Now
    </button>
  );
};

export default CTAButton;

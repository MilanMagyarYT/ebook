import "./CTAButton.css";

const CTAButton = () => {
  const handleCheckout = async () => {
    const ref = new URLSearchParams(window.location.search).get("ref") ?? "none";

    const response = await fetch(`/api/create-checkout-session?ref=${ref}`);
    const data = await response.json();

    window.location.href = data.url;
  };


  return (
    <button className="cta-button" onClick={handleCheckout}>
      Buy Now
    </button>
  );
};

export default CTAButton;

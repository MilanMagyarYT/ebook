import "./PricingCTA.css";

interface PricingCTAProps {
  text: string;
}

export default function PricingCTA({ text }: PricingCTAProps) {
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
    <button className="pricing-cta-button" onClick={handleCheckout}>
      {text}
    </button>
  );
}

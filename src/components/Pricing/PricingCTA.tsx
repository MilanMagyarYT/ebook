import "./PricingCTA.css";

interface PricingCTAProps {
  text: string;
}

export default function PricingCTA({ text }: PricingCTAProps) {
  const handleCheckout = async () => {
    const ref = new URLSearchParams(window.location.search).get("ref") ?? "none";
    const response = await fetch(`/api/create-checkout-session?ref=${ref}`);
    const data = await response.json();
    window.location.href = data.url;
    console.log("Stripe public key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  };

  return (
    <button className="pricing-cta-button" onClick={handleCheckout}>
      {text}
    </button>
  );
}

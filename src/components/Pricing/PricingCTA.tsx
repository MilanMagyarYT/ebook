import './PricingCTA.css';

interface PricingCTAProps {
  text: string;
}

export default function PricingCTA({ text }: PricingCTAProps) {
  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong with the checkout.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to start checkout session.');
    }
  };

  return (
    <button className="pricing-cta-button" onClick={handleCheckout}>
      {text}
    </button>
  );
}

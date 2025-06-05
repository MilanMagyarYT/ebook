import './CTAButton.css';

const CTAButton = () => {
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
    <button className="cta-button" onClick={handleCheckout}>
      Buy Now
    </button>
  );
};

export default CTAButton;

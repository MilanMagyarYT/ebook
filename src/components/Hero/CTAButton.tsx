import { loadStripe } from '@stripe/stripe-js';
import './CTAButton.css'; // Use your old, nice style

const CTAButton = () => {
  const handleCheckout = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

    await stripe?.redirectToCheckout({
      lineItems: [
        {
          price: process.env.REACT_APP_STRIPE_PRICE_ID!, // Replace in .env
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  };

  return (
    <button className="cta-button" onClick={handleCheckout}>
      Buy Now
    </button>
  );
};

export default CTAButton;

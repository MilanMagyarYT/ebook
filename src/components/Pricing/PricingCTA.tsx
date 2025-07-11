import { loadStripe } from "@stripe/stripe-js";
import "./PricingCTA.css";

interface PricingCTAProps {
  text: string;
}

export default function PricingCTA({ text }: PricingCTAProps) {
  const handleCheckout = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

    await stripe?.redirectToCheckout({
      lineItems: [
        {
          price: process.env.REACT_APP_STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  };

  return (
    <button className="pricing-cta-button" onClick={handleCheckout}>
      {text}
    </button>
  );
}

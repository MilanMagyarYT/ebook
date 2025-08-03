import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Read ref from URL (if exists)
  const rawRef = req.query.ref;
  const ref = Array.isArray(rawRef) ? rawRef[0] : rawRef ?? 'none';

  // Determine origin (fallback to live site if necessary)
  const origin =
    req.headers.origin ||
    (req.headers.referer ? new URL(req.headers.referer).origin : null) ||
    'https://findstudenthousing.nl';

  try {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      client_reference_id: ref,
      metadata: {
        referrer: ref,
      },
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('❌ Stripe session error:', err);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
}

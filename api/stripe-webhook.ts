/* eslint-disable @typescript-eslint/no-var-requires */

/* ── Type-only imports (must be first for ESLint) ───────── */
import type StripeNS                       from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/* ── Runtime CommonJS requires ──────────────────────────── */
const { buffer } = require('micro');
const fs         = require('fs');
const path       = require('path');
const Stripe     = require('stripe').default as typeof import('stripe').default;
const { Resend } = require('resend');

/* ── Config & singletons ────────────────────────────────── */
export const config = { api: { bodyParser: false } } as const;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});
const resend = new Resend(process.env.RESEND_API_KEY);

const pdfBase64 = fs
  .readFileSync(path.join(process.cwd(), 'public', 'ebook.pdf'))
  .toString('base64');

/* ── Handler ────────────────────────────────────────────── */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'] as string;
  const raw = await buffer(req);

  let event: StripeNS.Event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Stripe signature error', err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as StripeNS.Checkout.Session;
    const email   = session.customer_details?.email;
    if (!email) return res.status(400).send('No email found');

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to:   email,
        subject: 'Your Student Housing Guide eBook',
        text:    'Thanks for your purchase! The PDF is attached.',
        attachments: [
          { filename: 'StudentHousingGuide.pdf', content: pdfBase64 },
        ],
      });
      console.log(`✅  eBook sent to ${email}`);
      return res.status(200).send('Email sent');
    } catch (err) {
      console.error('Resend error', err);
      return res.status(500).send('Email sending failed');
    }
  }

  return res.status(200).send('Event received');
}

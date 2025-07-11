/* eslint-disable @typescript-eslint/no-var-requires */

/* ─ Type-only imports ─────────────────────────────── */
import type StripeNS from 'stripe';      // gives us StripeNS.Event, StripeNS.Checkout.Session
import type { VercelRequest, VercelResponse } from '@vercel/node';

import { buffer } from 'micro';
import fs   from 'fs';
import path from 'path';

/* ─ Runtime requires (CommonJS) ───────────────────── */
const Stripe = require('stripe').default as typeof import('stripe').default;
const { Resend } = require('resend');

/* ─ Config for raw body so signature check works ─── */
export const config = { api: { bodyParser: false } };

/* ─ Singletons ───────────────────────────────────── */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});
const resend = new Resend(process.env.RESEND_API_KEY);

/* read the PDF once per cold-start */
const pdfBase64 = fs
  .readFileSync(path.join(process.cwd(), 'public', 'ebook.pdf'))
  .toString('base64');

/* ─ Handler ───────────────────────────────────────── */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  /* 1- Verify Stripe signature */
  const sig = req.headers['stripe-signature'] as string;
  const rawBody = await buffer(req);

  let event: StripeNS.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Stripe signature error', err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  /* 2- React to Checkout completion */
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

  /* 3- Acknowledge every other event */
  return res.status(200).send('Event received');
}

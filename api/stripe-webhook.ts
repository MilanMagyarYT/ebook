// api/stripe-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { buffer } from 'micro';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } }; // keep raw body for signature check

/* ────────────────────────────────────────────────────────── */
/*  Initialise clients                                        */
/* ────────────────────────────────────────────────────────── */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});
const resend = new Resend(process.env.RESEND_API_KEY);

/*  Load the PDF once per cold-start to avoid repeated disk I/O  */
const pdfBase64 = fs
  .readFileSync(path.join(process.cwd(), 'public', 'ebook.pdf'))
  .toString('base64');

/* ────────────────────────────────────────────────────────── */
/*  Webhook handler                                           */
/* ────────────────────────────────────────────────────────── */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  /* 1. Verify Stripe signature */
  const sig = req.headers['stripe-signature'] as string;
  const raw = await buffer(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Stripe signature error:', err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  /* 2. React only to completed checkout sessions */
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (!email) {
      console.warn('No e-mail on session', session.id);
      return res.status(400).send('No email found');
    }

    /* 3. Send the eBook via Resend */
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'Your Student Housing Guide eBook',
        text: 'Thanks for your purchase! The PDF is attached.',
        attachments: [
          {
            filename: 'StudentHousingGuide.pdf',
            content: pdfBase64, // base-64 string
          },
        ],
      });

      console.log(`✅  eBook sent to ${email} (event ${event.id})`);
      return res.status(200).send('Email sent');
    } catch (err) {
      console.error('Resend error:', err);
      return res.status(500).send('Email sending failed');
    }
  }

  /* 3xx/4xx events ignored but acknowledged */
  return res.status(200).send('Event received');
}

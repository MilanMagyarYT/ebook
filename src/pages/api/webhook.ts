import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { buffer } from 'micro';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature']!;
  const rawBody = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (!email) return res.status(400).send('No email found');

    // Load eBook file
    const ebookPath = path.join(process.cwd(), 'public', 'ebook.pdf');
    const buffer = fs.readFileSync(ebookPath);

    // Send email via Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'Your Student Housing Guide eBook',
        text: 'Thanks for your purchase! Attached is your eBook.',
        attachments: [
          {
            filename: 'StudentHousingGuide.pdf',
            content: buffer.toString('base64'),
          },
        ],
      });

      return res.status(200).send('Email sent');
    } catch (error) {
      return res.status(500).send('Email sending failed');
    }
  }

  return res.status(200).send('Event received');
}

/* eslint-disable import/first, @typescript-eslint/no-var-requires */
import type { VercelRequest, VercelResponse } from '@vercel/node';
const Stripe = require('stripe').default as typeof import('stripe').default;
const fs     = require('fs');
const path   = require('path');

export const config = { api: { bodyParser: false } } as const;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const pdfPath = path.join(process.cwd(), 'public', 'StudentHousingGuide.pdf');
const pdfBuf  = fs.readFileSync(pdfPath);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { session } = req.query;                       // ?session=cs_test_123
  if (!session || Array.isArray(session)) {
    return res.status(400).send('Missing session id');
  }

  /* 1 – fetch the Checkout Session (server-side secret) */
  try {
    const cs = await stripe.checkout.sessions.retrieve(session);
    if (cs.payment_status !== 'paid') {
      return res.status(403).send('Payment not completed');
    }
  } catch (err) {
    return res.status(404).send('Session not found');
  }

  /* 2 – return the PDF as attachment */
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="StudentHousingGuide.pdf"'
  );
  res.status(200).send(pdfBuf);
}

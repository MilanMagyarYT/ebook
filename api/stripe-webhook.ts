/* eslint-disable import/first, @typescript-eslint/no-var-requires */
/* ── Type-only imports ─────────────────────────────────────────── */
import type StripeNS                         from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/* ── Runtime requires (CommonJS) ───────────────────────────────── */
const { buffer } = require('micro');
const fs         = require('fs');
const path       = require('path');
const Stripe     = require('stripe').default as typeof import('stripe').default;
const { Resend } = require('resend');

/* ── Vercel raw-body config ────────────────────────────────────── */
export const config = { api: { bodyParser: false } } as const;

/* ── Singletons ───────────────────────────────────────────────── */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});
const resend = new Resend(process.env.RESEND_API_KEY);

const pdfBase64 = fs
  .readFileSync(path.join(process.cwd(), 'public', 'StudentHousingGuide.pdf'))
  .toString('base64');

/* ── HTML template with placeholders ───────────────────────────── */
const emailTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:Arial,Helvetica,sans-serif;background:#f7f8fa;padding:0 16px">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:8px;overflow:hidden;margin:40px 0;box-shadow:0 2px 8px rgba(0,0,0,.05)">
      <tr>
        <td style="padding:24px 16px;background:#0B1D36;color:#fff;font-size:14px">
          <img src="{{LOGO_URL}}" width="200" alt="Find Student Housing" style="display:block">
          <div style="float:right;color:#bbbbbb">Order <strong>{{ORDER_NO}}</strong></div>
        </td>
      </tr>
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 12px;font-size:20px;color:#222">Thank&nbsp;you for your purchase, {{FIRST_NAME}}!</h1>
        <p style="margin:0 0 24px;font-size:14px;color:#444">Your payment was successful. The guide is attached at the bottom of this email.</p>
        <h2 style="margin:40px 0 12px;font-size:16px;color:#222;border-bottom:1px solid #eee;padding-bottom:8px">Order summary</h2>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;color:#444">
          <tr><td>Your Student Housing Guide (PDF)</td><td align="right">€{{TOTAL_EUR}}</td></tr>
          <tr><td style="padding-top:8px;border-top:1px solid #eee"><strong>Total</strong></td><td align="right" style="padding-top:8px;border-top:1px solid #eee"><strong>€{{TOTAL_EUR}}</strong></td></tr>
        </table>
        <p style="margin:32px 0 0;font-size:13px;color:#666">Need help? Reply to this e-mail: findstudenthousingnl@gmail.com.</p>
      </td></tr>
      <tr><td style="background:#FFA80F;padding:20px 32px;font-size:11px;color:#777">
        Find Student Housing<br>
        <a href="https://www.instagram.com/allaboutstudenthousing.nl/" style="color:#777">Instagram Page</a> •
        <a href="https://www.youtube.com/@allaboutstudenthousingnl"   style="color:#777">YouTube Page</a>
      </td></tr>
    </table>
  </td></tr>
</table>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const email = session.customer_details?.email;
    const name = session.customer_details?.name ?? '';
    if (!email) return res.status(400).send('No email found');

    /* personalise */
    const first = name.split(' ')[0] || 'there';
    const order = session.id.slice(-8).toUpperCase();
    const total = (session.amount_total! / 100).toFixed(2);
    const link = `${process.env.BASE_URL}/api/download?session=${session.id}`;

    const logoURL = `https://www.findstudenthousing.nl/logo-email.png`;

    const html = emailTemplate
      .replaceAll('{{LOGO_URL}}',   logoURL)
      .replaceAll('{{FIRST_NAME}}', first)
      .replaceAll('{{ORDER_NO}}',   order)
      .replaceAll('{{TOTAL_EUR}}',  total);

    const text = [
      `Hi ${first},`,
      '',
      `Thank you for purchasing the Student Housing Guide.`,
      `Download it here: ${link}`,
      '',
      `Order ${order} • Total €${total}`,
      '',
      'Happy studying!',
      'Find Student Housing',
    ].join('\n');

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to:   email,
        subject: 'Your Student Housing Guide – download & receipt',
        text,
        html,                                  // <-- new HTML version
        attachments: [
          { filename: 'StudentHousingGuide.pdf', content: pdfBase64 },
        ],
      });
      console.log(`✅  email delivered to ${email}`);
      return res.status(200).send('Email sent');
    } catch (err) {
      console.error('Resend error', err);
      return res.status(500).send('Email sending failed');
    }
  }

  return res.status(200).send('Event received');
}

import './FAQ.css';
import Footer from './Footer';
import { useState } from 'react';

const faqItems = [
  {
    question: 'How do I receive the eBook?',
    answer: 'The eBook is sent instantly to your email right after purchase.',
  },
  {
    question: 'What if I don’t find housing?',
    answer: 'We offer personal assitance 24/7 and if you don’t find housing within 30 days, we give your money back.',
  },
  {
    question: 'Is it a subscription?',
    answer: 'Nope! It\'s a one-time payment, no hidden fees or subscriptions.',
  },
  {
    question: 'Who is this eBook for?',
    answer: 'It’s designed for both international and Dutch students looking for housing in the Netherlands.',
  },
  {
    question: 'How quickly can I start using the strategies?',
    answer: 'Immediately! Once you get the eBook, you can follow the steps and start applying for housing the same day.',
  },
  {
    question: 'What makes this different from free advice online?',
    answer: 'Our guide is based on real experiences from students who successfully found housing. It’s structured, proven, and saves you hours of trial and error.',
  },
  {
    question: 'Will this work for any city in the Netherlands?',
    answer: 'Yes, our strategies work nationwide, with specific tips for bigger areas such as Amsterdam, Utrecht, Rotterdam or Groningen',
  },
  {
    question: 'Can I share the eBook with a friend?',
    answer: 'Your purchase is for personal use only, but your friend can get their own copy and follow along with you.',
  },

];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-label-wrapper">
        <span className="faq-label-badge">FAQ</span>
      </div>

      <h2 className="faq-title">Still have questions?</h2>
      <p className="faq-subtitle">We’ve answered the most common ones below</p>

      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`faq-box ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggle(index)}
          >
            <div className="faq-question">{item.question}</div>
            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
}

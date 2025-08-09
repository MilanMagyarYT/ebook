import './FAQ.css';
import Footer from './Footer';
import { useState } from 'react';

const faqItems = [
  {
    question: 'How do I receive the eBook?',
    answer: 'The eBook is sent instantly to your email right after purchase.',
  },
  {
    question: 'Can this really help me find a room?',
    answer: 'Yes, the strategies were written by students who successfully found rooms using these exact tips.',
  },
  {
    question: 'What if I don’t find housing?',
    answer: 'We offer personal assitance 24/7 and if you don’t find housing within 30 days, we give your money back.',
  },
  {
    question: 'Is it a subscription?',
    answer: 'Nope! It\'s a one-time payment, no hidden fees or subscriptions.',
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

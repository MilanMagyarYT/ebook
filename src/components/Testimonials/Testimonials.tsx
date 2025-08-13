import './Testimonials.css';
import TestimonialsLabel from './TestimonialsLabel';
import TestimonialsTitle from './TestimonialsTitle';
import TestimonialsSubtitle from './TestimonialsSubtitle';
import TestimonialsCard from './TestimonialsCard';
import { useState } from 'react';
import testimonialEmma from '../../assets/testimonial1.jpg';
import testimonialLucas from '../../assets/testimonial2.jpeg';
import testimonialSanne from '../../assets/avatar-3.jpg';


const testimonials = [
  {
    text:
      "Without their free email templates and advice, I don’t think I would have found a room in Groningen so quickly. Their daily search tips made everything way more manageable!",
    name: "Emma",
    university: "University of Groningen",
    avatar: testimonialEmma,
  },
  {
    text:
      "Their housing videos helped me understand how the Dutch rental system works and what scams to watch out for. I moved feeling way more prepared thanks to their content!",
    name: "Lucas",
    university: "Erasmus University Rotterdam",
    avatar: testimonialLucas,
  },
  {
    text:
      "Their advice about where and when to search made a huge difference. Thanks to their tips and templates, I finally found a room in Amsterdam after weeks of struggling on my own.",
    name: "Sanne",
    university: "University of Amsterdam",
    avatar: testimonialSanne,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const t = testimonials[index];

  return (
    <section id="real-results" className="testimonials-section">
      <div className="testimonials-label-wrapper">
        <TestimonialsLabel />
      </div>

      <h2 className="testimonials-title">
        <TestimonialsTitle />
      </h2>

      <p className="testimonials-subtitle">
        <TestimonialsSubtitle />
      </p>

      <div className="testimonials-single">
        <TestimonialsCard text={t.text} name={t.name} university={t.university} avatar={t.avatar} />

        <div className="testimonials-controls">
          <button className="next-testimonial-btn" onClick={next}>
            Next testimonial <span className="arrow">›</span>
          </button>

          <div className="testimonials-dots" aria-hidden>
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

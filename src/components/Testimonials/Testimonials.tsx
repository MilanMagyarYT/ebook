import './Testimonials.css';
import TestimonialsLabel from './TestimonialsLabel';
import TestimonialsTitle from './TestimonialsTitle';
import TestimonialsSubtitle from './TestimonialsSubtitle';
import TestimonialsCard from './TestimonialsCard';

export default function Testimonials() {
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
      <div className="testimonials-card-wrapper">
        <TestimonialsCard
          text={`Without their free email templates and advice, I don’t think I would have found a room in Groningen so quickly. Their daily search tips made everything way more manageable!`}
          name="Emma"
          university="University of Groningen"
        />
        <TestimonialsCard
          text={`Their housing videos helped me understand how the Dutch rental system works and what scams to watch out for. I moved feeling way more prepared thanks to their content!`}
          name="Lucas"
          university="Erasmus University Rotterdam"
        />
        <TestimonialsCard
          text={`Their advice about where and when to search made a huge difference. Thanks to their tips and templates, I finally found a room in Amsterdam after weeks of struggling on my own.`}
          name="Sanne"
          university="University of Amsterdam"
        />
      </div>
    </section>
  );
}

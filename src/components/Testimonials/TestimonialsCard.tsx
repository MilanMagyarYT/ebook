import './Testimonials.css';

interface Props {
  text: string;
  name: string;
  university: string;
}

export default function TestimonialsCard({ text, name, university }: Props) {
  return (
    <div className="testimonials-card">
      <p className="testimonials-stars">★★★★★</p>
      <p className="testimonials-text">“{text}”</p>
      <p className="testimonials-name">{name}</p>
      <p className="testimonials-university">{university}</p>
    </div>
  );
}

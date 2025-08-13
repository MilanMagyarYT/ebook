import './Testimonials.css';

interface Props {
  text: string;
  name: string;
  university: string;
  avatar?: string;
}

export default function TestimonialsCard({ text, name, university, avatar }: Props) {
  return (
    <div className="testimonials-card">
      <p className="testimonials-stars">★★★★★</p>

      <p className="testimonials-text">“{text}”</p>

      <div className="testimonial-footer">
        {avatar ? (
          <img src={avatar} alt={`${name} avatar`} className="testimonial-avatar" />
        ) : (
          <div className="testimonial-avatar placeholder" aria-hidden="true" />
        )}

        <div className="testimonial-identity">
          <p className="testimonials-name">{name}</p>
          <p className="testimonials-university">{university}</p>
        </div>
      </div>
    </div>
  );
}

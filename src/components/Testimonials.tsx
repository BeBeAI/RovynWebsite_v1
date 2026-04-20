export function Testimonials() {
  const testimonials = [
    {
      text: "Most sensors just scream raw numbers at you. This system is different - it doesn't just say 'water is low', it tells me I've got exactly three days until I need to refill. That's not just data, that's a schedule.",
      author: 'Retired engineer and hobby farmer',
      company: 'Highlands Malaysia',
      isPlaceholder: false
    },
    {
      text: "Rovyn took the most draining part of my day-writing personalized cold emails-and turned it into a background process. It's the first time I've seen an automation that actually captures my voice and technical style without sounding like a template.",
      author: 'Fanny Tan',
      company: 'Freelance UI/UX Designer & Webflow',
      isPlaceholder: false
    }
  ];

  return (
    <section className="testimonials">
      <div className="section-label">Don't just take our word for it</div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className={`testimonial-card reveal${testimonial.isPlaceholder ? ' testimonial-card--placeholder' : ''}`}
          >
            {!testimonial.isPlaceholder && <span className="quote-mark">"</span>}
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <strong>{testimonial.author}</strong>
              <span>{testimonial.company}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

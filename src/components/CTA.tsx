interface CTAProps {
  onGetInTouch: () => void;
}

export function CTA({ onGetInTouch }: CTAProps) {
  return (
    <section className="cta-section">
      <div className="cta-label">Your competitors are moving</div>
      <h2 className="reveal">Your competitors are already moving.<br/><em>AI is why.</em></h2>
      <p className="reveal">You might not feel it today — but in a few years, you will. Don't wait until it's too late.</p>
      <button className="btn-primary reveal" onClick={onGetInTouch}>Get in touch →</button>
    </section>
  );
}

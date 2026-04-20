interface HeroProps {
  onGetInTouch: () => void;
}

export function Hero({ onGetInTouch }: HeroProps) {
  return (
    <section className="hero">
      <h1 className="reveal">
        AI that actually works.
        <em className="reveal stagger-1">Built specifically for your business.</em>
      </h1>
      <p className="hero-sub reveal stagger-2">
        We identify where AI fits your business, build it properly, train your team to use it, and make sure it gets used — not just installed.
      </p>
      <button className="btn-primary hero-cta reveal stagger-3" onClick={onGetInTouch}>
        Get in touch
      </button>
    </section>
  );
}

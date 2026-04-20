export function Marquee() {
  const items = [
    'Process Automation',
    'Custom AI Solutions',
    'Team Enablement',
    'Workflow Intelligence',
    'AI Strategy',
    'Enterprise AI',
    'Deployment & Adoption',
    'ROI-Driven Results'
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-dot">·</span>
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

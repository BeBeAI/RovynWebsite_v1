export function Stats() {
  const stats = [
    { num: '48+', label: 'Client Engagements' },
    { num: '11+', label: 'Industries Served' },
    { num: '2,700+', label: 'People Empowered' },
    { num: '90k', label: 'Community Members' }
  ];

  return (
    <section className="stats" id="results">
      {stats.map((stat, index) => (
        <div key={stat.label} className={`stat reveal stagger-${index + 1}`}>
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}

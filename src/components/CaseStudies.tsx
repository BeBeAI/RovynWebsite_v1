import { Link } from 'react-router-dom';
import { caseStudies } from './data/caseStudies';

export function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="section-label">Case studies</div>
      <div className="case-studies-grid">
        {caseStudies.map((study, index) => (
          <Link
            key={study.slug}
            to={`/case-studies/${study.slug}`}
            className={`case-study-card reveal stagger-${Math.min(index + 1, 8)}`}
            aria-label={`Open case study: ${study.title}`}
          >
            <div className="case-study-media" aria-hidden="true">
              {study.image ? (
                <img src={study.image} alt="" className="case-study-image" loading="lazy" />
              ) : (
                <div className="case-study-placeholder">
                  <span>{study.label}</span>
                </div>
              )}
            </div>
            <div className="case-study-content">
              <p className="case-study-kicker">{study.label}</p>
              <div className="case-study-title-row">
                <h3 className="case-study-title">{study.title}</h3>
                <span className="case-study-arrow">›</span>
              </div>
              <p className="case-study-excerpt">{study.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

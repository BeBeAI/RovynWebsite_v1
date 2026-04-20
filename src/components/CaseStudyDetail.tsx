import { Link, useParams } from 'react-router-dom';
import { caseStudies } from './data/caseStudies';

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    return (
      <section className="case-study-page case-study-missing">
        <p className="section-label">Case study</p>
        <h1>Case Study Not Found</h1>
        <p className="case-study-standfirst">
          The page you requested does not exist yet.
        </p>
        <Link to="/" className="btn-ghost case-study-back-link">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="case-study-page">
      <div className="case-study-shell">
        <p className="section-label">{study.label}</p>
        <h1>{study.title}</h1>
        <p className="case-study-client">Client: {study.client}</p>
        <p className="case-study-standfirst">{study.excerpt}</p>

        <article className="case-study-story">
          <div className="case-study-block">
            <h2>The Setup</h2>
            {study.sections.setup.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="case-study-block">
            <h2>The Problem</h2>
            {study.sections.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="case-study-block">
            <h2>What we built</h2>
            {study.sections.built.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="case-study-block">
            <h2>The Result</h2>
            {study.sections.result.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <blockquote className="case-study-quote">
            <p>{study.quote.text}</p>
            <cite>- {study.quote.attribution}</cite>
          </blockquote>

          <div className="case-study-block">
            <h2>Estimated Time Saved</h2>
            <div className="case-study-table-wrap">
              <table className="case-study-table">
                <thead>
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Time Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {study.estimatedTimeSaved.map((row) => (
                    <tr key={row.task} className={row.task === 'Total' ? 'case-study-total-row' : ''}>
                      <td>{row.task}</td>
                      <td>{row.timeSaved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <p className="case-study-closing">{study.closingLine}</p>

        <div className="case-study-actions">
          <Link to="/" className="btn-ghost case-study-back-link">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

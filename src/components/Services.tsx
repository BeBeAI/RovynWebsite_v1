import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface ServicesProps {
  onGetInTouch?: () => void;
}

export function Services({ onGetInTouch }: ServicesProps) {
  const location = useLocation();
  const isDedicatedPage = location.pathname === '/services';
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      num: '01',
      title: 'Identify',
      tagline: 'We figure out what\'s worth building — before anything gets built.',
      desc: 'We start by sitting down with you and learning how your business actually runs. Where time is being lost, what your team keeps getting stuck on, and where things slow down for no good reason. From there we figure out exactly where AI can make a real difference — and what\'s not worth touching. By the end of this phase, you\'ll have a clear plan that actually makes sense for your business. And if we genuinely don\'t think AI is the right move for you right now — we\'ll tell you that too.',
      shortDesc: 'Every engagement starts with understanding. We sit with you and map out how your business actually runs — where time is lost, what your team keeps getting stuck on, and where the real bottlenecks are. From there, we find exactly what\'s worth building.',
      icon: (
        <svg width="100%" viewBox="0 0 200 200" role="img"><title>Identify phase</title><desc>A magnifying glass searching through scattered dots, representing discovery</desc>
          <circle cx="85" cy="85" r="50" fill="none" stroke="white" strokeWidth="1.5"/>
          <circle cx="85" cy="85" r="35" fill="none" stroke="white" strokeWidth="0.75" strokeDasharray="4 3"/>
          <circle cx="85" cy="85" r="20" fill="none" stroke="white" strokeWidth="0.75"/>
          <line x1="122" y1="122" x2="155" y2="155" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="70" cy="75" r="2" fill="white" opacity="0.5"/>
          <circle cx="95" cy="70" r="2" fill="white" opacity="0.5"/>
          <circle cx="80" cy="95" r="2" fill="white" opacity="0.5"/>
          <circle cx="100" cy="90" r="3" fill="white"/>
        </svg>
      ),
      bullets: [
        { title: 'Leadership Discovery Call', text: 'We sit down with you to understand your business, your goals, and what\'s been slowing you down.' },
        { title: 'Team Conversations', text: 'We talk to the people doing the work every day to uncover the real bottlenecks and inefficiencies.' },
        { title: 'AI Fit Assessment', text: 'We map out exactly where AI makes sense for your business — and where it doesn\'t.' },
        { title: 'ROI Analysis', text: 'We crunch the numbers to make sure what we\'re recommending is actually worth the investment.' },
        { title: 'Clarity Report', text: 'A plain-English report covering priorities, readiness, and our honest recommendation on what to do next.' }
      ]
    },
    {
      num: '02',
      title: 'Develop',
      tagline: 'Built around how your business actually works.',
      desc: 'Once we know what\'s worth building, we get to work. We build and integrate AI into your existing tools and workflows — no ripping out what already works, no complicated new systems to learn. Whether that\'s a custom built solution or connecting the right existing tools together, everything we build is designed to fit naturally into how your business already runs. What we deliver is built properly from the start — and when things need adjusting, we\'re still there.',
      shortDesc: 'Once we know what matters, we build it — no generic tools, no off-the-shelf shortcuts. We design solutions that fit your existing workflows, your team, and the way your business actually operates.',
      icon: (
        <svg width="100%" viewBox="0 0 200 200" role="img"><title>Develop phase</title><desc>Interlocking gears representing building and development</desc>
          <rect x="60" y="40" width="80" height="18" fill="none" stroke="white" strokeWidth="1.5" rx="2"/>
          <rect x="50" y="68" width="100" height="18" fill="none" stroke="white" strokeWidth="1.5" rx="2"/>
          <rect x="40" y="96" width="120" height="18" fill="none" stroke="white" strokeWidth="1.5" rx="2"/>
          <rect x="50" y="124" width="100" height="18" fill="none" stroke="white" strokeWidth="1.5" rx="2"/>
          <rect x="60" y="152" width="80" height="18" fill="none" stroke="white" strokeWidth="1.5" rx="2"/>
        </svg>
      ),
      bullets: [
        { title: 'Build Plan', text: 'We map out exactly what needs to be built, how it connects to your existing tools, and what success looks like before we write a single line of code.' },
        { title: 'Systems Integration', text: 'Whether it\'s one tool or several, we connect AI into what your business already uses so nothing feels out of place.' },
        { title: 'Test Build → Real Build', text: 'We build a working version first, test it in real conditions, then refine it into the final solution.' },
        { title: 'Security & Reliability', text: 'Everything we build is designed to be safe, stable, and dependable from day one.' },
        { title: 'Fine Tuning', text: 'Before anything goes live, we make sure it\'s running the way it should.' }
      ]
    },
    {
      num: '03',
      title: 'Embed',
      tagline: 'This is where most AI projects die. Not with Rovyn.',
      desc: 'Building it is only half the job. The other half is making sure your team actually uses it. We train your team — whether that\'s one person or twenty — hands on, until they\'re comfortable and confident. We fine-tune as we go, fix what needs fixing, and stick around until AI stops feeling like something new and just becomes part of how your business runs. And if something changes down the line — we\'re still there.',
      shortDesc: 'We don\'t hand it over and disappear. We train your team, fine-tune as we go, and stay until AI stops feeling like something new — and just becomes how work gets done.',
      icon: (
        <svg width="100%" viewBox="0 0 200 200" role="img"><title>Embed phase</title><desc>A puzzle piece fitting into place, representing integration</desc>
          <rect x="40" y="40" width="120" height="120" fill="none" stroke="white" strokeWidth="1.5" rx="4"/>
          <rect x="60" y="60" width="80" height="80" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 3" rx="4"/>
          <rect x="80" y="80" width="40" height="40" fill="none" stroke="white" strokeWidth="1.5" rx="4"/>
          <line x1="100" y1="40" x2="100" y2="80" stroke="white" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="100" y1="120" x2="100" y2="160" stroke="white" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="40" y1="100" x2="80" y2="100" stroke="white" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="120" y1="100" x2="160" y2="100" stroke="white" strokeWidth="1" strokeDasharray="3 3"/>
        </svg>
      ),
      bullets: [
        { title: 'Pilot Launch', text: 'We roll it out carefully and in stages, gather real feedback, and fix any issues before your whole team is on it.' },
        { title: 'Hands-On Training', text: 'We train your team in person or remotely — one-on-one or in groups — until everyone is comfortable and confident using it.' },
        { title: 'Workflow Alignment', text: 'We work to fit AI into your existing routines where possible. And where change is needed, we help your team navigate that too.' },
        { title: 'Performance Tracking', text: 'We measure if it\'s actually working, keep improving it, and make sure the results are real and lasting.' }
      ]
    }
  ];

  useEffect(() => {
    if (!isDedicatedPage) return;

    const phase = new URLSearchParams(location.search).get('phase')?.toLowerCase();
    if (!phase) {
      setActiveTab(0);
      return;
    }

    const phaseToIndex: Record<string, number> = {
      identify: 0,
      develop: 1,
      embed: 2
    };

    setActiveTab(phaseToIndex[phase] ?? 0);
  }, [isDedicatedPage, location.search]);

  if (isDedicatedPage) {
    return (
      <div className="services-page-wrapper">
        <section className="services-hero">
          <h1 className="reveal visible">This is how we work. <span className="text-highlight">Nothing more, nothing less.</span></h1>
          <p className="hero-sub reveal visible stagger-1">Three phases. One goal — AI that's actually running in your business.</p>
        </section>

        <section className="services-tabbed-section" id="services">
          <div className="services-tabs reveal">
            {services.map((service, index) => (
              <button 
                key={service.num} 
                className={`service-tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="tab-num">{service.num.replace('0', '')}</span> {service.title}
              </button>
            ))}
          </div>

          <div className="services-tab-content reveal stagger-1">
            <div className="service-content-box">
              <div className="service-box-top">
                <div className="service-box-graphic">
                  {services[activeTab].icon}
                </div>
                
                <div className="service-box-text">
                  <h2 className="service-box-title">
                    <span className="title-num">{services[activeTab].num.replace('0', '')}</span>
                    {services[activeTab].title}
                  </h2>
                  <h3 className="service-box-tagline">{services[activeTab].tagline}</h3>
                  <p className="service-box-desc">{services[activeTab].desc}</p>
                </div>
              </div>

              <div className="service-what-we-do">
                <h4>What we <span className="text-highlight">do</span></h4>
                <ul>
                  {services[activeTab].bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot"></span>
                      <div className="bullet-content">
                        <strong>{bullet.title}</strong>
                        <p>{bullet.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="services-cta-section text-center">
          <h2 className="reveal">Your competitors are already moving. AI is why.<br/><em>You might not feel it today — but in a few years, you will.</em></h2>
          <p className="reveal stagger-1">Don't wait until it's too late.</p>
          <button type="button" className="btn-primary services-cta-button reveal stagger-2" onClick={onGetInTouch}>
            Get in Touch →
          </button>
        </section>
      </div>
    );
  }

  // Home page simple version
  return (
    <section className="services" id="services">
      <div className="section-label">Our process</div>
      <div className="services-grid">
        {services.map((service) => (
          <Link to={`/services?phase=${service.title.toLowerCase()}`} key={service.num} className="service-card reveal">
            <div className="service-icon">{service.icon}</div>
            <div className="service-content">
              <div className="service-title-row">
                <div className="service-title">{service.title}</div>
                <span className="service-arrow">›</span>
              </div>
              <p className="service-desc">{service.shortDesc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { useMemo, useState } from 'react';

interface Report {
  score: 'high' | 'medium' | 'low';
  score_label: string;
  headline: string;
  time_cost: string;
  ai_opportunity: string;
  first_step: string;
  honest_note: string;
}

type Answers = {
  firstName: string;
  email: string;
  businessType: string;
  teamSize: string;
  timeDrain: string;
  triedFix: string;
  outcome: string;
};

const businessOptions = [
  'Retail or e-commerce',
  'Professional services',
  'Trades or home services',
  'Food and hospitality',
  'Health, fitness or wellness',
  'Other local business',
];

const teamOptions = [
  'Just me — solo operator',
  '2 to 5 people',
  '6 to 20 people',
  'More than 20 people',
];

const timeDrainOptions = [
  'Responding to enquiries and following up on leads',
  'Booking, scheduling and admin',
  'Chasing invoices or payments',
  'Creating content or repetitive documents',
  'Onboarding new clients or staff',
  "Everything feels manual — I genuinely don't know",
];

const triedFixOptions = [
  "No — we've just lived with it",
  "We tried software but it didn't stick",
  "We hired someone but it's still messy",
  "We tried AI tools but couldn't get them working",
];

const outcomeOptions = [
  'More time — evenings and weekends back',
  'More revenue — faster follow-up',
  'Less stress — things run without me',
  'Scale — grow without hiring',
];

const mockReport: Report = {
  score: 'high',
  score_label: 'Strong AI fit',
  headline: 'You are losing 10 hours a week to work a bot could do',
  time_cost:
    'Based on your answers, your team is spending significant time on tasks that follow predictable patterns. That is exactly what AI handles best.',
  ai_opportunity:
    'For a business your size, automating your lead follow-up alone could recover 8 to 10 hours weekly. That is time that goes straight back into revenue-generating work.',
  first_step:
    'Map out exactly what happens between a new enquiry landing and your first response. That single process is likely your biggest win.',
  honest_note:
    'You are ready — the bottleneck is not your business, it is just that nobody has built the right system yet.',
};

export function AiAssessment() {
  const [step, setStep] = useState(0);
  const [report, setReport] = useState<Report | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [answers, setAnswers] = useState<Answers>({
    firstName: '',
    email: '',
    businessType: '',
    teamSize: '',
    timeDrain: '',
    triedFix: '',
    outcome: '',
  });

  const totalSteps = 7;
  const progress = useMemo(() => (step / (totalSteps - 1)) * 100, [step]);

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canContinue = useMemo(() => {
    if (step === 0) {
      return answers.firstName.trim().length > 0 && isEmailValid(answers.email);
    }
    if (step === 1) return answers.businessType.length > 0;
    if (step === 2) return answers.teamSize.length > 0;
    if (step === 3) return answers.timeDrain.length > 0;
    if (step === 4) return answers.triedFix.length > 0;
    if (step === 5) return answers.outcome.length > 0;
    return false;
  }, [step, answers]);

  const submitAssessment = async () => {
    setErrorMessage('');
    setReport(null);
    setIsLoadingReport(true);
    setStep(6);

    try {
      const response = await fetch(import.meta.env.VITE_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: answers.firstName,
          email: answers.email,
          q1: answers.businessType,
          q2: answers.teamSize,
          q3: answers.timeDrain,
          q4: answers.triedFix,
          q5: answers.outcome,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        // Try to parse error details from JSON body, otherwise include raw text
        let errorMsg = 'Something went wrong while generating your report.';
        try {
          const errorBody = JSON.parse(text);
          errorMsg = errorBody?.error || JSON.stringify(errorBody);
        } catch (parseErr) {
          errorMsg = text || errorMsg;
        }
        throw new Error(errorMsg);
      }

      // Try to parse JSON but handle cases where the worker returns non-JSON
      let data: Report;
      try {
        data = JSON.parse(text) as Report;
      } catch (parseErr) {
        // Include a helpful message showing the start of the response for debugging
        const snippet = text?.slice(0, 500);
        throw new Error(`Failed to parse worker JSON response: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}. Response snippet: ${snippet}`);
      }

      setReport(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while generating your report.'
      );
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleContinue = () => {
    if (!canContinue) return;
    if (step === 5) {
      void submitAssessment();
      return;
    }
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleTryAgain = () => {
    setErrorMessage('');
    setReport(null);
    setStep(5);
  };

  const renderOptionStep = (
    label: string,
    options: string[],
    value: string,
    onChange: (nextValue: string) => void
  ) => (
    <div className="assessment-step">
      <h3 className="assessment-title">{label}</h3>
      <div className="assessment-options">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`assessment-option ${value === option ? 'selected' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="assessment">
      <div className="assessment-card">
        <div className="assessment-progress">
          <div
            className="assessment-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {step === 0 && (
          <div className="assessment-step">
            <h3 className="assessment-title">Contact details</h3>
            <p className="assessment-sub">
              Takes 2 minutes. Your personalised report will be ready at the end.
            </p>
            <div className="form-row">
              <label>First name</label>
              <input
                type="text"
                placeholder="Your first name"
                value={answers.firstName}
                onChange={(event) =>
                  setAnswers({ ...answers, firstName: event.target.value })
                }
              />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={answers.email}
                onChange={(event) =>
                  setAnswers({ ...answers, email: event.target.value })
                }
              />
            </div>
          </div>
        )}

        {step === 1 &&
          renderOptionStep(
            'What type of business do you run?',
            businessOptions,
            answers.businessType,
            (value) => setAnswers({ ...answers, businessType: value })
          )}

        {step === 2 &&
          renderOptionStep(
            'How big is your team?',
            teamOptions,
            answers.teamSize,
            (value) => setAnswers({ ...answers, teamSize: value })
          )}

        {step === 3 &&
          renderOptionStep(
            "Where does most of your time go that shouldn't?",
            timeDrainOptions,
            answers.timeDrain,
            (value) => setAnswers({ ...answers, timeDrain: value })
          )}

        {step === 4 &&
          renderOptionStep(
            'Have you tried to fix this before?',
            triedFixOptions,
            answers.triedFix,
            (value) => setAnswers({ ...answers, triedFix: value })
          )}

        {step === 5 &&
          renderOptionStep(
            'What would fixing this mean for you?',
            outcomeOptions,
            answers.outcome,
            (value) => setAnswers({ ...answers, outcome: value })
          )}

        {step === 6 && (
          <div className="assessment-step">
            {isLoadingReport && (
              <div className="assessment-loading">
                <div className="assessment-spinner" />
                <p className="assessment-sub">Building your report...</p>
              </div>
            )}

            {!isLoadingReport && errorMessage && (
              <div className="assessment-error">
                <h3 className="assessment-title">We could not generate your report</h3>
                <p className="assessment-sub">{errorMessage}</p>
                <button type="button" className="btn-primary" onClick={handleTryAgain}>
                  Try again
                </button>
              </div>
            )}

            {!isLoadingReport && report && (
              <div className="assessment-report">
                <span className={`score-pill score-${report.score}`}>
                  {report.score_label}
                </span>
                <h3 className="assessment-headline">{report.headline}</h3>

                <div className="assessment-section">
                  <h4 className="assessment-section-title">
                    What this is costing you
                  </h4>
                  <p>{report.time_cost}</p>
                </div>

                <div className="assessment-section">
                  <h4 className="assessment-section-title">Where AI actually fits</h4>
                  <p>{report.ai_opportunity}</p>
                </div>

                <div className="assessment-section">
                  <h4 className="assessment-section-title">Your first move</h4>
                  <p>{report.first_step}</p>
                </div>

                <div className="assessment-section">
                  <h4 className="assessment-section-title">Honest take</h4>
                  <p className="assessment-honest">{report.honest_note}</p>
                </div>

                <div className="assessment-cta">
                  <p>Ready to turn this into a simple plan?</p>
                  <a
                    className="btn-primary"
                    href="[BOOKING_LINK_PLACEHOLDER]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book a free Clarity Call
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {step !== 6 && (
          <div className="assessment-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={handleBack}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
// To add this page to your router, in App.tsx add:
// import AiAssessment from './pages/AiAssessment'
// <Route path="/assessment" element={<AiAssessment />} />

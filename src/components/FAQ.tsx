import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      question: 'We\'re not sure if AI is right for our business. How do we know?',
      answer: 'You don\'t have to figure that out alone. We start every engagement by understanding how your business actually runs — and we\'ll give you an honest answer on whether AI makes sense for you or not.'
    },
    {
      question: 'How long until we see real results?',
      answer: 'You\'ll typically see a working solution within weeks, not months. We move fast, test early, and only scale once it\'s proven.'
    },
    {
      question: 'How much of my team\'s time will this take?',
      answer: 'We keep it minimal. Just enough involvement from your side to make sure we understand what matters — then we handle the rest.'
    },
    {
      question: 'We\'ve tried AI before and it didn\'t work. Why would this be different?',
      answer: 'Most AI projects fail because they start with the wrong problems or stop at the prototype. We only build what\'s worth building — and we stay through until it\'s actually running in your business.'
    },
    {
      question: 'What happens after you\'ve built and delivered everything?',
      answer: 'We don\'t disappear after delivery. We train your team, monitor how it\'s being used, and refine until it runs smoothly on its own.'
    },
    {
      question: 'We don\'t have a tech team or clean data. Can we still do this?',
      answer: 'Most of our clients don\'t either. We work with what you have, build around your existing systems, and handle the technical side so you don\'t have to.'
    },
    {
      question: 'How is Rovyn different from other AI companies?',
      answer: 'We\'re not here to sell you tools or run workshops. We understand your business first, build only what actually fits, and stay until it works. No hype, no handoffs, just results.'
    }
  ];

  const toggleFaq = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section className="faq" id="faq">
      <h2 className="faq-title reveal">You've got questions.<br/>We've got answers.</h2>
      <p className="faq-sub reveal">Everything you need to know before getting started.</p>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndices.includes(index) ? 'open' : ''} reveal`}
          onClick={(e) => toggleFaq(e, index)}
        >
          <div className="faq-q">
            {faq.question} <span className="faq-icon">+</span>
          </div>
          <div className="faq-a">{faq.answer}</div>
        </div>
      ))}
    </section>
  );
}

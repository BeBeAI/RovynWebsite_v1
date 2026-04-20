import { useState, FormEvent } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  name: string;
  email: string;
  company_size: string;
  interest: string;
  message: string;
}

export function ContactModal({ isOpen, onClose, onSubmit }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company_size: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        company_size: '',
        interest: '',
        message: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Get in Touch</h3>
        <p className="modal-sub">Tell us where you're at and we'll get back to you within a couple of days.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <label>Company Size</label>
            <select
              value={formData.company_size}
              onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
              required
            >
              <option value="">Select...</option>
              <option value="Less than 20">Less than 20</option>
              <option value="20–50">20–50</option>
              <option value="50–100">50–100</option>
              <option value="100–500">100–500</option>
              <option value="More than 500">More than 500</option>
            </select>
          </div>
          <div className="form-row">
            <label>What are you interested in?</label>
            <select
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              required
            >
              <option value="">Select...</option>
              <option value="Identifying AI opportunities">Identifying AI opportunities</option>
              <option value="Educating my team on AI">Educating my team on AI</option>
              <option value="Developing custom AI solutions">Developing custom AI solutions</option>
              <option value="All of the above">All of the above</option>
            </select>
          </div>
          <div className="form-row">
            <label>Anything else?</label>
            <textarea
              placeholder="Tell us a bit about your situation..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button type="submit" className="form-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      </div>
    </div>
  );
}

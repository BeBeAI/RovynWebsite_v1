import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Narrative } from './components/Narrative';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { CaseStudies } from './components/CaseStudies';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { ContactModal, ContactFormData } from './components/ContactModal';
import { useScrollReveal } from './components/hooks/useScrollReveal';
import { submitContactForm } from './components/lib/supabase';
import './rovyn.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();

  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const handleSubmitContact = async (data: ContactFormData) => {
    await submitContactForm(data);
  };

  return (
    <div className="app-container">
      <div className="bg-mesh" />
      <Nav onGetInTouch={() => setIsModalOpen(true)} />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero onGetInTouch={() => setIsModalOpen(true)} />
              <Marquee />
              <Narrative />
              <Services />
              <Testimonials />
              <CaseStudies />
              <CTA onGetInTouch={() => setIsModalOpen(true)} />
            </>
          } />
          <Route path="/services" element={<Services onGetInTouch={() => setIsModalOpen(true)} />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        </Routes>

        <Footer />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitContact}
      />
    </div>
  );
}

export default App;

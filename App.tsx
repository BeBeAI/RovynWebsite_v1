import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './src/components/Nav';
import { Hero } from './src/components/Hero';
import { Marquee } from './src/components/Marquee';
import { Narrative } from './src/components/Narrative';
import { Services } from './src/components/Services';
import { Testimonials } from './src/components/Testimonials';
import { FAQ } from './src/components/FAQ';
import { CTA } from './src/components/CTA';
import { Footer } from './src/components/Footer';
import { ContactModal, ContactFormData } from './src/components/ContactModal';
import { useScrollReveal } from './src/components/hooks/useScrollReveal';
import { AiAssessment } from './src/components/AiAssessment';
import { submitContactForm } from './src/components/lib/supabase';
import './rovyn.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useScrollReveal();

  const handleSubmitContact = async (data: ContactFormData) => {
    await submitContactForm(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav onGetInTouch={() => setIsModalOpen(true)} />
              <Hero onGetInTouch={() => setIsModalOpen(true)} />
              <Marquee />
              <Narrative />
              <Services />
              <Testimonials />
              <FAQ />
              <CTA onGetInTouch={() => setIsModalOpen(true)} />
              <Footer />
              <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitContact}
              />
            </>
          }
        />
        <Route path="/assessment" element={<AiAssessment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

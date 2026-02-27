import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './components/Hero';
import ForWho from './components/ForWho';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Difference from './components/Difference';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Final from './components/Final';
import Footer from './components/Footer';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';
import LegalModal from './components/LegalModal';

export default function HomePage() {
  const { i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'privacy' | 'cookies' | 'terms'>('privacy');

  const openModal = (type: 'privacy' | 'cookies' | 'terms') => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <ForWho />
        <HowItWorks />
        <Services />
        <Difference />
        <FAQ />
        <Contact />
        <Final />
      </main>
      <Footer onOpenModal={openModal} />
      <WhatsAppButton />
      <LegalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        content={modalContent}
        language={i18n.language}
      />
    </div>
  );
}
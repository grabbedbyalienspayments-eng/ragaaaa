
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function Final() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const vis = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Full-bleed cinematic background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/final-crazy-v1.webp)',
        }}
      />

      {/* Multi-layer overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.75) 50%, rgba(8,8,8,0.88) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(232,165,152,0.06) 0%, transparent 60%)' }} />

      {/* Giant background text */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(120px, 22vw, 320px)',
          fontWeight: 300,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,165,152,0.04)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        Black Studio
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-3xl">
          {/* Section label */}
          <div style={vis(0)} className="flex items-center gap-4 mb-12">
            <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>08</span>
            <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
            <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>Final</span>
          </div>

          {/* Main headline */}
          <h2
            style={{
              ...vis(100),
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
              fontWeight: 300,
              color: 'var(--cream)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}
          >
            {t('final.title')}
          </h2>

          {/* Divider line */}
          <div
            style={{
              ...vis(200),
              height: '1px',
              background: 'linear-gradient(to right, var(--rose), transparent)',
              maxWidth: '280px',
              marginBottom: '2rem',
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              ...vis(300),
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(240,236,230,0.5)',
              lineHeight: 1.7,
              marginBottom: '3.5rem',
              maxWidth: '520px',
            }}
          >
            {t('final.subtitle')}
          </p>

          {/* CTA with glow */}
          <div style={{ ...vis(450), position: 'relative', display: 'inline-block' }}>
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-30px',
                background: 'radial-gradient(ellipse, rgba(232,165,152,0.2) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <a
              href="https://wa.me/40775134887"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-rose relative"
              style={{ fontSize: '0.8rem', padding: '16px 40px' }}
            >
              <i className="ri-whatsapp-line text-base" />
              <span>{t('final.cta')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
    </section>
  );
}

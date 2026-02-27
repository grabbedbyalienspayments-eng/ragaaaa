
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeItems = ['Training', 'Management', 'Conținut', 'Strategie', 'Mentorat', 'Suport', 'Online', 'Profesional'];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-dark" style={{ paddingTop: '80px' }}>
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-crazy-v1.webp)',
          transform: `scale(1.08) translateY(${scrollY * 0.25}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/75 to-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/60" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, transparent 20%, rgba(8,8,8,0.6) 80%)' }} />

      {/* Rose ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '5%', top: '30%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(232,165,152,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto">
        <div className="max-w-3xl pt-8 md:pt-0">
          {/* Eyebrow label */}
          <div className="animate-hero-1 flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: 'var(--rose)' }} />
            <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>
              Black Studio
            </span>
          </div>

          {/* Main headline — display serif */}
          <h1
            className="animate-hero-2 font-display leading-none mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              color: 'var(--cream)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('hero.headline')}
          </h1>

          {/* Animated line */}
          <div
            className="animate-hero-line mb-8"
            style={{ height: '1px', background: 'linear-gradient(to right, var(--rose), transparent)', maxWidth: '320px' }}
          />

          {/* Subheadline */}
          <p
            className="animate-hero-3 font-sans font-light mb-6 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(232,165,152,0.85)', maxWidth: '520px' }}
          >
            {t('hero.subheadline')}
          </p>

          {/* Body text */}
          <p
            className="animate-hero-3 font-sans font-light mb-12 leading-relaxed"
            style={{ fontSize: '0.9rem', color: 'rgba(240,236,230,0.5)', maxWidth: '480px', letterSpacing: '0.01em' }}
          >
            {t('hero.text')}
          </p>

          {/* CTA */}
          <div className="animate-hero-4 relative inline-block">
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-20px',
                background: 'radial-gradient(ellipse, rgba(232,165,152,0.18) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <a
              href="https://wa.me/40775134887"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-rose relative"
            >
              <i className="ri-whatsapp-line text-base" />
              <span>{t('hero.cta')}</span>
            </a>
          </div>
        </div>

        {/* Floating portrait image — right side, desktop only */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[42%] pointer-events-none animate-fade-in"
          style={{ overflow: 'hidden' }}
        >
          <img
            src="/images/hero-portrait-v1.webp"
            alt="Black Studio model"
            className="w-full h-full object-cover object-top"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 80%, transparent 100%)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 20%, transparent 70%, rgba(8,8,8,0.8) 100%)' }} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex items-center gap-3">
          <div className="relative w-px h-12 overflow-hidden" style={{ background: 'rgba(240,236,230,0.1)' }}>
            <div
              className="absolute top-0 left-0 w-full animate-scroll-dot"
              style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, var(--rose))' }}
            />
          </div>
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(240,236,230,0.25)', letterSpacing: '0.2em' }}>Scroll</span>
        </div>
      </div>

      {/* Bottom marquee ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t"
        style={{ borderColor: 'rgba(232,165,152,0.08)', background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(10px)', height: '44px' }}
      >
        <div className="marquee-track animate-marquee h-full items-center flex">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
              <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(232,165,152,0.4)', letterSpacing: '0.2em' }}>{item}</span>
              <span style={{ color: 'rgba(232,165,152,0.2)', fontSize: '6px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

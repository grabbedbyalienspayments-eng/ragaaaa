
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function Difference() {
  const { t } = useTranslation();
  const values = t('difference.values', { returnObjects: true }) as string[];
  const [visibleEls, setVisibleEls] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.reveal!;
            setVisibleEls((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const vis = (id: string, delay = 0) => ({
    opacity: visibleEls.has(id) ? 1 : 0,
    transform: visibleEls.has(id) ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#080808', paddingTop: '160px', paddingBottom: '160px' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0c0c0c, transparent)' }} />

      {/* Full-bleed background image with heavy overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/diff-bg-v1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />

      {/* Ambient rose glow center */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(232,165,152,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section label */}
        <div data-reveal="label" style={vis('label')} className="flex items-center gap-4 mb-20">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>05</span>
          <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>Diferența</span>
        </div>

        {/* Layout: left text + right giant values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: title + text + CTA */}
          <div className="lg:col-span-4">
            <h2
              data-reveal="title"
              style={{
                ...vis('title', 100),
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 300,
                color: 'var(--cream)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              {t('difference.title')}
            </h2>

            <p
              data-reveal="sub"
              style={{
                ...vis('sub', 200),
                fontSize: '1rem',
                color: 'rgba(232,165,152,0.7)',
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: '1.3rem',
              }}
            >
              {t('difference.subtitle')}
            </p>

            <p
              data-reveal="text"
              style={{
                ...vis('text', 300),
                fontSize: '0.9rem',
                color: 'rgba(240,236,230,0.4)',
                fontWeight: 300,
                lineHeight: 1.9,
                marginBottom: '3rem',
              }}
            >
              {t('difference.text')}
            </p>

            <div data-reveal="cta" style={vis('cta', 400)}>
              <a href="https://wa.me/40775134887" target="_blank" rel="noopener noreferrer" className="btn-ghost-rose">
                <span>{t('difference.cta')}</span>
                <i className="ri-arrow-right-line text-sm" />
              </a>
            </div>
          </div>

          {/* Right: giant typographic values */}
          <div className="lg:col-span-8 flex flex-col items-start lg:items-end gap-0">
            {values.map((value, i) => (
              <div
                key={i}
                data-reveal={`val-${i}`}
                style={{
                  ...vis(`val-${i}`, 150 + i * 180),
                  position: 'relative',
                  lineHeight: 1,
                  paddingBottom: i < values.length - 1 ? '0.15em' : 0,
                }}
              >
                {/* Giant text */}
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(4.5rem, 11vw, 10rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    color: 'transparent',
                    WebkitTextStroke: `1px rgba(232,165,152,${0.25 + i * 0.15})`,
                    display: 'block',
                    transition: 'all 0.4s ease',
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.WebkitTextStroke = '1px rgba(232,165,152,0.9)';
                    (e.target as HTMLElement).style.color = 'rgba(232,165,152,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.WebkitTextStroke = `1px rgba(232,165,152,${0.25 + i * 0.15})`;
                    (e.target as HTMLElement).style.color = 'transparent';
                  }}
                >
                  {value}
                </span>

                {/* Underline reveal */}
                <div
                  style={{
                    height: '1px',
                    background: `linear-gradient(to right, rgba(232,165,152,${0.2 + i * 0.1}), transparent)`,
                    width: visibleEls.has(`val-${i}`) ? '100%' : '0%',
                    transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${300 + i * 180 + 400}ms`,
                    marginTop: '0.1em',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #0c0c0c, transparent)' }} />
    </section>
  );
}

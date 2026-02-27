
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{ title: string; desc: string }>;
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
    transform: visibleEls.has(id) ? 'translateY(0)' : 'translateY(36px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden"
      style={{ background: '#080808', paddingTop: '140px', paddingBottom: '140px' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0c0c0c, transparent)' }} />

      {/* Giant background number — editorial depth */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontWeight: 300,
          color: 'rgba(232,165,152,0.025)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        03
      </div>

      {/* Ambient glow left */}
      <div className="absolute left-0 top-1/3 pointer-events-none" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,165,152,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section label */}
        <div data-reveal="label" style={vis('label')} className="flex items-center gap-4 mb-16">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>03</span>
          <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>{t('howItWorks.title')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2
              data-reveal="title"
              style={{
                ...vis('title', 100),
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: 'var(--cream)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('howItWorks.title')}
            </h2>

            <p
              data-reveal="intro"
              style={{ ...vis('intro', 200), marginTop: '1.5rem', fontSize: '1rem', color: 'rgba(232,165,152,0.75)', fontWeight: 300, lineHeight: 1.8 }}
            >
              {t('howItWorks.intro')}
            </p>

            <div data-reveal="cta" style={{ ...vis('cta', 300), marginTop: '3rem' }}>
              <a href="https://wa.me/40775134887" target="_blank" rel="noopener noreferrer" className="btn-ghost-rose">
                <span>{t('howItWorks.cta')}</span>
                <i className="ri-arrow-right-line text-sm" />
              </a>
            </div>
          </div>

          {/* Right: steps */}
          <div className="lg:col-span-8 space-y-0">
            {steps.map((step, i) => (
              <div
                key={i}
                data-reveal={`step-${i}`}
                style={vis(`step-${i}`, 200 + i * 120)}
                className="group relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-8 pointer-events-none"
                    style={{
                      top: '80px',
                      bottom: '-1px',
                      width: '1px',
                      background: 'linear-gradient(to bottom, rgba(232,165,152,0.2), transparent)',
                    }}
                  />
                )}

                <div className="flex gap-8 py-10 border-t" style={{ borderColor: 'rgba(240,236,230,0.06)' }}>
                  {/* Step number circle */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      border: '1px solid rgba(232,165,152,0.2)',
                      borderRadius: '50%',
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      color: 'var(--rose)',
                      background: 'rgba(232,165,152,0.04)',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1 pt-1">
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 300,
                        color: 'var(--cream)',
                        marginBottom: '0.75rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(240,236,230,0.45)', lineHeight: 1.8, fontWeight: 300 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Outro */}
            <div
              data-reveal="outro"
              style={{
                ...vis('outro', 200 + steps.length * 120),
                paddingTop: '2.5rem',
                borderTop: '1px solid rgba(240,236,230,0.06)',
              }}
            >
              <p style={{ fontSize: '1.1rem', color: 'rgba(232,165,152,0.6)', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                &ldquo;{t('howItWorks.outro')}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #0c0c0c, transparent)' }} />
    </section>
  );
}

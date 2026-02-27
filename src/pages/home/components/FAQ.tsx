
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleEls, setVisibleEls] = useState<Set<string>>(new Set());
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, items.length);
  }, [items.length]);

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
      { threshold: 0.06 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const vis = (id: string, delay = 0) => ({
    opacity: visibleEls.has(id) ? 1 : 0,
    transform: visibleEls.has(id) ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden"
      style={{ background: '#0c0c0c', paddingTop: '140px', paddingBottom: '140px' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080808, transparent)' }} />

      {/* Giant bg number */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: '-2%', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontWeight: 300,
          color: 'rgba(232,165,152,0.022)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        06
      </div>

      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(232,165,152,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section label */}
        <div data-reveal="label" style={vis('label')} className="flex items-center gap-4 mb-16">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>06</span>
          <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>{t('faq.title')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: sticky title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2
              data-reveal="title"
              style={{
                ...vis('title', 100),
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                fontWeight: 300,
                color: 'var(--cream)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                marginBottom: '2rem',
              }}
            >
              {t('faq.title')}
            </h2>

            <div data-reveal="cta" style={{ ...vis('cta', 200), marginTop: '3rem' }}>
              <a href="https://wa.me/40775134887" target="_blank" rel="noopener noreferrer" className="btn-ghost-rose">
                <span>{t('faq.cta')}</span>
                <i className="ri-arrow-right-line text-sm" />
              </a>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-8">
            {items.map((item, i) => (
              <div
                key={i}
                data-reveal={`faq-${i}`}
                style={vis(`faq-${i}`, 150 + i * 80)}
                className="overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left cursor-pointer group"
                  style={{ borderTop: '1px solid rgba(240,236,230,0.06)' }}
                >
                  {/* Number */}
                  <span
                    className="flex-shrink-0 font-sans text-xs tracking-widest"
                    style={{
                      color: openIndex === i ? 'var(--rose)' : 'rgba(232,165,152,0.3)',
                      transition: 'color 0.3s ease',
                      letterSpacing: '0.15em',
                      minWidth: '28px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Question */}
                  <span
                    className="flex-1 font-display"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                      fontWeight: 300,
                      color: openIndex === i ? 'var(--cream)' : 'rgba(240,236,230,0.65)',
                      transition: 'color 0.3s ease',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.q}
                  </span>

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                    style={{
                      border: `1px solid ${openIndex === i ? 'rgba(232,165,152,0.5)' : 'rgba(240,236,230,0.1)'}`,
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      color: openIndex === i ? 'var(--rose)' : 'rgba(240,236,230,0.3)',
                    }}
                  >
                    <i
                      className="ri-add-line text-sm"
                      style={{
                        transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                        display: 'block',
                      }}
                    />
                  </div>
                </button>

                {/* Answer */}
                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  style={{
                    maxHeight: openIndex === i ? `${contentRefs.current[i]?.scrollHeight ?? 200}px` : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div
                    style={{
                      paddingBottom: '2rem',
                      paddingLeft: '2.5rem',
                      fontSize: '0.9rem',
                      color: 'rgba(240,236,230,0.45)',
                      lineHeight: 1.9,
                      fontWeight: 300,
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
            {/* Last border */}
            <div style={{ borderTop: '1px solid rgba(240,236,230,0.06)' }} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
    </section>
  );
}

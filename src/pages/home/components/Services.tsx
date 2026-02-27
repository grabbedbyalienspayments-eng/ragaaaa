
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

const SERVICE_IMAGES = [
  '/images/svc-img-1.webp',
  '/images/svc-img-2.webp',
  '/images/svc-img-3.webp',
  '/images/svc-img-4.webp',
  '/images/svc-img-5.webp',
];

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
      { threshold: 0.06 }
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
      id="services"
      className="relative overflow-hidden"
      style={{ background: '#0c0c0c', paddingTop: '140px', paddingBottom: '140px' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080808, transparent)' }} />

      {/* Giant bg text */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: '-2%', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(180px, 28vw, 380px)',
          fontWeight: 300,
          color: 'rgba(232,165,152,0.022)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        04
      </div>

      {/* Ambient glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(232,165,152,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section label */}
        <div data-reveal="label" style={vis('label')} className="flex items-center gap-4 mb-16">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>04</span>
          <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>{t('services.title')}</span>
        </div>

        {/* Title */}
        <h2
          data-reveal="title"
          style={{
            ...vis('title', 100),
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
            fontWeight: 300,
            color: 'var(--cream)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: '5rem',
            maxWidth: '600px',
          }}
        >
          {t('services.title')}
        </h2>

        {/* Services list — full-width editorial rows */}
        <div>
          {items.map((item, i) => (
            <div
              key={i}
              data-reveal={`svc-${i}`}
              style={vis(`svc-${i}`, 150 + i * 100)}
              className="group relative"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 py-8 md:py-10 cursor-default"
                style={{
                  borderTop: '1px solid rgba(240,236,230,0.06)',
                  transition: 'background 0.4s ease',
                  background: activeIndex === i ? 'rgba(232,165,152,0.025)' : 'transparent',
                  paddingLeft: activeIndex === i ? '1.5rem' : '0',
                  paddingRight: activeIndex === i ? '1.5rem' : '0',
                  borderRadius: activeIndex === i ? '4px' : '0',
                }}
              >
                {/* Number */}
                <div
                  className="flex-shrink-0"
                  style={{
                    width: '80px',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    fontWeight: 300,
                    color: activeIndex === i ? 'var(--rose)' : 'rgba(232,165,152,0.3)',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Title */}
                <div className="flex-1 md:pr-12">
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                      fontWeight: 300,
                      color: activeIndex === i ? 'var(--cream)' : 'rgba(240,236,230,0.7)',
                      transition: 'color 0.3s ease',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Description — appears on hover */}
                <div
                  className="md:w-80 lg:w-96"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transform: activeIndex === i ? 'translateX(0)' : 'translateX(12px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                >
                  <p style={{ fontSize: '0.85rem', color: 'rgba(240,236,230,0.45)', lineHeight: 1.8, fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="flex-shrink-0 ml-0 md:ml-8 w-8 h-8 flex items-center justify-center"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transform: activeIndex === i ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    color: 'var(--rose)',
                  }}
                >
                  <i className="ri-arrow-right-line text-lg" />
                </div>
              </div>

              {/* Image reveal on hover — desktop only */}
              <div
                className="hidden lg:block absolute pointer-events-none"
                style={{
                  right: '120px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '220px',
                  height: '140px',
                  overflow: 'hidden',
                  opacity: activeIndex === i ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  zIndex: 20,
                }}
              >
                <img
                  src={SERVICE_IMAGES[i]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85) saturate(0.9)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,8,0.3) 0%, transparent 60%)' }} />
              </div>
            </div>
          ))}

          {/* Last border */}
          <div style={{ borderTop: '1px solid rgba(240,236,230,0.06)' }} />
        </div>

        {/* CTA */}
        <div data-reveal="cta" style={{ ...vis('cta', 150 + items.length * 100 + 100), marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
          <a href="https://wa.me/40775134887" target="_blank" rel="noopener noreferrer" className="btn-ghost-rose">
            <span>{t('services.cta')}</span>
            <i className="ri-arrow-right-line text-sm" />
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
    </section>
  );
}

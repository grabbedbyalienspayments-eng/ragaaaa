
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function ForWho() {
  const { t } = useTranslation();
  const items = t('forWho.items', { returnObjects: true }) as string[];
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
      { threshold: 0.1 }
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
      id="for-who"
      className="relative overflow-hidden"
      style={{ background: '#0c0c0c', paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080808, transparent)' }} />

      {/* Ambient glow right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(232,165,152,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <div data-reveal="label" style={vis('label')} className="flex items-center gap-4 mb-16">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>02</span>
          <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>{t('forWho.title')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          {/* Left: text block */}
          <div className="lg:col-span-5 lg:pr-16">
            <h2
              data-reveal="title"
              style={{ ...vis('title', 100), fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--cream)', letterSpacing: '-0.02em' }}
            >
              {t('forWho.title')}
            </h2>

            <p
              data-reveal="intro"
              style={{ ...vis('intro', 200), marginTop: '2rem', fontSize: '1.1rem', color: 'rgba(232,165,152,0.8)', fontWeight: 300, lineHeight: 1.7 }}
            >
              {t('forWho.intro')}
            </p>

            {/* Items list — editorial style */}
            <ul className="mt-10 space-y-0">
              {items.map((item, i) => (
                <li
                  key={i}
                  data-reveal={`item-${i}`}
                  style={vis(`item-${i}`, 300 + i * 80)}
                  className="group flex items-center gap-5 py-4 cursor-default"
                  role="listitem"
                >
                  <div className="flex-shrink-0 w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,165,152,0.5), transparent)' }} />
                  <span className="text-xs tracking-widest font-sans" style={{ color: 'rgba(232,165,152,0.4)', minWidth: '24px' }}>0{i + 1}</span>
                  <span className="font-sans font-light" style={{ fontSize: '1rem', color: 'rgba(240,236,230,0.75)', letterSpacing: '0.01em' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Mobile images */}
            <div className="lg:hidden mt-12 mb-10">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img
                    src="/images/forwho-mob-1.webp"
                    alt="Model Black Studio"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)' }} />
                </div>
                <div className="relative overflow-hidden mt-8" style={{ aspectRatio: '3/4' }}>
                  <img
                    src="/images/forwho-mob-2.webp"
                    alt="Model Black Studio"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)' }} />
                </div>
              </div>
            </div>

            <div data-reveal="cta" style={{ ...vis('cta', 300 + items.length * 80 + 100), marginTop: '2.5rem' }}>
              <a href="https://wa.me/40775134887" target="_blank" rel="noopener noreferrer" className="btn-ghost-rose">
                <span>{t('forWho.cta')}</span>
                <i className="ri-arrow-right-line text-sm" />
              </a>
            </div>
          </div>

          {/* Right: staggered images — desktop only */}
          <div className="hidden lg:block lg:col-span-7 relative" style={{ height: '680px' }}>
            {/* Image 1 — large, left */}
            <div
              data-reveal="img1"
              style={{
                ...vis('img1', 200),
                position: 'absolute',
                left: '5%',
                top: 0,
                width: '48%',
                height: '85%',
                overflow: 'hidden',
              }}
            >
              <img
                src="/images/forwho-desk-1.webp"
                alt="Model Black Studio"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 60%)' }} />
            </div>

            {/* Image 2 — smaller, right, offset down */}
            <div
              data-reveal="img2"
              style={{
                ...vis('img2', 350),
                position: 'absolute',
                right: '0%',
                top: '12%',
                width: '44%',
                height: '78%',
                overflow: 'hidden',
              }}
            >
              <img
                src="/images/forwho-desk-2.webp"
                alt="Model Black Studio"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 60%)' }} />
            </div>

            {/* Decorative rose line */}
            <div
              data-reveal="deco"
              style={{
                ...vis('deco', 500),
                position: 'absolute',
                bottom: '8%',
                left: '5%',
                right: '0',
                height: '1px',
                background: 'linear-gradient(to right, rgba(232,165,152,0.3), transparent)',
              }}
            />

            {/* Floating label */}
            <div
              data-reveal="floatlabel"
              style={{
                ...vis('floatlabel', 600),
                position: 'absolute',
                bottom: '4%',
                left: '5%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(232,165,152,0.5)', letterSpacing: '0.2em' }}>Black Studio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
    </section>
  );
}

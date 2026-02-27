
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    message: '',
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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
    transform: visibleEls.has(id) ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy || !formData.age || parseInt(formData.age) < 18) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const body = new URLSearchParams();
      body.append('name', formData.name);
      body.append('age', formData.age);
      body.append('phone', formData.phone);
      body.append('email', formData.email);
      body.append('message', formData.message);
      body.append('privacy', 'Acceptat');
      const res = await fetch('https://readdy.ai/api/form/d6h1i3ji06gv2c9ufng0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', age: '', phone: '', email: '', message: '', privacy: false });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ background: '#080808', paddingTop: '140px', paddingBottom: '140px' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0c0c0c, transparent)' }} />

      {/* Giant bg number */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: '-2%', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontWeight: 300,
          color: 'rgba(232,165,152,0.022)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        07
      </div>

      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(232,165,152,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section label */}
        <div data-reveal="label" style={vis('label')} className="flex items-center gap-4 mb-16">
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'var(--rose)', letterSpacing: '0.25em' }}>07</span>
          <div className="w-12 h-px" style={{ background: 'rgba(232,165,152,0.3)' }} />
          <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.2em' }}>{t('contact.title')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: info */}
          <div className="lg:col-span-5">
            <h2
              data-reveal="title"
              style={{
                ...vis('title', 100),
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                fontWeight: 300,
                color: 'var(--cream)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              {t('contact.title')}
            </h2>

            <p
              data-reveal="sub"
              style={{
                ...vis('sub', 200),
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(232,165,152,0.75)',
                marginBottom: '1rem',
                lineHeight: 1.5,
              }}
            >
              {t('contact.subtitle')}
            </p>

            <p
              data-reveal="text"
              style={{
                ...vis('text', 280),
                fontSize: '0.9rem',
                color: 'rgba(240,236,230,0.4)',
                fontWeight: 300,
                lineHeight: 1.9,
                marginBottom: '3.5rem',
              }}
            >
              {t('contact.text')}
            </p>

            {/* Contact items */}
            <div className="space-y-6">
              <a
                href="tel:0775134887"
                data-reveal="phone"
                style={vis('phone', 350)}
                className="flex items-center gap-5 group cursor-pointer"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(232,165,152,0.2)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    color: 'var(--rose)',
                  }}
                >
                  <i className="ri-phone-line text-base" />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase font-sans mb-0.5" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.15em' }}>Telefon</div>
                  <div className="font-sans font-light" style={{ fontSize: '1rem', color: 'rgba(240,236,230,0.75)', transition: 'color 0.3s ease' }}>0775 134 887</div>
                </div>
              </a>

              <a
                href="mailto:andreibojici@gmail.com"
                data-reveal="email"
                style={vis('email', 420)}
                className="flex items-center gap-5 group cursor-pointer"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(232,165,152,0.2)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    color: 'var(--rose)',
                  }}
                >
                  <i className="ri-mail-line text-base" />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase font-sans mb-0.5" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.15em' }}>Email</div>
                  <div className="font-sans font-light" style={{ fontSize: '0.9rem', color: 'rgba(240,236,230,0.75)', transition: 'color 0.3s ease' }}>andreibojici@gmail.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/40775134887"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal="wa"
                style={vis('wa', 490)}
                className="flex items-center gap-5 group cursor-pointer"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(232,165,152,0.2)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    color: 'var(--rose)',
                  }}
                >
                  <i className="ri-whatsapp-line text-base" />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase font-sans mb-0.5" style={{ color: 'rgba(240,236,230,0.3)', letterSpacing: '0.15em' }}>WhatsApp</div>
                  <div className="font-sans font-light" style={{ fontSize: '1rem', color: 'rgba(240,236,230,0.75)', transition: 'color 0.3s ease' }}>+40 775 134 887</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div
            data-reveal="form"
            style={{ ...vis('form', 200), gridColumn: 'span 7' }}
            className="lg:col-span-7"
          >
            <form id="contact_form" data-readdy-form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.form.name')}
                    className="input-minimal w-full"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder={t('contact.form.age')}
                    required
                    min="18"
                    className="input-minimal w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('contact.form.phone')}
                    required
                    className="input-minimal w-full"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact.form.email')}
                    required
                    className="input-minimal w-full"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setFormData({ ...formData, message: e.target.value });
                  }}
                  placeholder={t('contact.form.message')}
                  rows={5}
                  maxLength={500}
                  className="input-minimal w-full resize-none"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs font-sans" style={{ color: 'rgba(240,236,230,0.2)' }}>{formData.message.length}/500</span>
                </div>
              </div>

              {/* Privacy checkbox */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="privacy"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    required
                    className="sr-only"
                  />
                  <label
                    htmlFor="privacy"
                    className="flex items-center justify-center cursor-pointer"
                    style={{
                      width: '18px',
                      height: '18px',
                      border: `1px solid ${formData.privacy ? 'var(--rose)' : 'rgba(240,236,230,0.2)'}`,
                      background: formData.privacy ? 'rgba(232,165,152,0.15)' : 'transparent',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {formData.privacy && <i className="ri-check-line text-xs" style={{ color: 'var(--rose)' }} />}
                  </label>
                </div>
                <label htmlFor="privacy" className="text-xs font-sans cursor-pointer leading-relaxed" style={{ color: 'rgba(240,236,230,0.35)' }}>
                  {t('contact.form.privacy')}
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.privacy}
                  className="btn-ghost-rose disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ minWidth: '200px', justifyContent: 'center' }}
                >
                  <span>{isSubmitting ? 'Se trimite...' : t('contact.form.submit')}</span>
                  {!isSubmitting && <i className="ri-arrow-right-line text-sm" />}
                </button>
                <p className="text-xs font-sans" style={{ color: 'rgba(240,236,230,0.25)' }}>
                  {t('contact.form.note')}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div
                  className="flex items-center gap-3 p-4"
                  style={{ border: '1px solid rgba(134,239,172,0.2)', background: 'rgba(134,239,172,0.05)' }}
                >
                  <i className="ri-check-line" style={{ color: 'rgba(134,239,172,0.7)' }} />
                  <span className="text-sm font-sans font-light" style={{ color: 'rgba(134,239,172,0.7)' }}>
                    Mesajul a fost trimis. Îți răspundem în curând.
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  className="flex items-center gap-3 p-4"
                  style={{ border: '1px solid rgba(252,165,165,0.2)', background: 'rgba(252,165,165,0.05)' }}
                >
                  <i className="ri-error-warning-line" style={{ color: 'rgba(252,165,165,0.7)' }} />
                  <span className="text-sm font-sans font-light" style={{ color: 'rgba(252,165,165,0.7)' }}>
                    A apărut o eroare. Te rugăm să încerci din nou.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #0c0c0c, transparent)' }} />
    </section>
  );
}


import { useTranslation } from 'react-i18next';

interface FooterProps {
  onOpenModal: (type: 'privacy' | 'cookies' | 'terms') => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t('nav.forWho'), id: 'for-who' },
    { label: t('nav.howItWorks'), id: 'how-it-works' },
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.faq'), id: 'faq' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(232,165,152,0.07)' }}>
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <img
              src="https://public.readdy.ai/ai/img_res/9ba587d1-4bc8-44da-a36b-c240332e29cd.png"
              alt="Black Studio"
              className="h-9 w-auto mb-6"
            />
            <p
              className="font-sans font-light leading-relaxed"
              style={{ fontSize: '0.85rem', color: 'rgba(240,236,230,0.3)', maxWidth: '320px' }}
            >
              Training și management pentru modele care vor să înceapă în siguranță, online sau într-un cadru profesional dedicat.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <a
                href="tel:0775134887"
                className="flex items-center gap-3 cursor-pointer group"
                style={{ textDecoration: 'none' }}
              >
                <i className="ri-phone-line text-sm" style={{ color: 'rgba(232,165,152,0.4)' }} />
                <span
                  className="font-sans font-light text-sm"
                  style={{ color: 'rgba(240,236,230,0.35)', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--rose)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(240,236,230,0.35)')}
                >
                  0775 134 887
                </span>
              </a>
              <a
                href="mailto:andreibojici@gmail.com"
                className="flex items-center gap-3 cursor-pointer"
                style={{ textDecoration: 'none' }}
              >
                <i className="ri-mail-line text-sm" style={{ color: 'rgba(232,165,152,0.4)' }} />
                <span
                  className="font-sans font-light text-sm"
                  style={{ color: 'rgba(240,236,230,0.35)', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--rose)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(240,236,230,0.35)')}
                >
                  andreibojici@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2" />

          {/* Navigation */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-xs tracking-widest uppercase mb-6"
              style={{ color: 'rgba(232,165,152,0.4)', letterSpacing: '0.2em' }}
            >
              Navigare
            </p>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block font-sans font-light text-sm cursor-pointer text-left"
                  style={{ color: 'rgba(240,236,230,0.3)', transition: 'color 0.3s ease', background: 'none', border: 'none', padding: 0 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--rose)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(240,236,230,0.3)')}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <p
              className="font-sans text-xs tracking-widest uppercase mb-6"
              style={{ color: 'rgba(232,165,152,0.4)', letterSpacing: '0.2em' }}
            >
              Legal
            </p>
            <div className="space-y-3">
              {[
                { label: t('footer.legal.privacy'), type: 'privacy' as const },
                { label: t('footer.legal.cookies'), type: 'cookies' as const },
                { label: t('footer.legal.terms'), type: 'terms' as const },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => onOpenModal(item.type)}
                  className="block font-sans font-light text-sm cursor-pointer text-left"
                  style={{ color: 'rgba(240,236,230,0.3)', transition: 'color 0.3s ease', background: 'none', border: 'none', padding: 0 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--rose)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(240,236,230,0.3)')}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-screen-xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(240,236,230,0.04)' }}
      >
        <p className="font-sans font-light text-xs" style={{ color: 'rgba(240,236,230,0.2)' }}>
          {t('footer.copyright')} {new Date().getFullYear()}
        </p>
        <p className="font-sans font-light text-xs" style={{ color: 'rgba(240,236,230,0.2)' }}>
          {t('footer.createdBy')}{' '}
          <a
            href="https://websiteon.ro/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(232,165,152,0.5)', transition: 'color 0.3s ease', textDecoration: 'none' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--rose)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(232,165,152,0.5)')}
          >
            WebsiteON
          </a>
        </p>
      </div>
    </footer>
  );
}

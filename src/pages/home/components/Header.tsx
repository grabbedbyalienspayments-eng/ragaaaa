
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ro' ? 'en' : 'ro');
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled
            ? 'rgba(8,8,8,0.92)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(232,165,152,0.08)' : '1px solid transparent',
        }}
      >
        <div className="w-full px-6 md:px-10 py-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex-shrink-0"
          >
            <img
              src="https://public.readdy.ai/ai/img_res/9ba587d1-4bc8-44da-a36b-c240332e29cd.png"
              alt="Black Studio"
              className="h-9 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { label: t('nav.forWho'), id: 'for-who' },
              { label: t('nav.howItWorks'), id: 'how-it-works' },
              { label: t('nav.services'), id: 'services' },
              { label: t('nav.faq'), id: 'faq' },
              { label: t('nav.contact'), id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs tracking-widest uppercase text-cream/50 hover:text-rose-300 transition-colors duration-300 whitespace-nowrap cursor-pointer font-sans"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <a
              href="tel:0775134887"
              className="hidden md:flex items-center gap-2 text-xs tracking-wider text-cream/40 hover:text-rose-300 transition-colors duration-300 whitespace-nowrap"
            >
              <i className="ri-phone-line text-sm"></i>
              <span>0775 134 887</span>
            </a>

            <button
              onClick={toggleLanguage}
              className="text-xs tracking-widest uppercase text-cream/40 hover:text-rose-300 transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              {i18n.language === 'ro' ? 'EN' : 'RO'}
            </button>

            <a
              href="https://wa.me/40775134887"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-rose text-xs py-2.5 px-5 whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-sm"></i>
              <span>WhatsApp</span>
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className="block w-6 h-px bg-cream/60 transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }}
              ></span>
              <span
                className="block w-4 h-px bg-cream/60 transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              ></span>
              <span
                className="block w-6 h-px bg-cream/60 transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center lg:hidden transition-all duration-500"
        style={{
          background: 'rgba(8,8,8,0.97)',
          backdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        <nav className="flex flex-col items-center gap-8">
          {[
            { label: t('nav.forWho'), id: 'for-who' },
            { label: t('nav.howItWorks'), id: 'how-it-works' },
            { label: t('nav.services'), id: 'services' },
            { label: t('nav.faq'), id: 'faq' },
            { label: t('nav.contact'), id: 'contact' },
          ].map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-display text-4xl font-light text-cream/80 hover:text-rose-300 transition-colors duration-300 cursor-pointer"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-12 flex items-center gap-6 text-sm text-cream/30">
          <a href="tel:0775134887" className="hover:text-rose-300 transition-colors">0775 134 887</a>
          <span>·</span>
          <a href="mailto:andreibojici@gmail.com" className="hover:text-rose-300 transition-colors">andreibojici@gmail.com</a>
        </div>
      </div>
    </>
  );
}

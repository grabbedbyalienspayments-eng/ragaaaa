
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/40775134887"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact pe WhatsApp"
      className="fixed bottom-7 right-7 z-50 cursor-pointer group"
      style={{ textDecoration: 'none' }}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none"
        style={{
          border: '1px solid rgba(232,165,152,0.25)',
          borderRadius: '50%',
          transform: 'scale(1.35)',
        }}
      />

      {/* Button */}
      <span
        className="relative flex items-center justify-center w-13 h-13"
        style={{
          width: '52px',
          height: '52px',
          background: '#0f0f0f',
          border: '1px solid rgba(232,165,152,0.25)',
          borderRadius: '50%',
          boxShadow: '0 8px 32px rgba(8,8,8,0.6), 0 0 0 1px rgba(232,165,152,0.08)',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          color: 'var(--rose)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(232,165,152,0.6)';
          el.style.boxShadow = '0 8px 32px rgba(8,8,8,0.6), 0 0 24px rgba(232,165,152,0.2)';
          el.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(232,165,152,0.25)';
          el.style.boxShadow = '0 8px 32px rgba(8,8,8,0.6), 0 0 0 1px rgba(232,165,152,0.08)';
          el.style.transform = 'scale(1)';
        }}
      >
        <i className="ri-whatsapp-line" style={{ fontSize: '1.25rem' }} />
      </span>
    </a>
  );
}

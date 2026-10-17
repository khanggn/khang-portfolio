import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { key: 'home', label: 'Home', to: '/' },
  { key: 'about', label: 'About', to: '/about' },
  { key: 'playlist', label: 'My Playlists', to: '/playlist' },
];

export default function Navbar({ activePage, boxShadow }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleActiveClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '72px',
          padding: '22px var(--page-padding)',
          boxShadow: boxShadow || '0 8px 24px rgba(255, 255, 255, 0.08)',
          transition: boxShadow ? 'box-shadow 0.3s ease' : undefined,
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(20px, 2.5vw, 27px)' }}
          >
            Khang's Wrapped
          </Link>

          {/* Desktop nav */}
          <div
            className="nav-links-desktop items-center"
            style={{ fontFamily: "'Gamja Flower', sans-serif", gap: '29px', fontSize: '20px' }}
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              if (isActive) {
                return (
                  <a
                    key={link.key}
                    href="#"
                    onClick={handleActiveClick}
                    className="hover:text-[#C4B5FD] transition-colors text-[#C4B5FD]"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.key}
                  to={link.to}
                  className="hover:text-[#C4B5FD] transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="/resume/khangresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C4B5FD] transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#E8E8E3',
              cursor: 'pointer',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              if (isActive) {
                return (
                  <a
                    key={link.key}
                    href="#"
                    className="active"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.key} to={link.to} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              );
            })}
            <a
              href="/resume/khangresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

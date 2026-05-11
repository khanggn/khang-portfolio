import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MusicNote, MusicNotes, MusicNotesSimple } from '@phosphor-icons/react';
import FooterWithSpotlight from '../components/FooterWithSpotlight';

// Music note cursor trail component
function MusicCursorTrail() {
  const [notes, setNotes] = useState([]);
  const noteIcons = [MusicNote, MusicNotes, MusicNotesSimple];

  useEffect(() => {
    let noteId = 0;

    const handleMouseMove = (e) => {
      if (Math.random() > 0.85) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const bgColor = element ? window.getComputedStyle(element).backgroundColor : '';
        const isOnLightBackground = bgColor.includes('232, 232, 227') || bgColor.includes('rgb(232, 232, 227)');

        const newNote = {
          id: noteId++,
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          direction: Math.random() > 0.5 ? 1 : -1,
          IconComponent: noteIcons[Math.floor(Math.random() * noteIcons.length)],
          color: isOnLightBackground ? '#C4B5FD' : '#E8E8E3'
        };

        setNotes((prev) => [...prev, newNote]);

        setTimeout(() => {
          setNotes((prev) => prev.filter((note) => note.id !== newNote.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="music-cursor-trail" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {notes.map((note) => {
        const IconComponent = note.IconComponent;
        return (
          <motion.div
            key={note.id}
            initial={{
              x: note.x,
              y: note.y,
              opacity: 0.8,
              scale: note.scale,
              rotate: note.rotation
            }}
            animate={{
              x: note.x + (note.direction * 30),
              y: note.y - 40,
              opacity: 0,
              rotate: note.rotation + (note.direction * 45)
            }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
            style={{ position: 'absolute' }}
          >
            <IconComponent size={20} weight="fill" color={note.color} />
          </motion.div>
        );
      })}
    </div>
  );
}

function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Music Note Cursor Trail */}
      <MusicCursorTrail />

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '72px',
          padding: '22px var(--page-padding)',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
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
            style={{ fontFamily: "'Inter', sans-serif", gap: '29px', fontSize: '14px' }}
          >
            <Link to="/" className="hover:text-[#C4B5FD] transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#C4B5FD] transition-colors text-[#C4B5FD]">
              About
            </Link>
            <Link to="/playlist" className="hover:text-[#C4B5FD] transition-colors">
              My Playlists
            </Link>
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
              justifyContent: 'center'
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
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="active" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/playlist" onClick={() => setIsMobileMenuOpen(false)}>
              My Playlists
            </Link>
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

      {/* Main Content */}
      <main className="flex-1" style={{ padding: '0 var(--page-padding)' }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: 'calc(100vh - 72px)',
            display: 'flex',
            alignItems: 'center',
            paddingTop: 'clamp(40px, 8vh, 80px)',
            paddingBottom: 'clamp(40px, 8vh, 80px)'
          }}
        >
          <div className="about-hero-flex" style={{ display: 'flex', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center', width: '100%' }}>
            {/* Left side - Text content */}
            <div style={{ flex: 1 }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-bold"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(32px, 5vw, 58px)',
                  lineHeight: '1.2',
                  marginBottom: 'clamp(20px, 3vw, 32px)',
                  color: '#E8E8E3'
                }}
              >
                Hey! I'm <span className="gradient-shimmer">Khang</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#E8E8E3',
                  marginBottom: '16px'
                }}
              >
                I'm a developer and designer based in San Diego who loves building websites that are visually appealing and intuitive to use.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#E8E8E3',
                  marginBottom: '16px'
                }}
              >
                For a while, I was committed to straight up coding. I wasn't really thinking beyond just writing code. That's when I got introduced to UI/UX design and it changed everything. Now I get to work right between design and development, with the user always in the back of my mind.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#E8E8E3',
                  marginBottom: '16px'
                }}
              >
              I've worked with clients and organizations, redesigning websites for nonprofits and building new ones from scratch for people who use them every day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#E8E8E3'
                }}
              >
                If you want someone who thinks about both the look and the feels, I'd love to connect.
              </motion.p>
            </div>

            {/* Right side - Headshot */}
            <motion.div
              className="about-headshot"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                width: 'clamp(200px, 30vw, 400px)',
                height: 'clamp(200px, 30vw, 400px)',
                flexShrink: 0
              }}
            >
              <img
                src="/images/projects/headshot.png"
                alt="Khang Nguyen"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  border: '2px solid #E8E8E3'
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            marginLeft: 'calc(var(--page-padding) * -1)',
            marginRight: 'calc(var(--page-padding) * -1)'
          }}
        />

        {/* New Section - Blank for now */}
        <section
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E8E8E3',
            marginLeft: 'calc(var(--page-padding) * -1)',
            marginRight: 'calc(var(--page-padding) * -1)',
            paddingLeft: 'var(--page-padding)',
            paddingRight: 'var(--page-padding)'
          }}
        >
          {/* Content placeholder */}
        </section>

        {/* Footer Section */}
        <FooterWithSpotlight />
      </main>
    </div>
  );
}

export default About;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MusicNote, MusicNotes, MusicNotesSimple } from 'phosphor-react';

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
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}>
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
          padding: '22px 158px',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '27px' }}
          >
            Khang's Wrapped
          </Link>
          <div
            className="flex items-center"
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
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1" style={{ padding: '0 158px' }}>
        {/* Hero Section */}
        <section style={{ paddingTop: '108px', paddingBottom: '108px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="font-bold gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '58px',
                lineHeight: '1.2'
              }}
            >
              About Me
            </h1>
          </motion.div>
        </section>
      </main>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: '#262626',
          paddingLeft: '158px',
          paddingRight: '158px',
          paddingTop: '72px',
          paddingBottom: '36px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '58px' }}>
          {/* Left side - Message */}
          <div style={{ maxWidth: '360px' }}>
            <p style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '22px',
              fontWeight: '600',
              color: '#E8E8E3',
              lineHeight: '1.4'
            }}>
              Thanks for stopping by! Feel free to reach out if you'd like to collaborate or just chat about design and code.
            </p>
          </div>

          {/* Right side - Navigation and Connections */}
          <div style={{ display: 'flex', gap: '72px' }}>
            {/* Navigation */}
            <div>
              <h4 style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#C4B5FD',
                marginBottom: '22px'
              }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link
                  to="/"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/playlist"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  My Playlists
                </Link>
                <a
                  href="/resume/khangresume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>

            {/* Connections */}
            <div>
              <h4 style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#C4B5FD',
                marginBottom: '22px'
              }}>
                Connections
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="mailto:your.email@example.com"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '29px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)'
          }}>
            © 2026 Khang Nguyen
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.7)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            className="hover:text-[#C4B5FD] transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}

export default About;

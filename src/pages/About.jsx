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
        <section style={{ paddingTop: '108px', paddingBottom: '72px' }}>
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
                lineHeight: '1.2',
                marginBottom: '29px'
              }}
            >
              About Me
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '22px',
                lineHeight: '1.6',
                color: '#E8E8E3',
                maxWidth: '800px'
              }}
            >
              Hey there! I'm Khang, a 3rd year Computer Science student at UC San Diego with a minor in Cognitive Science. I'm passionate about creating intuitive, user-centered experiences through code and design.
            </p>
          </motion.div>
        </section>

        {/* Bio Section */}
        <section style={{ paddingBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              backgroundColor: 'rgba(78, 74, 92, 0.2)',
              border: '1px solid rgba(196, 181, 253, 0.3)',
              borderRadius: '14px',
              padding: '43px'
            }}
          >
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '32px',
                color: '#C4B5FD',
                marginBottom: '22px'
              }}
            >
              My Story
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#E8E8E3',
                marginBottom: '14px'
              }}
            >
              I'm driven by the intersection of technology and human experience. Whether I'm building full-stack applications or designing user interfaces, I focus on creating solutions that are not just functional, but delightful to use.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#E8E8E3'
              }}
            >
              When I'm not coding or designing, you'll find me exploring new music (153,601 minutes on Spotify last year!), experimenting with new tech stacks, or working on side projects that push my creative and technical boundaries.
            </p>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section style={{ paddingBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '32px',
                color: '#E8E8E3',
                marginBottom: '29px'
              }}
            >
              Tech Stack
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px' }}>
              {/* Frontend */}
              <div
                style={{
                  backgroundColor: 'rgba(78, 74, 92, 0.2)',
                  border: '1px solid rgba(196, 181, 253, 0.3)',
                  borderRadius: '14px',
                  padding: '29px'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    color: '#C4B5FD',
                    marginBottom: '14px',
                    fontWeight: '600'
                  }}
                >
                  Frontend
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind', 'Framer Motion'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        padding: '5px 13px',
                        backgroundColor: 'rgba(196, 181, 253, 0.15)',
                        border: '1px solid #9D92C8',
                        borderRadius: '18px',
                        color: '#E8E8E3'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Design */}
              <div
                style={{
                  backgroundColor: 'rgba(78, 74, 92, 0.2)',
                  border: '1px solid rgba(196, 181, 253, 0.3)',
                  borderRadius: '14px',
                  padding: '29px'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    color: '#C4B5FD',
                    marginBottom: '14px',
                    fontWeight: '600'
                  }}
                >
                  Design
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Systems'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        padding: '5px 13px',
                        backgroundColor: 'rgba(196, 181, 253, 0.15)',
                        border: '1px solid #9D92C8',
                        borderRadius: '18px',
                        color: '#E8E8E3'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div
                style={{
                  backgroundColor: 'rgba(78, 74, 92, 0.2)',
                  border: '1px solid rgba(196, 181, 253, 0.3)',
                  borderRadius: '14px',
                  padding: '29px'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    color: '#C4B5FD',
                    marginBottom: '14px',
                    fontWeight: '600'
                  }}
                >
                  Backend
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Node.js', 'Python', 'Java', 'SQL', 'Firebase', 'REST APIs'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        padding: '5px 13px',
                        backgroundColor: 'rgba(196, 181, 253, 0.15)',
                        border: '1px solid #9D92C8',
                        borderRadius: '18px',
                        color: '#E8E8E3'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div
                style={{
                  backgroundColor: 'rgba(78, 74, 92, 0.2)',
                  border: '1px solid rgba(196, 181, 253, 0.3)',
                  borderRadius: '14px',
                  padding: '29px'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    color: '#C4B5FD',
                    marginBottom: '14px',
                    fontWeight: '600'
                  }}
                >
                  Tools
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Git', 'GitHub', 'VS Code', 'Vite', 'npm', 'Postman'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        padding: '5px 13px',
                        backgroundColor: 'rgba(196, 181, 253, 0.15)',
                        border: '1px solid #9D92C8',
                        borderRadius: '18px',
                        color: '#E8E8E3'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education & Fun Facts */}
        <section style={{ paddingBottom: '108px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px' }}>
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                backgroundColor: 'rgba(78, 74, 92, 0.2)',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '14px',
                padding: '43px'
              }}
            >
              <h2
                className="font-bold"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  color: '#C4B5FD',
                  marginBottom: '22px'
                }}
              >
                Education
              </h2>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '18px',
                  color: '#E8E8E3',
                  fontWeight: '600',
                  marginBottom: '7px'
                }}
              >
                University of California, San Diego
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '7px'
                }}
              >
                B.S. Computer Science
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)'
                }}
              >
                Minor in Cognitive Science
              </p>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                backgroundColor: 'rgba(78, 74, 92, 0.2)',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '14px',
                padding: '43px'
              }}
            >
              <h2
                className="font-bold"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  color: '#C4B5FD',
                  marginBottom: '22px'
                }}
              >
                Beyond Code
              </h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Music enthusiast (107 days of listening last year)',
                  'Always exploring new tech and tools',
                  'Love building side projects',
                  'Coffee > syntax errors'
                ].map((fact, index) => (
                  <li
                    key={index}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: '#E8E8E3',
                      marginBottom: '11px',
                      paddingLeft: '22px',
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#C4B5FD'
                      }}
                    >
                      ▸
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
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

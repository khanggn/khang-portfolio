import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function CaseStudy() {
  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '80px',
          padding: '24px 176px',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="text-3xl font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Khang's Wrapped
          </Link>
          <div
            className="flex items-center text-base"
            style={{ fontFamily: "'Inter', sans-serif", gap: '32px' }}
          >
            <Link to="/" className="hover:text-[#C4B5FD] transition-colors">
              Home
            </Link>
            <Link to="/#title-tracks" className="hover:text-[#C4B5FD] transition-colors">
              Featured Tracks
            </Link>
            <Link to="/playlist" className="hover:text-[#C4B5FD] transition-colors">
              Playlist
            </Link>
            <a href="#about" className="hover:text-[#C4B5FD] transition-colors">
              About
            </a>
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
      <main className="flex-1" style={{ padding: '80px 176px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <h1
            className="font-bold"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '64px',
              lineHeight: '1.2',
              marginBottom: '24px'
            }}
          >
            Case Study
          </h1>
          <div
            style={{
              height: '4px',
              width: '120px',
              backgroundColor: '#C4B5FD',
              margin: '0 auto 48px'
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '24px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}
          >
            This case study is currently in progress and will be updated throughout the quarter.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '64px',
              lineHeight: '1.6'
            }}
          >
            Check back soon for detailed insights into the design process, user research, prototyping, and final outcomes.
          </p>

          {/* Placeholder sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', textAlign: 'left', marginTop: '80px' }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#C4B5FD'
                }}
              >
                Overview
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.6'
                }}
              >
                Coming soon...
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#C4B5FD'
                }}
              >
                Problem Statement
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.6'
                }}
              >
                Coming soon...
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#C4B5FD'
                }}
              >
                Research & Design Process
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.6'
                }}
              >
                Coming soon...
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#C4B5FD'
                }}
              >
                Final Solution
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.6'
                }}
              >
                Coming soon...
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#C4B5FD'
                }}
              >
                Outcomes & Reflection
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.6'
                }}
              >
                Coming soon...
              </p>
            </div>
          </div>

          <Link
            to="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#C4B5FD',
              textDecoration: 'none',
              fontWeight: '600',
              marginTop: '80px',
              display: 'inline-block'
            }}
            className="hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

export default CaseStudy;

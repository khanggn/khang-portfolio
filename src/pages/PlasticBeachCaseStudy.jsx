import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import FooterWithSpotlight from '../components/FooterWithSpotlight';

function PlasticBeachCaseStudy() {
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
            <Link to="/about" className="hover:text-[#C4B5FD] transition-colors">
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
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
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
      <main className="flex-1">
        {/* Landing Hero — full viewport */}
        <section
          style={{
            height: 'calc(100vh - 72px)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src="/images/projects/plasticbeach-hero.jpg"
            alt="PlasticBeach hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 60%'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, #262626 100%)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: 'var(--page-padding)',
              right: 'var(--page-padding)'
            }}
          >
            <h1
              className="font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(40px, 7vw, 80px)',
                lineHeight: '1.1',
                color: '#E8E8E3'
              }}
            >
              PlasticBeach
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '16px'
              }}
            >
              Case Study
            </p>
          </motion.div>
        </section>

        {/* Case Study Content */}
        <section style={{ padding: '48px var(--page-padding) 80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >

          {/* Section divider */}
          <div
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              marginBottom: '48px'
            }}
          />

          {/* Project metadata */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              marginBottom: '24px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px'
            }}
          >
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Role</span>
              <p style={{ color: '#E8E8E3', marginTop: '4px' }}>UI/UX Designer</p>
            </div>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Team</span>
              <p style={{ color: '#E8E8E3', marginTop: '4px' }}>5 Designers</p>
            </div>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Type</span>
              <p style={{ color: '#E8E8E3', marginTop: '4px' }}>Product Design · UX Design · Web Redesign</p>
            </div>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Timeline</span>
              <p style={{ color: '#E8E8E3', marginTop: '4px' }}>Apr 2025 – Jul 2025</p>
            </div>
          </div>

          <div
            style={{
              height: '4px',
              width: '120px',
              backgroundColor: '#C4B5FD',
              marginBottom: '48px'
            }}
          />

          {/* Content sections - placeholder for now */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', textAlign: 'left', marginTop: '48px' }}>

            {/* Overview */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Overview
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                <p>
                  Plastic Beach is a 501(c)(3) nonprofit based in Encinitas, CA, facilitating soft plastic recycling across 40+ business partners and six community collection sites. Despite a clear mission and real operational impact (250,000+ pounds diverted from landfills), their materials weren't keeping up. They had no brand style guide, no consistent visual language, and two failing touchpoints:
                </p>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>A <strong style={{ color: '#C4B5FD' }}>sorting placard</strong> that business partners couldn't use effectively</li>
                  <li>A <strong style={{ color: '#C4B5FD' }}>website</strong> that left visitors confused about what Plastic Beach actually does and how to get involved</li>
                </ul>
                <p>
                  Our team of five, through Design for America at UC San Diego, took on both. We built a design system first, then applied it to the placard and the website across a 13-week project.
                </p>
              </div>
            </div>

            {/* Placard Redesign */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Placard Redesign
              </h2>

              {/* Problem */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#E8E8E3'
                  }}
                >
                  Problem
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    Business partners were placing incorrect materials in soft plastic collection bins. The existing placard, meant to guide sorting decisions at partner locations, scored 6.3/10 from users and was consistently described as text-heavy, visually overwhelming, and hard to scan under real workplace conditions.
                  </p>
                </div>

                {/* Annotated old placard */}
                <div
                  style={{
                    marginTop: '48px',
                    position: 'relative',
                    maxWidth: '55%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    overflow: 'visible'
                  }}
                >
                  {/* Image */}
                  <img
                    src="/images/projects/plasticbeach-old-placard.jpg"
                    alt="Original Plastic Beach sorting placard"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'block'
                    }}
                  />

                  {/* Annotation: Top banner - hard to read title */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="gradient-text"
                    style={{
                      position: 'absolute',
                      top: '3%',
                      left: 'calc(100% + 24px)',
                      fontFamily: "'Island Funny', sans-serif",
                      fontSize: 'clamp(10px, 1.5vw, 18px)',
                      transform: 'rotate(-4deg)',
                      whiteSpace: 'nowrap',
                      lineHeight: '1.4'
                    }}
                  >
                    Colors clash, title font <br/>is hard to read
                    {/* Line pointing to top banner */}
                  </motion.div>

                  {/* Annotation: Left side - inconsistent alignment */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    viewport={{ once: true }}
                    className="gradient-text"
                    style={{
                      position: 'absolute',
                      top: '3%',
                      right: 'calc(100% + 24px)',
                      fontFamily: "'Island Funny', sans-serif",
                      fontSize: 'clamp(10px, 1.5vw, 18px)',
                      transform: 'rotate(3deg)',
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      lineHeight: '1.4'
                    }}
                  >
                    Inconsistent spacing and <br/>alignment across sections
                  </motion.div>

                  {/* Annotation: Left side - crammed label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="gradient-text"
                    style={{
                      position: 'absolute',
                      top: '42%',
                      right: 'calc(100% + 24px)',
                      fontFamily: "'Island Funny', sans-serif",
                      fontSize: 'clamp(10px, 1.5vw, 18px)',
                      transform: 'rotate(-3deg)',
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      lineHeight: '1.4'
                    }}
                  >
                    Too many items crammed <br/>into one label
                  </motion.div>

                  {/* Annotation: Left side - too much text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="gradient-text"
                    style={{
                      position: 'absolute',
                      top: '75%',
                      right: 'calc(100% + 24px)',
                      fontFamily: "'Island Funny', sans-serif",
                      fontSize: 'clamp(10px, 1.5vw, 18px)',
                      transform: 'rotate(-2deg)',
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      lineHeight: '1.4'
                    }}
                  >
                    Too much text, <br/> too small to read
                  </motion.div>

                  {/* Annotation: Right side - overwhelming do not include */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="gradient-text"
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: 'calc(100% + 24px)',
                      fontFamily: "'Island Funny', sans-serif",
                      fontSize: 'clamp(10px, 1.5vw, 18px)',
                      transform: 'rotate(3deg)',
                      whiteSpace: 'nowrap',
                      lineHeight: '1.4'
                    }}
                  >
                    Overwhelming "Do <br/>Not Include" list
                  </motion.div>

                  {/* Annotation: Bottom right - confusing symbols */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="gradient-text"
                    style={{
                      position: 'absolute',
                      top: '80%',
                      left: 'calc(100% + 24px)',
                      fontFamily: "'Island Funny', sans-serif",
                      fontSize: 'clamp(10px, 1.5vw, 18px)',
                      transform: 'rotate(2deg)',
                      whiteSpace: 'nowrap',
                      lineHeight: '1.4'
                    }}
                  >
                    Store drop-off symbol <br/> is confusing
                  </motion.div>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#e8e8e3',
                    textAlign: 'center',
                    marginTop: '24px',
                    maxWidth: '55%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                >
                  The original sorting placard with annotations with our team's initial observations
                </p>
              </div>

              {/* Outcome */}
              <div style={{ marginTop: '64px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#E8E8E3'
                  }}
                >
                  Outcome
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    All four business partners surveyed after launch rated the redesigned placard clear and helpful. 8 out of 10 general public participants sorted plastics correctly in a task-based usability test, compared to a <strong style={{ color: '#C4B5FD' }}>6.3/10 baseline</strong> on the original. The project also produced a brand style guide giving Plastic Beach a reusable system applicable to social media and the website redesign.
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div style={{ marginTop: '64px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#E8E8E3'
                  }}
                >
                  Solution
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    A visual-first placard that removed the exhaustive "do not include" list and replaced it with a single decision rule: the <strong style={{ color: '#C4B5FD' }}>Stretch Test</strong>. Accepted plastic types display as a labeled illustration grid. A QR code routes edge-case questions to the website.
                  </p>
                </div>

                {/* Final placard image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{
                    marginTop: '48px',
                    maxWidth: '55%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                >
                  <img
                    src="/images/projects/pb-final-placard.png"
                    alt="Redesigned Plastic Beach sorting placard"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'block'
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: '#e8e8e3',
                      textAlign: 'center',
                      marginTop: '24px'
                    }}
                  >
                    The redesigned sorting placard
                  </p>
                </motion.div>
              </div>
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
        </section>

        {/* Footer Section */}
        <div style={{ padding: '0 var(--page-padding)' }}>
          <FooterWithSpotlight />
        </div>
      </main>
    </div>
  );
}

export default PlasticBeachCaseStudy;

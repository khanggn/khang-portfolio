import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FooterWithSpotlight from '../components/FooterWithSpotlight';
import Navbar from '../components/Navbar';
import NowPlaying from '../components/NowPlaying';
import OnRepeat from '../components/OnRepeat';
import BSides from '../components/BSides';

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      <Navbar activePage="about" />

      {/* Main Content */}
      <main className="flex-1" style={{ padding: '0 var(--page-padding)' }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: 'calc(100vh - 72px)',
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: 'clamp(80px, 15vh, 160px)',
            paddingBottom: 'clamp(40px, 8vh, 80px)'
          }}
        >
          <div className="about-hero-flex" style={{ display: 'flex', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'flex-start', width: '100%' }}>
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
                  marginTop: '-0.15em',
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
                  fontFamily: "'Gamja Flower', sans-serif",
                  fontSize: '22px',
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
                  fontFamily: "'Gamja Flower', sans-serif",
                  fontSize: '22px',
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
                  fontFamily: "'Gamja Flower', sans-serif",
                  fontSize: '22px',
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
                  fontFamily: "'Gamja Flower', sans-serif",
                  fontSize: '22px',
                  lineHeight: '1.6',
                  color: '#E8E8E3'
                }}
              >
                If you want someone who thinks about both the look and the feels, I'd love to connect.
              </motion.p>

            </div>

            {/* Right side - Headshot */}
            <div className="about-headshot" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  width: 'clamp(200px, 30vw, 400px)',
                  height: 'clamp(200px, 30vw, 400px)',
                }}
              >
                <img
                  src="/images/about/about-me.gif"
                  alt="Khang Nguyen"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              </motion.div>
              <NowPlaying />
            </div>
          </div>
        </section>

        {/* On Repeat Since 2018 */}
        <OnRepeat />

        {/* B-Sides */}
        <BSides />

        {/* Footer Section */}
        <FooterWithSpotlight />
      </main>
    </div>
  );
}

export default About;

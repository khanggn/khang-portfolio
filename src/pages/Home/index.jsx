import { useState, useEffect } from 'react';
import FooterWithSpotlight from '../../components/layout/FooterWithSpotlight';
import Navbar from '../../components/layout/Navbar';
import HeroSection from './HeroSection';
import TitleTracksSection from './TitleTracksSection';

function Home() {
  const [isOnWhiteSection, setIsOnWhiteSection] = useState(false);

  // Handle hash navigation on mount and scroll to top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // No hash, scroll to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Track if we're scrolled to the white section
  useEffect(() => {
    const handleScroll = () => {
      const titleTracksSection = document.getElementById('title-tracks');
      if (titleTracksSection) {
        const rect = titleTracksSection.getBoundingClientRect();
        // Check if the top of the white section is at or above the navbar (80px)
        const isInWhiteSection = rect.top <= 80 && rect.bottom > 80;
        setIsOnWhiteSection(isInWhiteSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Navbar */}
      <Navbar
        activePage="home"
        boxShadow={isOnWhiteSection
          ? '0 8px 32px rgba(196, 181, 253, 0.6), 0 0 60px rgba(196, 181, 253, 0.4)'
          : '0 8px 24px rgba(255, 255, 255, 0.08)'}
      />

      {/* Main Content - fills middle, scrollable */}
      <main className="flex-1 overflow-y-auto" style={{ padding: '0 var(--page-padding)' }}>
        <HeroSection />
        <TitleTracksSection />

        {/* Footer Section */}
        <FooterWithSpotlight />
      </main>
    </div>
  );
}

export default Home;

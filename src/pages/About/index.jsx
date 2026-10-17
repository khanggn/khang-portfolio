import { useEffect } from 'react';
import FooterWithSpotlight from '../../components/FooterWithSpotlight';
import Navbar from '../../components/Navbar';
import OnRepeat from '../../components/OnRepeat';
import BSides from '../../components/BSides';
import HeroSection from './HeroSection';

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
        <HeroSection />

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

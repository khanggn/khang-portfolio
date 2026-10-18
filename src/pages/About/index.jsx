import { useEffect } from 'react';
import FooterWithSpotlight from '../../components/layout/FooterWithSpotlight';
import Navbar from '../../components/layout/Navbar';
import OnRepeat from '../../components/about/OnRepeat';
import BSides from '../../components/about/BSides';
import Experience from '../../components/about/Experience';
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

        {/* Experience */}
        <Experience />

        {/* B-Sides */}
        <BSides />
        
        {/* On Repeat Since 2018 */}
        <OnRepeat />


        {/* Footer Section */}
        <FooterWithSpotlight />
      </main>
    </div>
  );
}

export default About;

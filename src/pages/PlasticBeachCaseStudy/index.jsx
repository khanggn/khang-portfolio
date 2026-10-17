import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import FooterWithSpotlight from '../../components/layout/FooterWithSpotlight';
import CaseStudyNavbar from '../../components/case-study/CaseStudyNavbar';
import CaseStudyHero from '../../components/case-study/CaseStudyHero';
import Sidebar from '../../components/case-study/Sidebar';
import MobileBar from '../../components/case-study/MobileBar';
import sharedStyles from '../../components/case-study/CaseStudy.module.css';
import localStyles from './PlasticBeachCaseStudy.module.css';

import GlanceSection from './GlanceSection';
import Overview from './Overview';
import PlacardRedesign from './PlacardRedesign';
import WebsiteRedesign from './WebsiteRedesign';
import Results from './Results';
import WhatIdDoDifferently from './WhatIdDoDifferently';

const styles = { ...sharedStyles, ...localStyles };

const tocSections = [
  { id: 'overview', num: '01', label: 'OVERVIEW', summary: 'A nonprofit with outdated materials.' },
  { id: 'placard-redesign', num: '02', label: 'PLACARD REDESIGN', summary: 'Fixing a confusing sorting guide.' },
  { id: 'website-redesign', num: '03', label: 'WEBSITE REDESIGN', summary: 'Rebuilding the online presence.' },
  { id: 'results', num: '04', label: 'RESULTS', summary: 'Impact and outcomes.' },
  { id: 'what-id-do-differently', num: '05', label: "WHAT I'D DO DIFFERENTLY", summary: "Lessons I'm taking forward." },
];

function PlasticBeachCaseStudy() {
  const [activeSection, setActiveSection] = useState('overview');
  const [openTooltipId, setOpenTooltipId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const prefersReduced = useReducedMotion();
  const isScrollingRef = useRef(false);
  const contentColRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // IntersectionObserver for TOC active state
  useEffect(() => {
    const ids = tocSections.map(s => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-104px 0px -60% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll progress via rAF
  useEffect(() => {
    const update = () => {
      const col = contentColRef.current;
      if (col) {
        const rect = col.getBoundingClientRect();
        const top = -rect.top;
        const total = rect.height - window.innerHeight;
        const pct = total > 0 ? Math.min(Math.max(top / total, 0), 1) * 100 : 0;
        setScrollProgress(pct);
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Track sidebar visibility for mobile bottom bar
  useEffect(() => {
    const check = () => setIsSidebarVisible(window.innerWidth > 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    isScrollingRef.current = true;
    setActiveSection(id);
    const targetTop = el.getBoundingClientRect().top + window.scrollY - 104;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, targetTop);
      isScrollingRef.current = false;
      return;
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const duration = 900;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startTop + distance * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isScrollingRef.current = false;
      }
    };
    requestAnimationFrame(step);
  }, []);

  const handlePrevSection = useCallback(() => {
    const idx = tocSections.findIndex(s => s.id === activeSection);
    if (idx > 0) scrollToSection(tocSections[idx - 1].id);
  }, [activeSection, scrollToSection]);

  const handleNextSection = useCallback(() => {
    const idx = tocSections.findIndex(s => s.id === activeSection);
    if (idx < tocSections.length - 1) scrollToSection(tocSections[idx + 1].id);
  }, [activeSection, scrollToSection]);

  return (
    <div className={`min-h-screen bg-[#262626] text-white flex flex-col ${styles.page}`}>
      <CaseStudyNavbar />

      <main className="flex-1">
        <CaseStudyHero
          image="/images/plasticbeach/hero.jpg"
          alt="PlasticBeach hero"
          title="PlasticBeach"
          subtitle="Redesigning recycling materials for a SoCal nonprofit cutting soft-plastic waste"
          subtitleClassName={styles.heroSubtitle}
        />

        {/* Case Study Content */}
        <section className={styles.caseStudySection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.caseStudyInner}
          >

          <GlanceSection
            styles={styles}
            prefersReduced={prefersReduced}
            openTooltipId={openTooltipId}
            setOpenTooltipId={setOpenTooltipId}
            scrollToSection={scrollToSection}
          />

          {/* Two-column layout: TOC sidebar + content */}
          <div className="wcasl-two-col">
            <Sidebar
              styles={styles}
              tocSections={tocSections}
              activeSection={activeSection}
              isScrollingRef={isScrollingRef}
              scrollToSection={scrollToSection}
              scrollProgress={scrollProgress}
              handlePrevSection={handlePrevSection}
              handleNextSection={handleNextSection}
            />

            {/* Content column */}
            <div className="wcasl-content-col" ref={contentColRef}>
              <Overview styles={styles} prefersReduced={prefersReduced} />
              <PlacardRedesign styles={styles} prefersReduced={prefersReduced} />
              <WebsiteRedesign styles={styles} prefersReduced={prefersReduced} />
              <Results styles={styles} />
              <WhatIdDoDifferently styles={styles} prefersReduced={prefersReduced} />
            </div>
          </div>

          </motion.div>
        </section>

        {/* Thanks for Reading + Navigation */}
        <div className={styles.thanksSection}>
          <div className={styles.thanksNav}>
            <Link
              to="/case-study/wcasl"
              aria-label="Previous case study"
              className={styles.navCircle}
            >
              <ChevronLeft size={22} />
            </Link>

            <div className={styles.thanksCenter}>
              <img
                src="/images/shared/thanks-for-reading.png"
                alt="Thanks for reading"
                className={styles.thanksImage}
              />
              <Link
                to="/"
                className={styles.homeBtn}
              >
                <Home size={15} />
                <span>Back to Home</span>
              </Link>
            </div>

            <Link
              to="/case-study/wcasl"
              aria-label="Next case study"
              className={styles.navCircle}
            >
              <ChevronRight size={22} />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footerWrapper}>
          <FooterWithSpotlight />
        </div>

        {/* Mobile bottom bar — shown when sidebar is hidden */}
        {!isSidebarVisible && createPortal(
          <MobileBar
            styles={styles}
            tocSections={tocSections}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
            handlePrevSection={handlePrevSection}
            handleNextSection={handleNextSection}
            prefersReduced={prefersReduced}
          />,
          document.body
        )}
      </main>
    </div>
  );
}

export default PlasticBeachCaseStudy;

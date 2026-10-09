import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, PenTool, AppWindow, Code } from 'lucide-react';
import { SkipBack, SkipForward } from '@phosphor-icons/react';
import FooterWithSpotlight from '../components/FooterWithSpotlight';
import PbNavbar from '../components/plasticbeach/PbNavbar';
import PbHero from '../components/plasticbeach/PbHero';
import PbPlayButton from '../components/plasticbeach/PbPlayButton';
import styles from './PlasticBeachCaseStudy.module.css';

const tocSections = [
  { id: 'overview', num: '01', label: 'OVERVIEW', summary: 'A nonprofit with outdated materials.' },
  { id: 'placard-redesign', num: '02', label: 'PLACARD REDESIGN', summary: 'Fixing a confusing sorting guide.' },
  { id: 'website-redesign', num: '03', label: 'WEBSITE REDESIGN', summary: 'Rebuilding the online presence.' },
  { id: 'results', num: '04', label: 'RESULTS', summary: 'Impact and outcomes.' },
  { id: 'what-id-do-differently', num: '05', label: "WHAT I'D DO DIFFERENTLY", summary: "Lessons I'm taking forward." },
];

function AnimatedNumber({ value, suffix = '', duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration, prefersReduced]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

function ToolChip({ icon, label, tooltip, id, isOpen, onToggle, prefersReduced, tooltipAlign = 'left' }) {
  const chipRef = useRef(null);
  const tooltipId = `tooltip-${id}`;

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e) => {
      if (chipRef.current && !chipRef.current.contains(e.target)) onToggle(null);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [isOpen, onToggle]);

  return (
    <span
      ref={chipRef}
      tabIndex={0}
      role="group"
      aria-describedby={isOpen ? tooltipId : undefined}
      onMouseEnter={() => onToggle(id)}
      onMouseLeave={() => onToggle(null)}
      onFocus={() => onToggle(id)}
      onBlur={() => onToggle(null)}
      onClick={(e) => { e.stopPropagation(); }}
      className={styles.toolChip}
      style={{
        border: isOpen ? '1px solid #C4B5FD' : '1px solid #4E4A5C',
        boxShadow: isOpen ? '0 0 11px rgba(196, 181, 253, 0.4)' : 'none',
      }}
      onKeyDown={(e) => { if (e.key === 'Escape') onToggle(null); }}
    >
      {icon}
      <span className={styles.toolChipLabel}>{label}</span>
      <span
        id={tooltipId}
        role="tooltip"
        className={styles.toolChipTooltip}
        style={{
          ...(tooltipAlign === 'right' ? { right: 0 } : { left: 0 }),
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? 'translateY(0)'
            : (prefersReduced ? 'translateY(0)' : 'translateY(4px)'),
          transition: prefersReduced
            ? 'opacity 0.01s'
            : 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        {tooltip}
      </span>
    </span>
  );
}

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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
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
      <PbNavbar />

      {/* Main Content */}
      <main className="flex-1">
        <PbHero />

        {/* Case Study Content */}
        <section className={styles.caseStudySection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.caseStudyInner}
          >

          <PbPlayButton />

          {/* Hero stats */}
          <div className={`glance-stats ${styles.glanceStats}`}>
            <div>
              <span className={`gradient-shimmer ${styles.statValue}`}>
                <AnimatedNumber value={250000} suffix="+" />
              </span>
              <span className={styles.statLabel}>
                lbs of plastic diverted
              </span>
            </div>

            <div>
              <span className={`gradient-shimmer ${styles.statValue}`}>
                <AnimatedNumber value={40} suffix="+" />
              </span>
              <span className={styles.statLabel}>
                business partners
              </span>
            </div>
          </div>

          {/* Summary + Credits side by side */}
          <div className={`glance-body ${styles.glanceBody}`}>
            {/* Problem / Solution / Impact — 60% */}
            <motion.div
              className={`glance-summary ${styles.glanceSummary}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div>
                <h3 className={styles.summaryHeading}>Problem</h3>
                <p className={styles.summaryParagraph}>Plastic Beach had no brand style guide, no consistent visual language, and two failing touchpoints: a sorting placard that business partners couldn't use effectively, and a website that left visitors confused about what the org actually does.</p>
              </div>
              <div>
                <h3 className={styles.summaryHeading}>Solution</h3>
                <p className={styles.summaryParagraph}>We built a design system first, then applied it to a visual-first sorting placard and a clearer website, across a 13-week project through Design for America at UC San Diego.</p>
              </div>
              <div>
                <h3 className={styles.summaryHeading}>Impact</h3>
                <p className={styles.summaryParagraph}>8 out of 10 participants sorted plastics correctly in usability testing (up from 6.3/10 baseline). All four surveyed business partners rated the redesigned placard clear and helpful.</p>
              </div>
            </motion.div>

            {/* Credits — compact liner notes — 40% */}
            <motion.div
              className={`glance-credits ${styles.glanceCredits}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className={styles.creditsLabel}>
                Credits
              </span>
              {[
                {
                  label: 'Role',
                  value: (
                    <a
                      href="#overview"
                      onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }}
                      className={styles.roleLink}
                    >
                      UI/UX Designer
                    </a>
                  ),
                },
                { label: 'Team', value: '5 Designers' },
                { label: 'Type', value: 'Product Design · UX Design · Web Redesign' },
                { label: 'Timeline', value: 'Apr 2025 – Jul 2025' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.35 + 0.08 * i }}
                  className={styles.creditRow}
                >
                  <span className={styles.creditLabel}>
                    {item.label}
                  </span>
                  <span className={styles.creditValue}>
                    {item.value}
                  </span>
                </motion.div>
              ))}

              {/* Built with */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.35 + 0.08 * 3 }}
                className={styles.builtWithWrapper}
              >
                <span className={styles.builtWithLabel}>
                  Built with
                </span>
                <span className={styles.builtWithChips}>
                  <ToolChip
                    id="figma"
                    icon={<PenTool size={16} strokeWidth={1.75} color="#C4B5FD" />}
                    label="Figma"
                    tooltip="Wireframes, mockups & prototypes"
                    isOpen={openTooltipId === 'figma'}
                    onToggle={setOpenTooltipId}
                    prefersReduced={prefersReduced}
                  />
                  <ToolChip
                    id="wix"
                    icon={<AppWindow size={16} strokeWidth={1.75} color="#C4B5FD" />}
                    label="Wix"
                    tooltip="Site build & content management"
                    isOpen={openTooltipId === 'wix'}
                    onToggle={setOpenTooltipId}
                    prefersReduced={prefersReduced}
                  />
                  <ToolChip
                    id="code"
                    icon={<Code size={16} strokeWidth={1.75} color="#C4B5FD" />}
                    label="Custom code"
                    tooltip="Custom HTML/CSS/JS beyond Wix's defaults"
                    isOpen={openTooltipId === 'code'}
                    onToggle={setOpenTooltipId}
                    prefersReduced={prefersReduced}
                    tooltipAlign="right"
                  />
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Two-column layout: TOC sidebar + content */}
          <div className="wcasl-two-col">
            {/* Now Playing sidebar */}
            <aside className="wcasl-toc-sidebar">
              <div className={styles.sidebarSticky}>
                <nav aria-label="Case study sections" style={{ width: '100%' }}>
                  <div className={styles.sidebarCard}>

                    {/* Section list */}
                    <ul className={styles.tocList}>
                      {tocSections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                          <li key={section.id} className={styles.tocItem}>
                            <a
                              href={`#${section.id}`}
                              aria-current={isActive ? 'true' : undefined}
                              onClick={(e) => { e.preventDefault(); if (!isScrollingRef.current) scrollToSection(section.id); }}
                              className={styles.tocLink}
                              style={{
                                paddingLeft: isActive ? '12px' : '0',
                                borderLeft: isActive ? '3px solid #C4B5FD' : '3px solid transparent',
                              }}
                            >
                              <span
                                className={styles.tocLinkText}
                                style={{
                                  color: isActive ? '#C4B5FD' : 'rgba(255,255,255,0.5)',
                                }}
                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#E8E8E3'; }}
                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                              >
                                {section.num} · {section.label}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Player controls — progress bar + prev/next */}
                    <div>
                      {/* Progress bar */}
                      <div className={styles.progressWrapper}>
                        <div
                          role="progressbar"
                          aria-valuenow={Math.round(scrollProgress)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Reading progress"
                          className={styles.progressTrack}
                        >
                          <div
                            className={styles.progressFill}
                            style={{ width: `${scrollProgress}%` }}
                          />
                        </div>
                      </div>

                      <div className={styles.playerControls}>
                        <button
                          onClick={handlePrevSection}
                          aria-label="Previous section"
                          disabled={tocSections.findIndex(s => s.id === activeSection) === 0}
                          className={styles.skipBtn}
                          style={{
                            cursor: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'default' : 'pointer',
                            color: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
                          }}
                          onMouseEnter={(e) => {
                            if (!e.currentTarget.disabled) {
                              e.currentTarget.style.color = '#C4B5FD';
                              e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.6))';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!e.currentTarget.disabled) {
                              e.currentTarget.style.color = '#E8E8E3';
                              e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))';
                            }
                          }}
                        >
                          <SkipBack size={22} weight="fill" />
                        </button>
                        <button
                          onClick={handleNextSection}
                          aria-label="Next section"
                          disabled={tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1}
                          className={styles.skipBtn}
                          style={{
                            cursor: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'default' : 'pointer',
                            color: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
                          }}
                          onMouseEnter={(e) => {
                            if (!e.currentTarget.disabled) {
                              e.currentTarget.style.color = '#C4B5FD';
                              e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.6))';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!e.currentTarget.disabled) {
                              e.currentTarget.style.color = '#E8E8E3';
                              e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))';
                            }
                          }}
                        >
                          <SkipForward size={22} weight="fill" />
                        </button>
                      </div>
                    </div>

                  </div>
                </nav>
              </div>
            </aside>

            {/* Content column */}
            <div className="wcasl-content-col" ref={contentColRef}>

          {/* Overview */}
          <div id="overview" className={styles.sectionAnchor}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Overview
            </motion.h2>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.bodyNarrow}
            >
              <div className={`${styles.sectionBody} ${styles.bodyParagraphs}`}>
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
            </motion.div>
          </div>

          {/* Placard Redesign */}
          <div id="placard-redesign" className={styles.section}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Placard Redesign
            </motion.h2>

            {/* Problem */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={styles.sectionBody}
            >
              <h3 className={styles.subsectionHeading}>Problem</h3>
              <div className={styles.bodyParagraphs}>
                <p>
                  Business partners were placing incorrect materials in soft plastic collection bins. The existing placard, meant to guide sorting decisions at partner locations, scored 6.3/10 from users and was consistently described as text-heavy, visually overwhelming, and hard to scan under real workplace conditions.
                </p>
              </div>

              {/* Annotated old placard */}
              <div className={styles.annotatedContainer}>
                <img
                  src="/images/projects/plasticbeach-old-placard.jpg"
                  alt="Original Plastic Beach sorting placard"
                  className={styles.annotatedImage}
                />

                {/* Annotation: Top right - hard to read title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`gradient-text ${styles.annotationRight}`}
                  style={{ top: '3%', transform: 'rotate(-4deg)' }}
                >
                  Colors clash, title font <br/>is hard to read
                </motion.div>

                {/* Annotation: Top left - inconsistent alignment */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  viewport={{ once: true }}
                  className={`gradient-text ${styles.annotationLeft}`}
                  style={{ top: '3%', transform: 'rotate(3deg)' }}
                >
                  Inconsistent spacing and <br/>alignment across sections
                </motion.div>

                {/* Annotation: Left - crammed label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className={`gradient-text ${styles.annotationLeft}`}
                  style={{ top: '42%', transform: 'rotate(-3deg)' }}
                >
                  Too many items crammed <br/>into one label
                </motion.div>

                {/* Annotation: Left - too much text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={`gradient-text ${styles.annotationLeft}`}
                  style={{ top: '75%', transform: 'rotate(-2deg)' }}
                >
                  Too much text, <br/> too small to read
                </motion.div>

                {/* Annotation: Right - overwhelming do not include */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className={`gradient-text ${styles.annotationRight}`}
                  style={{ top: '40%', transform: 'rotate(3deg)' }}
                >
                  Overwhelming "Do <br/>Not Include" list
                </motion.div>

                {/* Annotation: Bottom right - confusing symbols */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className={`gradient-text ${styles.annotationRight}`}
                  style={{ top: '80%', transform: 'rotate(2deg)' }}
                >
                  Store drop-off symbol <br/> is confusing
                </motion.div>
              </div>

              <p className={styles.imageCaption}>
                The original sorting placard with annotations with our team's initial observations
              </p>
            </motion.div>

            {/* Outcome */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}
            >
              <h3 className={styles.subsectionHeading}>Outcome</h3>
              <div className={styles.bodyParagraphs}>
                <p>
                  All four business partners surveyed after launch rated the redesigned placard clear and helpful. 8 out of 10 general public participants sorted plastics correctly in a task-based usability test, compared to a <strong style={{ color: '#C4B5FD' }}>6.3/10 baseline</strong> on the original. The project also produced a brand style guide giving Plastic Beach a reusable system applicable to social media and the website redesign.
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}
            >
              <h3 className={styles.subsectionHeading}>Solution</h3>
              <div className={styles.bodyParagraphs}>
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
                className={styles.annotatedContainer}
                style={{ marginTop: '48px' }}
              >
                <img
                  src="/images/projects/pb-final-placard.png"
                  alt="Redesigned Plastic Beach sorting placard"
                  className={styles.annotatedImage}
                />
                <p className={styles.imageCaption} style={{ maxWidth: '100%' }}>
                  The redesigned sorting placard
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Website Redesign — placeholder */}
          <div id="website-redesign" className={styles.section}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Website Redesign
            </motion.h2>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.bodyNarrow}
            >
              <div className={`${styles.sectionBody} ${styles.bodyParagraphs}`}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                  Coming soon — content in progress.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Results — placeholder */}
          <div id="results" className={styles.section}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Results
            </motion.h2>

            {/* Stat row */}
            <motion.div
              className={`results-stats ${styles.resultsStatRow}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.resultsStat}>
                <span className={styles.resultsStatValue}>
                  8/10
                </span>
                <span className={styles.resultsStatLabel}>
                  sorting accuracy in usability test
                </span>
              </div>

              <div className={`results-divider ${styles.resultsDivider}`} />

              <div className={styles.resultsStat}>
                <span className={styles.resultsStatValue}>
                  4/4
                </span>
                <span className={styles.resultsStatLabel}>
                  partners rated placard clear
                </span>
              </div>

              <div className={`results-divider ${styles.resultsDivider}`} />

              <div className={styles.resultsStat}>
                <span className={styles.resultsStatValue}>
                  1
                </span>
                <span className={styles.resultsStatLabel}>
                  brand style guide delivered
                </span>
              </div>
            </motion.div>

            <ul className={styles.resultsBullets}>
              <li>Sorting accuracy improved from 6.3/10 to 8/10 in task-based usability tests</li>
              <li>All four surveyed business partners rated the redesigned placard clear and helpful</li>
              <li>Brand style guide gives Plastic Beach a reusable system for social media and future materials</li>
            </ul>
          </div>

          {/* What I'd Do Differently — placeholder */}
          <div id="what-id-do-differently" className={styles.section}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What I'd Do Differently
            </motion.h2>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.bodyNarrow}
            >
              <div className={`${styles.sectionBody} ${styles.bodyParagraphs}`}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                  Coming soon — content in progress.
                </p>
              </div>
            </motion.div>
          </div>

            </div>{/* close content column */}
          </div>{/* close two-col wrapper */}

        </motion.div>
        </section>

        {/* Thanks for Reading + Navigation */}
        <div className={styles.thanksSection}>
          <div className={styles.thanksNav}>
            {/* Previous case study */}
            <Link
              to="/case-study/wcasl"
              aria-label="Previous case study"
              className={styles.navCircle}
            >
              <ChevronLeft size={22} />
            </Link>

            {/* Ditto image + Home button stacked */}
            <div className={styles.thanksCenter}>
              <img
                src="/images/projects/thanks-for-reading.png"
                alt="Thanks for reading"
                className={styles.thanksImage}
              />
              {/* Home button */}
              <Link
                to="/"
                className={styles.homeBtn}
              >
                <Home size={15} />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Next case study */}
            <Link
              to="/case-study/wcasl"
              aria-label="Next case study"
              className={styles.navCircle}
            >
              <ChevronRight size={22} />
            </Link>
          </div>
        </div>

        {/* Footer Section */}
        <div className={styles.footerWrapper}>
          <FooterWithSpotlight />
        </div>

      {/* Mobile bottom bar — shown when sidebar is hidden */}
      {!isSidebarVisible && createPortal(
        <div className={`wcasl-mobile-bar ${styles.mobileBar}`}>
          {/* Prev */}
          <button
            onClick={handlePrevSection}
            aria-label="Previous section"
            disabled={tocSections.findIndex(s => s.id === activeSection) === 0}
            className={styles.mobileBarBtn}
            style={{
              cursor: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'default' : 'pointer',
              color: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
            }}
          >
            <SkipBack size={18} weight="fill" />
          </button>

          {/* Section name + progress */}
          <div className={styles.mobileBarSection}>
            <span className={styles.mobileBarLabel}>
              {tocSections.find(s => s.id === activeSection)?.label || ''}
            </span>
            <div
              role="progressbar"
              aria-valuenow={Math.round(scrollProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Reading progress"
              className={styles.mobileBarProgress}
            >
              <div
                className={styles.mobileBarProgressFill}
                style={{
                  width: `${scrollProgress}%`,
                  transition: prefersReduced ? 'none' : 'width 0.15s linear',
                }}
              />
            </div>
          </div>

          {/* Next */}
          <button
            onClick={handleNextSection}
            aria-label="Next section"
            disabled={tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1}
            className={styles.mobileBarBtn}
            style={{
              cursor: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'default' : 'pointer',
              color: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
            }}
          >
            <SkipForward size={18} weight="fill" />
          </button>
        </div>,
        document.body
      )}
      </main>
    </div>
  );
}

export default PlasticBeachCaseStudy;

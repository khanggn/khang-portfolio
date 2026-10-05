import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight, ArrowDown, PenTool, AppWindow, Code, Home } from 'lucide-react';
import { SkipBack, SkipForward, MusicNote, MusicNotes, MusicNotesSimple } from '@phosphor-icons/react';
import FooterWithSpotlight from '../components/FooterWithSpotlight';
import ScreenshotPanel from '../components/ScreenshotPanel';
import ImageToggle from '../components/ImageToggle';
import ShowcasePanel from '../components/ShowcasePanel';
import BrowserFrame from '../components/BrowserFrame';
import WcaslNavbar from '../components/wcasl/WcaslNavbar';
import WcaslHero from '../components/wcasl/WcaslHero';
import WcaslPlayButton from '../components/wcasl/WcaslPlayButton';
import styles from './WCASLCaseStudy.module.css';

const problemSlides = [
  {
    src: '/images/projects/wcasl-old-divisions.png',
    label: 'Divisions Page',
    alt: 'Old WCASL Divisions page',
  },
  {
    src: '/images/projects/wcasl-old-home.png',
    label: 'Home Page',
    alt: 'Old WCASL Homepage',
  },
  {
    src: '/images/projects/wcasl-old-about.png',
    label: 'About Page',
    alt: 'Old WCASL About page',
  },
];

const learnedSlides = [
  {
    src: '/images/projects/wcasl-health-articles.png',
    label: 'Article Previews',
    alt: 'Health & Wellness page with embedded article previews',
  },
  {
    src: '/images/projects/wcasl-health-reels.png',
    label: 'Instagram Reels Carousel',
    alt: 'Health & Wellness page with Instagram Reels carousel',
  },
];

const decision01Slides = [
  {
    src: '/images/projects/wcasl-registration-before.png',
    label: 'Before: AREENA App Banner',
    alt: 'Old WCASL registration flow sending users to the AREENA app',
  },
  {
    src: '/images/projects/wcasl-registration-after.png',
    label: 'After: New Registration Page',
    alt: 'New WCASL step-by-step registration page for new and returning players',
  },
];

const decision04Slides = [
  {
    src: '/images/projects/wcasl-palette-initial.png',
    label: 'Initial Color Palette',
    alt: 'Initial WCASL color palette derived from the league logo',
  },
  {
    src: '/images/projects/wcasl-palette-final.png',
    label: 'Approved Branding Style',
    alt: 'Final approved WCASL branding style and color palette',
  },
];

const decision02Slides = [
  {
    src: '/images/projects/wcasl-game-sheet.png',
    label: 'Recordings Spreadsheet',
    alt: 'Google Sheet listing WCASL game recordings with teams, dates, and fields',
  },
  {
    src: '/images/projects/wcasl-game-cards.png',
    label: 'Game Video Page',
    alt: 'Custom match cards built in Squarespace that were eventually scrapped',
  },
];

const tocSections = [
  { id: 'where-we-started', num: '01', label: 'WHERE WE STARTED', summary: 'An unfinished site for an 800+ player league.' },
  { id: 'my-role', num: '02', label: 'MY ROLE', summary: 'Research, design, and building in Squarespace.' },
  { id: 'what-i-learned', num: '03', label: 'WHAT I LEARNED', summary: 'Designing for every comfort level, and learning Squarespace.' },
  { id: 'key-decisions', num: '04', label: 'KEY DECISIONS', summary: 'Four choices that shaped the site.' },
  { id: 'ideas-that-changed', num: '05', label: 'IDEAS THAT CHANGED', summary: "Plans that shifted with the league's needs." },
  { id: 'results', num: '06', label: 'RESULTS', summary: '7,500+ visits so far in 2026.' },
  { id: 'what-id-do-differently', num: '07', label: "WHAT I'D DO DIFFERENTLY", summary: "Lessons I'm taking forward." },
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
  // Close on outside click/touch
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

      {/* Tooltip */}
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
    <div className={styles.cursorTrailContainer}>
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
            className={styles.cursorNote}
          >
            <IconComponent size={20} weight="fill" color={note.color} />
          </motion.div>
        );
      })}
    </div>
  );
}

function WCASLCaseStudy() {
  const [activeSection, setActiveSection] = useState('where-we-started');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openTooltipId, setOpenTooltipId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalReadingMin, setTotalReadingMin] = useState(0);
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

  // Lightbox keyboard handler
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

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

  // Compute reading time from content word count
  useEffect(() => {
    const col = contentColRef.current;
    if (!col) return;
    const text = col.textContent || '';
    const words = text.trim().split(/\s+/).length;
    setTotalReadingMin(Math.max(1, Math.round(words / 230)));
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
      <MusicCursorTrail />
      <WcaslNavbar />

      {/* Main Content */}
      <main className="flex-1">
        <WcaslHero />

        {/* Case Study Content */}
        <section className={styles.caseStudySection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.caseStudyInner}
          >

          <WcaslPlayButton />

          {/* Hero stats */}
          <div className={`glance-stats ${styles.glanceStats}`}>
            <div>
              <span className={`gradient-shimmer ${styles.statValue}`}>
                <AnimatedNumber value={7500} suffix="+" />
              </span>
              <span className={styles.statLabel}>
                site visits in 2026
              </span>
            </div>

            <div>
              <span className={`gradient-shimmer ${styles.statValue}`}>
                <AnimatedNumber value={800} suffix="+" />
              </span>
              <span className={styles.statLabel}>
                players served
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
                <p className={styles.summaryParagraph}>WCASL's old website lacked key information for both current and prospective players. Since most players are over 30, the new site also needed to be easy to navigate for people less comfortable online.</p>
              </div>
              <div>
                <h3 className={styles.summaryHeading}>Solution</h3>
                <p className={styles.summaryParagraph}>Our team rebuilt the site in Squarespace with a clearer layout and more complete information, creating one hub for both new and returning players.</p>
              </div>
              <div>
                <h3 className={styles.summaryHeading}>Impact</h3>
                <p className={styles.summaryParagraph}>Live since August 2025, the site has had 7,500+ visits so far in 2026. The league's commissioner kept three of us on after the original project ended, and we continue to maintain and expand the site.</p>
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
                      href="#my-role"
                      onClick={(e) => { e.preventDefault(); scrollToSection('my-role'); }}
                      className={styles.roleLink}
                    >
                      UI/UX Designer
                    </a>
                  ),
                },
                { label: 'Team', value: '7 designers' },
                { label: 'Type', value: 'Web Design · Product Design' },
                { label: 'Timeline', value: `${Math.max(1, (new Date().getFullYear() - 2025) * 12 + new Date().getMonth() - 3)}+ months` },
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

              {/* Built with — stacked below credits */}
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
                    id="squarespace"
                    icon={<AppWindow size={16} strokeWidth={1.75} color="#C4B5FD" />}
                    label="Squarespace"
                    tooltip="Site build & content management"
                    isOpen={openTooltipId === 'squarespace'}
                    onToggle={setOpenTooltipId}
                    prefersReduced={prefersReduced}
                  />
                  <ToolChip
                    id="code"
                    icon={<Code size={16} strokeWidth={1.75} color="#C4B5FD" />}
                    label="Custom code"
                    tooltip="Custom HTML/CSS/JS beyond Squarespace's defaults"
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

          {/* The Problem */}
          <div id="where-we-started" className={styles.sectionAnchor}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Where We Started
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
                  Dave Rice runs the West Coast Adult Soccer League (WCASL), a recreational league in South Orange County founded in 2009. It has over 800 players across four divisions: 30+ Competitive, 45+ Veterans, 55+ Senior, and Coed Recreational.
                </p>
                <p>
                  The league's old website felt unfinished and offered little beyond the basics. Some pages still had template placeholder text. The Divisions page described a basketball league in North Dallas. Dave wanted the new site to be the league's central hub, a place where current players could find what they needed and new players could learn how to join.
                </p>
                <p>
                  The audience was the other key factor. With most players over 30, the site had to be clear and easy to navigate for people less comfortable online.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.subsectionSpacing}
            >
              <ScreenshotPanel slides={problemSlides} />
            </motion.div>
          </div>

          {/* My Role */}
          <div id="my-role" className={styles.section}>
            <motion.h2
              className={`gradient-shimmer ${styles.sectionHeading}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My Role
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.roleIntro}
            >
              I worked as a UI/UX designer on a team of 7. After the original project ended in August 2025, three of us, including me, stayed on to keep improving and expanding the site.
            </motion.p>

            {/* Research and planning */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={styles.sectionBody}
            >
              <h3 className={styles.subsectionHeading}>Research and planning</h3>
              <ul className={styles.bulletList}>
                <li>Created two user personas representing the league's main audiences: a new player looking to join and a longtime player checking his weekly schedule</li>
                <li>Mapped user flows for the two main audiences: new players joining the league and current players checking their match schedule</li>
              </ul>
              <div className={styles.showcaseWrapper}>
                <ShowcasePanel>
                  <ImageToggle
                    options={[
                      {
                        label: 'Personas',
                        content: (
                          <img
                            src="/images/projects/wcasl-personas.png"
                            alt="User personas for WCASL representing a new player and a returning player"
                            className={styles.showcaseImage}
                          />
                        ),
                      },
                      {
                        label: 'User Flows',
                        content: (
                          <img
                            src="/images/projects/wcasl-userflow.png"
                            alt="User flow diagram showing paths for new and returning WCASL players"
                            className={styles.showcaseImage}
                          />
                        ),
                      },
                    ]}
                  />
                </ShowcasePanel>
              </div>
            </motion.div>

            {/* Design */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${styles.sectionBody} ${styles.subsectionSpacing}`}
            >
              <h3 className={styles.subsectionHeading}>Design</h3>
              <ul className={styles.bulletList}>
                <li>Explored color palettes to give the league a consistent visual identity</li>
                <li>Designed the navigation bar and footer, taking them from lo-fi wireframes to hi-fi designs that matched the new branding</li>
              </ul>
              <div className={styles.showcaseWrapper}>
                <ShowcasePanel>
                  <ImageToggle
                    wipe
                    options={[
                      {
                        label: 'Low Fidelity',
                        content: (
                          <img
                            src="/images/projects/wcasl-lofi-home.png"
                            alt="Lo-fi wireframes of the WCASL Home, About, and Membership pages"
                            className={styles.blockImage}
                          />
                        ),
                      },
                      {
                        label: 'High Fidelity',
                        content: (
                          <img
                            src="/images/projects/wcasl-hifi-home.png"
                            alt="Hi-fi designs of the WCASL Home, About, and Membership pages"
                            className={styles.blockImage}
                          />
                        ),
                      },
                    ]}
                  />
                </ShowcasePanel>
              </div>
            </motion.div>

            {/* Build and maintenance */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${styles.sectionBody} ${styles.subsectionSpacing}`}
            >
              <h3 className={styles.subsectionHeading}>Build and maintenance</h3>
              <ul className={styles.bulletList}>
                <li>Built our hi-fi designs in Squarespace for launch</li>
                <li>Since launch, I've maintained the site with two teammates and added new pages, including Health &amp; Wellness, Donate, and Contact</li>
                <li>The design kept evolving after hi-fi. Iteration and feedback from the league shaped the live site, so it differs from our original designs</li>
              </ul>
              <div className={styles.showcaseWrapper}>
                <ShowcasePanel equalPadding>
                  <img
                    src="/images/projects/wcasl-live-home.png"
                    alt="Live WCASL website screenshots of the Home, About, and Membership pages"
                    className={styles.blockImage}
                  />
                </ShowcasePanel>
              </div>
            </motion.div>
          </div>

          {/* What I Learned Along the Way */}
          <div id="what-i-learned" className={styles.section}>
            <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
              What I Learned Along the Way
            </h2>

            {/* Subsection 1 — full-width layout */}
            <div className={styles.sectionBody}>
              <h3 className={styles.subsectionHeading}>
                Clear enough to act on, simple enough for everyone
              </h3>
              <p className={styles.learnedParagraph}>
                Every page needed enough detail that players knew exactly what to do next, while staying simple enough for someone who rarely uses websites. Finding that balance was one of the biggest challenges of the project.
              </p>
              <p className={styles.learnedParagraph}>Two changes made the biggest difference:</p>

              {/* Two-column takeaways */}
              <div className="learned-columns" style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                <div className={styles.learnedColumnItem}>
                  <h4 className={styles.subsectionHeadingSmall}>
                    1. Button size matches importance
                  </h4>
                  <p>The most important actions, like registering, got the largest buttons so players could get straight to what they came for.</p>
                </div>
                <div className={styles.learnedColumnItem}>
                  <h4 className={styles.subsectionHeadingSmall}>
                    2. Higher-contrast color combinations
                  </h4>
                  <p>We avoided light text on light backgrounds, a problem all over the old site, so every page stays easy to read.</p>
                </div>
              </div>

              {/* Screenshot */}
              <ShowcasePanel equalPadding>
                <BrowserFrame noControls>
                  <img
                    src="/images/projects/wcasl-new-annotated.png"
                    alt="New WCASL site with large buttons and high-contrast text highlighted"
                    className={styles.showcaseImageBordered}
                  />
                </BrowserFrame>
              </ShowcasePanel>
            </div>

            {/* Subsection 2 — full-width layout */}
            <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
              <h3 className={styles.subsectionHeading}>
                Learning Squarespace from scratch
              </h3>
              <p className={styles.learnedParagraphLg}>
                I had never used Squarespace before this project, so I learned it as I went. It made some things easy, but its layout options were limited. Squarespace does support custom code, so I used my programming background to fill the gaps. On the Health &amp; Wellness page, I embedded the clinic's articles with iframes, since Squarespace couldn't format them on its own. I also coded a custom carousel of the doctor's Instagram Reels, so interested players can see the clinic in action.
              </p>

              <ShowcasePanel>
                <ImageToggle
                  options={learnedSlides.map((slide) => ({
                    label: slide.label,
                    content: (
                      <BrowserFrame noControls>
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className={styles.showcaseImageBordered}
                        />
                      </BrowserFrame>
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>
          </div>

          {/* Key Decisions */}
          <div id="key-decisions" className={styles.section}>
            <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
              Key Decisions
            </h2>

            {/* Decision 01 */}
            <div className={styles.sectionBody}>
              <h3 className={styles.subsectionHeadingFlex}>
                1. Rebuilding registration after losing AREENA
              </h3>
              <div className={styles.decisionParagraphs}>
                <p>
                  When we started, the league ran everything through AREENA, a league management app that handled player info, payments, and schedules. The website was built around it. We embedded AREENA's schedules on the site, and anyone who wanted to register was sent to the app store to create an account.
                </p>
                <p>
                  Then we learned the league could no longer use AREENA. Everything embedded from it stopped working on a site that was already live.
                </p>
                <p>
                  We moved quickly to replace every part of the site that relied on it. The biggest change was registration. Instead of sending people to an app, we created a step-by-step registration page with separate paths for new and returning players.
                </p>
              </div>
              <ShowcasePanel>
                <ImageToggle
                  options={decision01Slides.map((slide) => ({
                    label: slide.label,
                    content: (
                      <BrowserFrame noControls>
                        <img src={slide.src} alt={slide.alt} className={styles.showcaseImageBordered} />
                      </BrowserFrame>
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>

            {/* Decision 02 */}
            <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
              <h3 className={styles.subsectionHeadingFlex}>
                2. Choosing a simpler solution for game videos
              </h3>
              <div className={styles.decisionParagraphs}>
                <p>
                  The commissioner kept a Google Sheet of game recordings, listing the teams, date, and field for each match. I wanted players to be able to find and rewatch their games directly on the website instead of searching through a spreadsheet.
                </p>
                <p>
                  Squarespace had no component for this, so I built the match cards with custom code and worked on the page for about two to three months. Eventually I realized it wasn't sustainable. Squarespace can't connect to Google Sheets, so every new recording meant adding a card by hand, and the commissioner couldn't keep it updated without me.
                </p>
                <p>
                  We scrapped the page and linked directly to the Google Sheet instead. It was a less exciting solution, but one the league can maintain on its own.
                </p>
              </div>
              <ShowcasePanel>
                <ImageToggle
                  options={decision02Slides.map((slide) => ({
                    label: slide.label,
                    content: (
                      <img src={slide.src} alt={slide.alt} className={styles.showcaseImage} />
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>

            {/* Decision 03 */}
            <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
              <h3 className={styles.subsectionHeadingFlex}>
                3. Adding a Health &amp; Wellness page
              </h3>
              <div className={styles.decisionParagraphs}>
                <p>
                  WCASL partners with local health practitioners, including Goswami Clinic, a regenerative medicine clinic. The old site never mentioned them. Current players may have known, but new players had no way to find out. We saw these partnerships as a reason for someone to join, so the three of us proposed a Health &amp; Wellness page. I built the page's custom sections, including the article previews and the Instagram Reels carousel. The commissioner loved how the page turned out and is excited for more players to take advantage of these partnerships.
                </p>
              </div>
              <ShowcasePanel equalPadding>
                <img
                  src="/images/projects/wcasl-health-page.png"
                  alt="WCASL Health & Wellness page showing partnership information, article previews, and Instagram Reels carousel"
                  className={styles.blockImage}
                />
              </ShowcasePanel>
            </div>

            {/* Decision 04 */}
            <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
              <h3 className={styles.subsectionHeadingFlex}>
                4. Letting the client lead on color
              </h3>
              <div className={styles.decisionParagraphs}>
                <p>
                  We originally wanted to pull colors from the league's logo so everything would match. The team liked the idea, but the commissioner didn't like those colors, even though they came from his own logo. We could push for consistency with the logo or create a palette he was happy with. Since it's his league, we developed a new palette, which he approved.
                </p>
              </div>
              <ShowcasePanel>
                <ImageToggle
                  options={decision04Slides.map((slide) => ({
                    label: slide.label,
                    content: (
                      <img src={slide.src} alt={slide.alt} className={styles.blockImage} />
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>
          </div>

          {/* Ideas That Changed Along the Way */}
          <div id="ideas-that-changed" className={styles.section}>
            <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
              Ideas That Changed Along the Way
            </h2>
            <div
              className="ideas-cards"
              style={{ display: 'flex', alignItems: 'stretch', gap: '0px' }}
            >
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={styles.ideasCard}
              >
                <span className={styles.ideasCardLabel}>
                  At First
                </span>
                <p className={styles.ideasCardText}>
                  Early on, we suggested adding a donation page, since WCASL is a nonprofit league. The commissioner decided against it because he didn't want to ask players for money, so we set the idea aside.
                </p>
              </motion.div>

              {/* Arrow */}
              <div className={`ideas-arrow ${styles.ideasArrow}`}>
                <ArrowRight className="ideas-arrow-horizontal" size={24} color="#9D92C8" />
                <ArrowDown className="ideas-arrow-vertical" size={24} color="#9D92C8" style={{ display: 'none' }} />
              </div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={styles.ideasCard}
              >
                <span className={styles.ideasCardLabel}>
                  Later
                </span>
                <p className={styles.ideasCardText}>
                  After one of the league's players passed away, the commissioner asked us to create a page where the community could donate to the player's family. We built the Donate page the next day, giving the league a simple way to support the family when it mattered most.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Results */}
          <div id="results" className={styles.section}>
            <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
              Results
            </h2>

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
                  <AnimatedNumber value={7500} suffix="+" />
                </span>
                <span className={styles.resultsStatLabel}>
                  visits so far in 2026
                </span>
              </div>

              <div className={`results-divider ${styles.resultsDivider}`} />

              <div className={styles.resultsStat}>
                <span className={styles.resultsStatValue}>
                  <AnimatedNumber value={800} suffix="+" />
                </span>
                <span className={styles.resultsStatLabel}>
                  players across four divisions
                </span>
              </div>

              <div className={`results-divider ${styles.resultsDivider}`} />

              <div className={styles.resultsStat}>
                <span className={styles.resultsStatValue}>
                  <AnimatedNumber value={3} />
                </span>
                <span className={styles.resultsStatLabel}>
                  new pages added since launch
                </span>
              </div>
            </motion.div>

            {/* Bullets */}
            <ul className={styles.resultsBullets}>
              <li>Registration kept working after the switch away from AREENA, with clear steps for new and returning players</li>
              <li>Testimonials from current players help new visitors see the league is legit</li>
              <li>The Health &amp; Wellness page connects players with the league's health partners for the first time</li>
              <li>The commissioner kept three of us on after the original project ended, and I continue to maintain and expand the site</li>
            </ul>
          </div>

          {/* What I'd Do Differently */}
          <div id="what-id-do-differently" className={styles.section}>
            <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
              What I'd Do Differently
            </h2>

            <div>
              {/* Row 01 */}
              <motion.div
                className={`differently-row ${styles.differentlyRow}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={`differently-left ${styles.differentlyLeft}`}>
                  <span className={styles.differentlyNum}>01</span>
                  <h3 className={styles.differentlyTitle}>
                    Find another way to test when players don't respond
                  </h3>
                </div>
                <div className={`differently-right ${styles.differentlyRight}`}>
                  <p className={styles.differentlyText}>
                    We asked the commissioner to help recruit players for usability testing, but no one took part. Looking back, I should have tested with people outside the league who fit the audience, like family members or family friends over 30, so we had some feedback before launch. This problem later inspired{' '}
                    <a
                      href="https://devpost.com/software/agent-ux"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.agentuxLink}
                    >
                      AgentUX
                    </a>
                    , a hackathon project where AI agents simulate users to catch usability issues when real testers aren't available.
                  </p>
                </div>
              </motion.div>

              {/* Row 02 */}
              <motion.div
                className={`differently-row ${styles.differentlyRow}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={`differently-left ${styles.differentlyLeft}`}>
                  <span className={styles.differentlyNum}>02</span>
                  <h3 className={styles.differentlyTitle}>
                    Check what the platform can handle before building
                  </h3>
                </div>
                <div className={`differently-right ${styles.differentlyRight}`}>
                  <p className={styles.differentlyText}>
                    I spent two to three months on the game videos page before realizing Squarespace couldn't keep it updated. Now I'd ask early on whether a feature can run without me.
                  </p>
                </div>
              </motion.div>

              {/* Row 03 */}
              <motion.div
                className={`differently-row ${styles.differentlyRow}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={`differently-left ${styles.differentlyLeft}`}>
                  <span className={styles.differentlyNum}>03</span>
                  <h3 className={styles.differentlyTitle}>
                    Avoid relying on a single outside service
                  </h3>
                </div>
                <div className={`differently-right ${styles.differentlyRight}`}>
                  <p className={styles.differentlyText}>
                    When the league stopped using AREENA, a lot of the site broke at once. I'd keep essential information, like how to register, on the site itself.
                  </p>
                </div>
              </motion.div>

              {/* Row 04 */}
              <motion.div
                className={`differently-row ${styles.differentlyRowLast}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className={`differently-left ${styles.differentlyLeft}`}>
                  <span className={styles.differentlyNum}>04</span>
                  <h3 className={styles.differentlyTitle}>
                    Get the client's input earlier
                  </h3>
                </div>
                <div className={`differently-right ${styles.differentlyRight}`}>
                  <p className={styles.differentlyText}>
                    We built a palette around the logo before checking how the commissioner felt about those colors. Asking first would have saved us a round of work.
                  </p>
                </div>
              </motion.div>
            </div>
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
              to="/case-study/plastic-beach"
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
              to="/case-study/plastic-beach"
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

      {/* Lightbox for old site image */}
      {lightboxOpen && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxOpen(false)}
          className={styles.lightboxOverlay}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className={styles.lightboxClose}
          >
            <X size={36} />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src="/images/projects/wcasl-old-site-overview.png"
            alt="Screenshots of the old WCASL Home, Divisions, and About pages"
            onClick={(e) => e.stopPropagation()}
            className={styles.lightboxImage}
          />
        </motion.div>,
        document.body
      )}

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

export default WCASLCaseStudy;

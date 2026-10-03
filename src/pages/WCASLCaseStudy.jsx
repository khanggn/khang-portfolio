import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, ArrowRight, ArrowDown, ArrowUpRight, PenTool, AppWindow, Code } from 'lucide-react';
import { SkipBack, SkipForward, Play, MusicNote, MusicNotes, MusicNotesSimple } from '@phosphor-icons/react';
import FooterWithSpotlight from '../components/FooterWithSpotlight';
import ScreenshotPanel from '../components/ScreenshotPanel';
import ImageToggle from '../components/ImageToggle';
import ShowcasePanel from '../components/ShowcasePanel';
import BrowserFrame from '../components/BrowserFrame';

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
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px 3px 7px',
        border: isOpen ? '1px solid #C4B5FD' : '1px solid #4E4A5C',
        borderRadius: '6px',
        cursor: 'default',
        position: 'relative',
        outline: 'none',
        boxShadow: isOpen ? '0 0 11px rgba(196, 181, 253, 0.4)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onKeyDown={(e) => { if (e.key === 'Escape') onToggle(null); }}
    >
      {icon}
      <span style={{ fontSize: '13px', color: '#E8E8E3' }}>{label}</span>

      {/* Tooltip */}
      <span
        id={tooltipId}
        role="tooltip"
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          ...(tooltipAlign === 'right' ? { right: 0 } : { left: 0 }),
          backgroundColor: '#262626',
          border: '1px solid #4E4A5C',
          borderRadius: '8px',
          padding: '6px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.7)',
          pointerEvents: 'none',
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? 'translateY(0)'
            : (prefersReduced ? 'translateY(0)' : 'translateY(4px)'),
          transition: prefersReduced
            ? 'opacity 0.01s'
            : 'opacity 0.15s ease, transform 0.15s ease',
          zIndex: 10,
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

function WCASLCaseStudy() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [learnedSlide, setLearnedSlide] = useState(0);
  const [d01Slide, setD01Slide] = useState(0);
  const [d02Slide, setD02Slide] = useState(0);
  const [d04Slide, setD04Slide] = useState(0);
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
  const learnedTouchStartX = useRef(0);
  const d01TouchStartX = useRef(0);
  const d02TouchStartX = useRef(0);
  const d04TouchStartX = useRef(0);


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

  const elapsedMin = Math.round((scrollProgress / 100) * totalReadingMin);

  const handleLearnedTouchStart = (e) => {
    learnedTouchStartX.current = e.touches[0].clientX;
  };

  const handleLearnedTouchEnd = (e) => {
    const diff = learnedTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setLearnedSlide((prev) => (prev + 1) % learnedSlides.length);
    } else if (diff < -50) {
      setLearnedSlide((prev) => (prev - 1 + learnedSlides.length) % learnedSlides.length);
    }
  };

  const handleD01TouchStart = (e) => { d01TouchStartX.current = e.touches[0].clientX; };
  const handleD01TouchEnd = (e) => {
    const diff = d01TouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setD01Slide((prev) => (prev + 1) % decision01Slides.length);
    else if (diff < -50) setD01Slide((prev) => (prev - 1 + decision01Slides.length) % decision01Slides.length);
  };

  const handleD02TouchStart = (e) => { d02TouchStartX.current = e.touches[0].clientX; };
  const handleD02TouchEnd = (e) => {
    const diff = d02TouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setD02Slide((prev) => (prev + 1) % decision02Slides.length);
    else if (diff < -50) setD02Slide((prev) => (prev - 1 + decision02Slides.length) % decision02Slides.length);
  };

  const handleD04TouchStart = (e) => { d04TouchStartX.current = e.touches[0].clientX; };
  const handleD04TouchEnd = (e) => {
    const diff = d04TouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setD04Slide((prev) => (prev + 1) % decision04Slides.length);
    else if (diff < -50) setD04Slide((prev) => (prev - 1 + decision04Slides.length) % decision04Slides.length);
  };

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      <MusicCursorTrail />
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
        {/* Landing Hero — 70vh so metadata peeks in */}
        <section
          style={{
            height: 'calc(100vh - 72px)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '-1px'
          }}
        >
          <img
            src="/images/projects/wcaslPhotoCS.png"
            alt="West Coast Adult Soccer League hero"
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
              West Coast Adult Soccer League
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '16px'
              }}
            >
              Website redesign for a recreational soccer league in South Orange County
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

          {/* Play button — links to live site */}
          <div style={{ marginBottom: '32px' }}>
            <a
              href="https://www.wcasl.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="wcasl-play-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50px',
                backgroundColor: '#C4B5FD',
                boxShadow: '0 4px 12px rgba(196, 181, 253, 0.5)',
                cursor: 'pointer',
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'width 0.3s ease, box-shadow 0.3s ease',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.width = '180px';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(196, 181, 253, 0.6)';
                e.currentTarget.querySelector('.play-label').style.opacity = '1';
                e.currentTarget.querySelector('.play-label').style.maxWidth = '100px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.width = '56px';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(196, 181, 253, 0.5)';
                e.currentTarget.querySelector('.play-label').style.opacity = '0';
                e.currentTarget.querySelector('.play-label').style.maxWidth = '0';
              }}
            >
              <Play size={24} weight="fill" color="#262626" style={{ flexShrink: 0, marginLeft: '7px' }} />
              <span
                className="play-label"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#262626',
                  opacity: 0,
                  maxWidth: '0',
                  overflow: 'hidden',
                  transition: 'opacity 0.3s ease, max-width 0.3s ease',
                }}
              >
                Go to Site
              </span>
            </a>
          </div>

          {/* Hero stats */}
          <div
            className="glance-stats"
            style={{
              display: 'flex',
              gap: '48px',
              alignItems: 'baseline',
              marginBottom: '32px',
            }}
          >
            <div>
              <span
                className="gradient-shimmer"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(40px, 6vw, 56px)',
                  fontWeight: '600',
                  display: 'block',
                  lineHeight: '1',
                }}
              >
                <AnimatedNumber value={7500} suffix="+" />
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '8px',
                  display: 'block',
                }}
              >
                site visits in 2026
              </span>
            </div>

            <div>
              <span
                className="gradient-shimmer"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(40px, 6vw, 56px)',
                  fontWeight: '600',
                  display: 'block',
                  lineHeight: '1',
                }}
              >
                <AnimatedNumber value={800} suffix="+" />
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '8px',
                  display: 'block',
                }}
              >
                players served
              </span>
            </div>
          </div>

          {/* Summary + Credits side by side */}
          <div
            className="glance-body"
            style={{
              display: 'flex',
              gap: '48px',
              alignItems: 'flex-start',
            }}
          >
            {/* Problem / Solution / Impact — 60% */}
            <motion.div
              className="glance-summary"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                flex: '0 0 60%',
                minWidth: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#E8E8E3',
                lineHeight: '1.6',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <h3 style={{ fontWeight: '700', marginBottom: '6px', color: '#C4B5FD', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Problem</h3>
                <p style={{ margin: 0 }}>WCASL's old website lacked key information for both current and prospective players. Since most players are over 30, the new site also needed to be easy to navigate for people less comfortable online.</p>
              </div>
              <div>
                <h3 style={{ fontWeight: '700', marginBottom: '6px', color: '#C4B5FD', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Solution</h3>
                <p style={{ margin: 0 }}>Our team rebuilt the site in Squarespace with a clearer layout and more complete information, creating one hub for both new and returning players.</p>
              </div>
              <div>
                <h3 style={{ fontWeight: '700', marginBottom: '6px', color: '#C4B5FD', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Impact</h3>
                <p style={{ margin: 0 }}>Live since August 2025, the site has had 7,500+ visits so far in 2026. The league's commissioner kept three of us on after the original project ended, and we continue to maintain and expand the site.</p>
              </div>
            </motion.div>

            {/* Credits — compact liner notes — 40% */}
            <motion.div
              className="glance-credits"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                flex: '0 0 40%',
                minWidth: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Credits
              </span>
              {[
                {
                  label: 'Role',
                  value: (
                    <a
                      href="#my-role"
                      onClick={(e) => { e.preventDefault(); scrollToSection('my-role'); }}
                      style={{
                        color: '#E8E8E3',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                        paddingBottom: '1px',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#C4B5FD'; e.currentTarget.style.borderColor = '#C4B5FD'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#E8E8E3'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0, minWidth: '72px' }}>
                    {item.label}
                  </span>
                  <span style={{ color: '#E8E8E3' }}>
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
                style={{ marginTop: '4px' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  Built with
                </span>
                <span style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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
              <div style={{ position: 'sticky', top: '104px', height: 'calc(100vh - 208px)', display: 'flex', alignItems: 'center' }}>
                <nav aria-label="Case study sections" style={{ width: '100%' }}>
                  <div style={{ border: '1px solid #4E4A5C', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Section list */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {tocSections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                          <li key={section.id} style={{ marginBottom: '12px' }}>
                            <a
                              href={`#${section.id}`}
                              aria-current={isActive ? 'true' : undefined}
                              onClick={(e) => { e.preventDefault(); if (!isScrollingRef.current) scrollToSection(section.id); }}
                              style={{
                                display: 'block',
                                paddingLeft: isActive ? '12px' : '0',
                                borderLeft: isActive ? '3px solid #C4B5FD' : '3px solid transparent',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: '500',
                                  textTransform: 'uppercase', letterSpacing: '0.08em',
                                  color: isActive ? '#C4B5FD' : 'rgba(255,255,255,0.5)',
                                  transition: 'color 0.2s',
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
                      <div style={{ marginBottom: '12px' }}>
                        <div
                          role="progressbar"
                          aria-valuenow={Math.round(scrollProgress)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Reading progress"
                          style={{ width: '100%', height: '4px', backgroundColor: '#4E4A5C', borderRadius: '2px', overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #C4B5FD 0%, #E5DEFF 50%, #C4B5FD 100%)',
                              width: `${scrollProgress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                        <button
                          onClick={handlePrevSection}
                          aria-label="Previous section"
                          disabled={tocSections.findIndex(s => s.id === activeSection) === 0}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'default' : 'pointer',
                            color: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
                            padding: '8px',
                            minWidth: '40px',
                            minHeight: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s',
                            filter: 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))',
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
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'default' : 'pointer',
                            color: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
                            padding: '8px',
                            minWidth: '40px',
                            minHeight: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s',
                            filter: 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))',
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
          <div id="where-we-started" style={{ scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              Where We Started
            </h2>

            <div style={{ maxWidth: '680px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
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
            </div>

            <div style={{ marginTop: '48px' }}>
              <ScreenshotPanel slides={problemSlides} />
            </div>
          </div>

          {/* My Role */}
          <div id="my-role" style={{ marginTop: '80px', scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              My Role
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#E8E8E3',
                lineHeight: '1.6',
                maxWidth: '100%',
                marginBottom: '48px'
              }}
            >
              I worked as a UI/UX designer on a team of 7. After the original project ended in August 2025, three of us, including me, stayed on to keep improving and expanding the site.
            </p>

            {/* Research and planning */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD' }}>Research and planning</h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '680px' }}>
                <li>Created two user personas representing the league's main audiences: a new player looking to join and a longtime player checking his weekly schedule</li>
                <li>Mapped user flows for the two main audiences: new players joining the league and current players checking their match schedule</li>
              </ul>
              <div style={{ marginTop: '32px' }}>
                <ShowcasePanel>
                  <ImageToggle
                    options={[
                      {
                        label: 'Personas',
                        content: (
                          <img
                            src="/images/projects/wcasl-personas.png"
                            alt="User personas for WCASL representing a new player and a returning player"
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)',
                            }}
                          />
                        ),
                      },
                      {
                        label: 'User Flows',
                        content: (
                          <img
                            src="/images/projects/wcasl-userflow.png"
                            alt="User flow diagram showing paths for new and returning WCASL players"
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)',
                            }}
                          />
                        ),
                      },
                    ]}
                  />
                </ShowcasePanel>
              </div>
            </div>

            {/* Design */}
            <div style={{ marginTop: '48px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD' }}>Design</h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '680px' }}>
                <li>Explored color palettes to give the league a consistent visual identity</li>
                <li>Designed the navigation bar and footer, taking them from lo-fi wireframes to hi-fi designs that matched the new branding</li>
              </ul>
              <div style={{ marginTop: '32px' }}>
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
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        ),
                      },
                      {
                        label: 'High Fidelity',
                        content: (
                          <img
                            src="/images/projects/wcasl-hifi-home.png"
                            alt="Hi-fi designs of the WCASL Home, About, and Membership pages"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        ),
                      },
                    ]}
                  />
                </ShowcasePanel>
              </div>
            </div>

            {/* Build and maintenance */}
            <div style={{ marginTop: '48px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD' }}>Build and maintenance</h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '680px' }}>
                <li>Built our hi-fi designs in Squarespace for launch</li>
                <li>Since launch, I've maintained the site with two teammates and added new pages, including Health &amp; Wellness, Donate, and Contact</li>
                <li>The design kept evolving after hi-fi. Iteration and feedback from the league shaped the live site, so it differs from our original designs</li>
              </ul>
              <div style={{ marginTop: '32px' }}>
                <ShowcasePanel equalPadding>
                  <img
                    src="/images/projects/wcasl-live-home.png"
                    alt="Live WCASL website screenshots of the Home, About, and Membership pages"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </ShowcasePanel>
              </div>
            </div>
          </div>

          {/* What I Learned Along the Way */}
          <div id="what-i-learned" style={{ marginTop: '80px', scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              What I Learned Along the Way
            </h2>

            {/* Subsection 1 — full-width layout */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD' }}>
                Clear enough to act on, simple enough for everyone
              </h3>
              <p style={{ marginBottom: '16px', maxWidth: '680px' }}>
                Every page needed enough detail that players knew exactly what to do next, while staying simple enough for someone who rarely uses websites. Finding that balance was one of the biggest challenges of the project.
              </p>
              <p style={{ marginBottom: '16px', maxWidth: '680px' }}>Two changes made the biggest difference:</p>

              {/* Two-column takeaways */}
              <div
                className="learned-columns"
                style={{
                  display: 'flex',
                  gap: '24px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD', fontSize: '14px' }}>
                    1. Button size matches importance
                  </h4>
                  <p>The most important actions, like registering, got the largest buttons so players could get straight to what they came for.</p>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD', fontSize: '14px' }}>
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
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)' }}
                  />
                </BrowserFrame>
              </ShowcasePanel>
            </div>

            {/* Subsection 2 — full-width layout */}
            <div style={{ marginTop: '64px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD' }}>
                Learning Squarespace from scratch
              </h3>
              <p style={{ marginBottom: '32px', maxWidth: '680px' }}>
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
                          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)' }}
                        />
                      </BrowserFrame>
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>
          </div>

          {/* Key Decisions */}
          <div id="key-decisions" style={{ marginTop: '80px', scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              Key Decisions
            </h2>

            {/* Decision 01 */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD', display: 'flex', alignItems: 'center', gap: '12px' }}>
                1. Rebuilding registration after losing AREENA
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', maxWidth: '680px' }}>
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
                        <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)' }} />
                      </BrowserFrame>
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>

            {/* Decision 02 */}
            <div style={{ marginTop: '64px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD', display: 'flex', alignItems: 'center', gap: '12px' }}>
                2. Choosing a simpler solution for game videos
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', maxWidth: '680px' }}>
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
                      <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)' }} />
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>

            {/* Decision 03 */}
            <div style={{ marginTop: '64px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD', display: 'flex', alignItems: 'center', gap: '12px' }}>
                3. Adding a Health &amp; Wellness page
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', maxWidth: '680px' }}>
                <p>
                  WCASL partners with local health practitioners, including Goswami Clinic, a regenerative medicine clinic. The old site never mentioned them. Current players may have known, but new players had no way to find out. We saw these partnerships as a reason for someone to join, so the three of us proposed a Health &amp; Wellness page. I built the page's custom sections, including the article previews and the Instagram Reels carousel. The commissioner loved how the page turned out and is excited for more players to take advantage of these partnerships.
                </p>
              </div>
              <ShowcasePanel equalPadding>
                <img
                  src="/images/projects/wcasl-health-page.png"
                  alt="WCASL Health & Wellness page showing partnership information, article previews, and Instagram Reels carousel"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </ShowcasePanel>
            </div>

            {/* Decision 04 */}
            <div style={{ marginTop: '64px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', color: '#C4B5FD', display: 'flex', alignItems: 'center', gap: '12px' }}>
                4. Letting the client lead on color
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', maxWidth: '680px' }}>
                <p>
                  We originally wanted to pull colors from the league's logo so everything would match. The team liked the idea, but the commissioner didn't like those colors, even though they came from his own logo. We could push for consistency with the logo or create a palette he was happy with. Since it's his league, we developed a new palette, which he approved.
                </p>
              </div>
              <ShowcasePanel>
                <ImageToggle
                  options={decision04Slides.map((slide) => ({
                    label: slide.label,
                    content: (
                      <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    ),
                  }))}
                />
              </ShowcasePanel>
            </div>
          </div>

          {/* Ideas That Changed Along the Way */}
          <div id="ideas-that-changed" style={{ marginTop: '80px', scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              Ideas That Changed Along the Way
            </h2>
            <div
              className="ideas-cards"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: '0px',
              }}
            >
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  flex: 1,
                  border: '1px solid #4E4A5C',
                  borderRadius: '12px',
                  padding: '32px',
                  background: 'transparent',
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: '500', color: '#C4B5FD', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                  At First
                </span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', margin: 0 }}>
                  Early on, we suggested adding a donation page, since WCASL is a nonprofit league. The commissioner decided against it because he didn't want to ask players for money, so we set the idea aside.
                </p>
              </motion.div>

              {/* Arrow */}
              <div
                className="ideas-arrow"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 24px',
                  flexShrink: 0,
                }}
              >
                <ArrowRight className="ideas-arrow-horizontal" size={24} color="#9D92C8" />
                <ArrowDown className="ideas-arrow-vertical" size={24} color="#9D92C8" style={{ display: 'none' }} />
              </div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{
                  flex: 1,
                  border: '1px solid #4E4A5C',
                  borderRadius: '12px',
                  padding: '32px',
                  background: 'transparent',
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: '500', color: '#C4B5FD', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                  Later
                </span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', margin: 0 }}>
                  After one of the league's players passed away, the commissioner asked us to create a page where the community could donate to the player's family. We built the Donate page the next day, giving the league a simple way to support the family when it mattered most.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Results */}
          <div id="results" style={{ marginTop: '80px', scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              Results
            </h2>

            {/* Stat row */}
            <motion.div
              className="results-stats"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '48px',
              }}
            >
              <div style={{ flex: 1, textAlign: 'center', padding: '24px 0' }}>
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '56px', fontWeight: '600', color: '#C4B5FD', display: 'block', lineHeight: '1.1' }}>
                  <AnimatedNumber value={7500} suffix="+" />
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', display: 'block' }}>
                  visits so far in 2026
                </span>
              </div>

              <div className="results-divider" style={{ width: '1px', height: '80px', backgroundColor: '#4E4A5C', flexShrink: 0 }} />

              <div style={{ flex: 1, textAlign: 'center', padding: '24px 0' }}>
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '56px', fontWeight: '600', color: '#C4B5FD', display: 'block', lineHeight: '1.1' }}>
                  <AnimatedNumber value={800} suffix="+" />
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', display: 'block' }}>
                  players across four divisions
                </span>
              </div>

              <div className="results-divider" style={{ width: '1px', height: '80px', backgroundColor: '#4E4A5C', flexShrink: 0 }} />

              <div style={{ flex: 1, textAlign: 'center', padding: '24px 0' }}>
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '56px', fontWeight: '600', color: '#C4B5FD', display: 'block', lineHeight: '1.1' }}>
                  <AnimatedNumber value={3} />
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', display: 'block' }}>
                  new pages added since launch
                </span>
              </div>
            </motion.div>

            {/* Bullets */}
            <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '720px', listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>Registration kept working after the switch away from AREENA, with clear steps for new and returning players</li>
              <li>Testimonials from current players help new visitors see the league is legit</li>
              <li>The Health &amp; Wellness page connects players with the league's health partners for the first time</li>
              <li>The commissioner kept three of us on after the original project ended, and I continue to maintain and expand the site</li>
            </ul>
          </div>

          {/* What I'd Do Differently */}
          <div id="what-id-do-differently" style={{ marginTop: '80px', scrollMarginTop: '104px' }}>
            <h2
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: '600',
                marginBottom: '24px'
              }}
            >
              What I'd Do Differently
            </h2>

            <div>
              {/* Row 01 */}
              <motion.div
                className="differently-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  borderTop: '1px solid #4E4A5C',
                  padding: '32px 0',
                  display: 'flex',
                  gap: '48px',
                  alignItems: 'flex-start',
                }}
              >
                <div className="differently-left" style={{ flex: '0 0 35%', minWidth: 0 }}>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', color: '#C4B5FD', display: 'block', marginBottom: '8px' }}>01</span>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: '600', color: '#E8E8E3', lineHeight: '1.3', margin: 0 }}>
                    Find another way to test when players don't respond
                  </h3>
                </div>
                <div className="differently-right" style={{ flex: '0 0 65%', minWidth: 0 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', margin: 0, maxWidth: '640px' }}>
                    We asked the commissioner to help recruit players for usability testing, but no one took part. Looking back, I should have tested with people outside the league who fit the audience, like family members or family friends over 30, so we had some feedback before launch. This problem later inspired{' '}
                    <a
                      href="https://devpost.com/software/agent-ux"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#C4B5FD', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                    >
                      AgentUX
                    </a>
                    , a hackathon project where AI agents simulate users to catch usability issues when real testers aren't available.
                  </p>
                </div>
              </motion.div>

              {/* Row 02 */}
              <motion.div
                className="differently-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  borderTop: '1px solid #4E4A5C',
                  padding: '32px 0',
                  display: 'flex',
                  gap: '48px',
                  alignItems: 'flex-start',
                }}
              >
                <div className="differently-left" style={{ flex: '0 0 35%', minWidth: 0 }}>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', color: '#C4B5FD', display: 'block', marginBottom: '8px' }}>02</span>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: '600', color: '#E8E8E3', lineHeight: '1.3', margin: 0 }}>
                    Check what the platform can handle before building
                  </h3>
                </div>
                <div className="differently-right" style={{ flex: '0 0 65%', minWidth: 0 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', margin: 0, maxWidth: '640px' }}>
                    I spent two to three months on the game videos page before realizing Squarespace couldn't keep it updated. Now I'd ask early on whether a feature can run without me.
                  </p>
                </div>
              </motion.div>

              {/* Row 03 */}
              <motion.div
                className="differently-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  borderTop: '1px solid #4E4A5C',
                  padding: '32px 0',
                  display: 'flex',
                  gap: '48px',
                  alignItems: 'flex-start',
                }}
              >
                <div className="differently-left" style={{ flex: '0 0 35%', minWidth: 0 }}>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', color: '#C4B5FD', display: 'block', marginBottom: '8px' }}>03</span>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: '600', color: '#E8E8E3', lineHeight: '1.3', margin: 0 }}>
                    Avoid relying on a single outside service
                  </h3>
                </div>
                <div className="differently-right" style={{ flex: '0 0 65%', minWidth: 0 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', margin: 0, maxWidth: '640px' }}>
                    When the league stopped using AREENA, a lot of the site broke at once. I'd keep essential information, like how to register, on the site itself.
                  </p>
                </div>
              </motion.div>

              {/* Row 04 */}
              <motion.div
                className="differently-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  borderTop: '1px solid #4E4A5C',
                  borderBottom: '1px solid #4E4A5C',
                  padding: '32px 0',
                  display: 'flex',
                  gap: '48px',
                  alignItems: 'flex-start',
                }}
              >
                <div className="differently-left" style={{ flex: '0 0 35%', minWidth: 0 }}>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', color: '#C4B5FD', display: 'block', marginBottom: '8px' }}>04</span>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: '600', color: '#E8E8E3', lineHeight: '1.3', margin: 0 }}>
                    Get the client's input earlier
                  </h3>
                </div>
                <div className="differently-right" style={{ flex: '0 0 65%', minWidth: 0 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', margin: 0, maxWidth: '640px' }}>
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

        {/* Footer Section */}
        <div style={{ padding: '0 var(--page-padding)' }}>
          <FooterWithSpotlight />
        </div>

      {/* Lightbox for old site image */}
      {lightboxOpen && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 10000,
            padding: 'clamp(16px, 5vw, 80px)', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            style={{
              position: 'fixed', top: 'clamp(16px, 3vw, 40px)', right: 'clamp(16px, 3vw, 40px)',
              background: 'none', border: 'none', cursor: 'pointer', color: '#E8E8E3',
              opacity: 0.7, transition: 'opacity 0.2s', zIndex: 10001,
              minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
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
            style={{
              maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
              borderRadius: '14px', boxShadow: '0 0 60px rgba(196, 181, 253, 0.4)',
            }}
          />
        </motion.div>,
        document.body
      )}

      {/* Mobile bottom bar — shown when sidebar is hidden */}
      {!isSidebarVisible && createPortal(
        <div
          className="wcasl-mobile-bar"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'rgba(38, 38, 38, 0.95)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid #4E4A5C',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Prev */}
          <button
            onClick={handlePrevSection}
            aria-label="Previous section"
            disabled={tocSections.findIndex(s => s.id === activeSection) === 0}
            style={{
              background: 'none',
              border: 'none',
              cursor: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'default' : 'pointer',
              color: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
              padding: '6px',
              minWidth: '36px',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SkipBack size={18} weight="fill" />
          </button>

          {/* Section name + progress */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '500',
                color: '#E8E8E3',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '6px',
              }}
            >
              {tocSections.find(s => s.id === activeSection)?.label || ''}
            </span>
            <div
              role="progressbar"
              aria-valuenow={Math.round(scrollProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Reading progress"
              style={{ width: '100%', height: '3px', backgroundColor: '#4E4A5C', borderRadius: '2px', overflow: 'hidden' }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #C4B5FD 0%, #E5DEFF 50%, #C4B5FD 100%)',
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
            style={{
              background: 'none',
              border: 'none',
              cursor: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'default' : 'pointer',
              color: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
              padding: '6px',
              minWidth: '36px',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
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

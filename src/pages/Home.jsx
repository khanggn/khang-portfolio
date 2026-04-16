import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Home as HomeIcon, Mic2, Library, Music, Download } from 'lucide-react';
import { SkipBack, SkipForward, Play, Pause, MusicNote, MusicNotes, MusicNotesSimple, ArrowRight } from 'phosphor-react';

const roles = [
  "Frontend Developer.",
  "UI/UX Designer.",
  "Software Engineer.",
  "music enjoyer."
];

// Animated text component with random jumping animation
function JumpingText({ children, delay = 0 }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const letters = children.split('');

  useEffect(() => {
    // Start animations at random intervals (3-8 seconds)
    const startRandomAnimation = () => {
      const randomDelay = 3000 + Math.random() * 5000;
      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          startRandomAnimation(); // Schedule next animation
        }, 400 + (letters.length * 50)); // Animation duration
      }, randomDelay + delay);
    };

    startRandomAnimation();
  }, [letters.length, delay]);

  return (
    <span style={{ display: 'inline-block', color: '#C4B5FD' }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block' }}
          animate={isAnimating ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: "easeInOut"
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}

// Animated counter component
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure we hit exact target
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

// Music note cursor trail component
function MusicCursorTrail() {
  const [notes, setNotes] = useState([]);
  const noteIcons = [MusicNote, MusicNotes, MusicNotesSimple];

  useEffect(() => {
    let noteId = 0;

    const handleMouseMove = (e) => {
      // Only spawn notes occasionally (every ~50ms based on random chance)
      if (Math.random() > 0.85) {
        // Detect if mouse is over light background by checking the element's background color
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

        // Remove note after animation completes
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

const projects = [
  {
    id: 1,
    title: "West Coast Adult Soccer League",
    summary: "Designed and launched a full website for an 800+ player South OC soccer league — simple enough for schedule-checkers, smooth enough for first-time registrants.",
    types: ["Web Design", "Product Design"],
    media: "/images/projects/wcasl.mp4",
    mediaType: "video",
    date: "Apr 2025 – Present",
    links: {}
  },
  {
    id: 2,
    title: "PlasticBeach",
    summary: "Redesigned the site and recycling materials for a SoCal nonprofit cutting soft-plastic waste across 40+ retail and distribution partners.",
    types: ["Product Design", "UX Design", "Web Redesign"],
    media: "/images/projects/plasticbeach.mp4",
    mediaType: "video",
    date: "Apr 2025 - Jul 2025",
    links: {
      final: "https://drive.google.com/file/d/1_jWW9Q3IAvawfwOCGiCDSiwZu14qLN4H/view?usp=sharing",
      slides: "https://docs.google.com/presentation/d/1eZOh0YGScuLrV9li4Mf-52dDeLcBS564lIW7Wg6i3wU/edit?usp=sharing"
    }
  },
  {
    id: 3,
    title: "Coming Soon",
    summary: "More projects on the way...",
    types: ["TBA"],
    media: "",
    mediaType: null,
    date: "2025",
    links: {}
  }
];

function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isOnWhiteSection, setIsOnWhiteSection] = useState(false);
  const [isViewAllHovered, setIsViewAllHovered] = useState(false);
  const heroRef = useRef(null);
  const titleTracksRef = useRef(null);
  const titleTracksInView = useInView(titleTracksRef, {
    once: false,  // Allow reverse animation
    amount: 0.3  // Trigger when 30% of section is visible
  });

  // Handle hash navigation on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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


  // Track scroll position for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to animation values
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const filter = useTransform(blurValue, (value) => `blur(${value}px)`);

  // Role rotation
  useEffect(() => {
    // Reset index if out of bounds
    if (currentRoleIndex >= roles.length) {
      setCurrentRoleIndex(0);
    }

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentRoleIndex]);

  // Progress bar update
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // Update every 50ms
    const increment = (interval / 7000) * 100; // 7 second duration

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100; // Cap at 100
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, [isPaused]);

  // Auto-advance when progress completes
  useEffect(() => {
    if (progress >= 100 && !isPaused) {
      const timeout = setTimeout(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
        setProgress(0);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [progress, isPaused]);

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Music Note Cursor Trail */}
      <MusicCursorTrail />

      {/* Navbar - 80px height, 176px side padding, 24px vertical padding */}
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '80px',
          padding: '24px 176px',
          boxShadow: isOnWhiteSection
            ? '0 8px 32px rgba(196, 181, 253, 0.6), 0 0 60px rgba(196, 181, 253, 0.4)'
            : '0 8px 24px rgba(255, 255, 255, 0.08)',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Khang's Wrapped
          </h1>
          <div
            className="flex items-center text-base"
            style={{ fontFamily: "'Inter', sans-serif", gap: '32px' }}
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-[#C4B5FD] transition-colors"
            >
              Home
            </a>
            <a href="#about" className="hover:text-[#C4B5FD] transition-colors">
              About
            </a>
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
        </div>
      </nav>

      {/* Main Content - fills middle, scrollable */}
      <main className="flex-1 overflow-y-auto" style={{ padding: '0 176px' }}>
        {/* Hero Section - fills viewport */}
        <section
          id="home"
          ref={heroRef}
          style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <motion.div
            style={{
              filter
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '32px',
                lineHeight: '1.2',
                color: '#E8E8E3',
                marginBottom: '24px'
              }}
            >
              Hi! I'm{' '}
              <span className="italic pulsing-glow" style={{ fontWeight: '600' }}>
                Khang Nguyen
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '64px',
                height: '80px',
                lineHeight: '1.2',
                fontWeight: '700',
                marginBottom: '48px'
              }}
            >
              I am a{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block gradient-shimmer"
                  style={{
                    fontFamily: "'Clash Display', sans-serif"
                  }}
                >
                  {roles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-3xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '24px',
                lineHeight: '1.6',
                color: '#E8E8E3',
                marginBottom: '32px'
              }}
            >
              I like to <JumpingText delay={0}>design</JumpingText> and{' '}
              <JumpingText delay={1000}>code</JumpingText>. Whether it's for clients, hackathons, or just for fun, I'm always{' '}
              <JumpingText delay={2000}>building something</JumpingText>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#E8E8E3',
                marginBottom: '8px'
              }}
            >
              Computer Science <span style={{ fontSize: '24px' }}>∩</span> Cognitive Science @ UCSD
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="italic"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#E8E8E3',
                opacity: 1
              }}
            >
              fun fact: I spent <span style={{ color: '#C4B5FD' }}><AnimatedCounter target={153601} duration={5000} /></span> minutes listening to music last year (that's 107 days I could've spent learning other programming languages... but music &gt; syntax errors)
            </motion.p>
          </motion.div>
        </section>

        {/* Title Tracks Section */}
        <section
          id="title-tracks"
          ref={titleTracksRef}
          style={{
            paddingTop: '176px',
            paddingBottom: '176px',
            backgroundColor: '#E8E8E3',
            marginLeft: '-176px',
            marginRight: '-176px',
            paddingLeft: '176px',
            paddingRight: '176px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={titleTracksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ marginBottom: '48px' }}
          >
            <h3
              className="font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '64px',
                lineHeight: '1.2',
                color: '#262626',
                fontWeight: '700'
              }}
            >
              Featured Tracks
            </h3>
          </motion.div>

          {/* Large Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={titleTracksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setIsCardHovered(true)}
                onHoverEnd={() => setIsCardHovered(false)}
                whileHover={{
                  scale: 1.02
                }}
                style={{
                  backgroundColor: '#262626',
                  borderRadius: '12px',
                  padding: '48px',
                  marginBottom: '48px',
                  cursor: 'pointer'
                }}
              >
              <div style={{ display: 'flex', gap: '48px', alignItems: 'start' }}>
                {/* Project Media (Image or Video) */}
                <motion.div
                  style={{
                    width: '400px',
                    height: '400px',
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {projects[currentProjectIndex].media ? (
                    projects[currentProjectIndex].mediaType === 'video' ? (
                      <motion.video
                        src={projects[currentProjectIndex].media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        animate={{ scale: isCardHovered ? 1.4 : 1.3 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <motion.img
                        src={projects[currentProjectIndex].media}
                        alt={projects[currentProjectIndex].title}
                        animate={{ scale: isCardHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )
                  ) : (
                    <span
                      style={{
                        fontSize: '80px',
                        fontWeight: 'bold',
                        color: '#C4B5FD',
                        fontFamily: "'Clash Display', sans-serif"
                      }}
                    >
                      0{projects[currentProjectIndex].id}
                    </span>
                  )}
                </motion.div>

                {/* Project Info */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '400px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4
                      className="gradient-text"
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: '64px',
                        fontWeight: '700',
                        marginBottom: '32px',
                        lineHeight: '1.2'
                      }}
                    >
                      {projects[currentProjectIndex].title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '18px',
                        color: '#ffffff',
                        lineHeight: '1.6',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                      }}
                    >
                      {projects[currentProjectIndex].summary.replace(' — ', ' ')}
                    </p>
                  </div>

                  {/* Bottom row: Type tags on left, View More on right - aligned with image bottom */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    {/* Type tags - left side */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {projects[currentProjectIndex].types.map((type) => (
                        <span
                          key={type}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            padding: '6px 14px',
                            backgroundColor: 'rgba(196, 181, 253, 0.15)',
                            border: '1px solid #C4B5FD',
                            borderRadius: '20px',
                            color: '#C4B5FD',
                            fontWeight: '500',
                            boxShadow: '0 0 12px rgba(196, 181, 253, 0.4)'
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* View More text - right side */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#262626',
                        cursor: 'pointer',
                        fontWeight: '600',
                        flexShrink: 0
                      }}
                      className="hover:text-[#4E4A5C] transition-colors"
                    >
                      View More →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          </motion.div>

          {/* Playback Controls */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={titleTracksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            {/* Progress Bar Row with Timestamps */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}
            >
              {/* Start timestamp */}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#4E4A5C',
                  flexShrink: 0
                }}
              >
                {projects[currentProjectIndex].date.split(/ – | - /)[0]}
              </span>

              {/* Progress Bar */}
              <div
                style={{
                  flex: 1,
                  height: '4px',
                  backgroundColor: '#4E4A5C',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #C4B5FD 0%, #E5DEFF 50%, #C4B5FD 100%)',
                    width: `${progress}%`,
                    transition: 'width 0.05s linear'
                  }}
                />
              </div>

              {/* End timestamp */}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#4E4A5C',
                  flexShrink: 0
                }}
              >
                {projects[currentProjectIndex].date.split(/ – | - /)[1] || projects[currentProjectIndex].date}
              </span>
            </div>

            {/* Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              {/* Previous Button */}
              <button
                onClick={handlePrevProject}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#262626',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4E4A5C'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#262626'}
              >
                <SkipBack size={32} weight="fill" />
              </button>

              {/* Pause/Play Button */}
              <button
                onClick={togglePause}
                style={{
                  background: '#262626',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#E8E8E3',
                  padding: '12px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isPaused ? <Play size={28} weight="fill" /> : <Pause size={28} weight="fill" />}
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextProject}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#262626',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4E4A5C'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#262626'}
              >
                <SkipForward size={32} weight="fill" />
              </button>
            </div>

            {/* View All My Work Link */}
            <motion.div
              style={{ marginTop: '48px' }}
              whileHover="hover"
              initial="rest"
            >
              <Link
                to="/playlist"
                onMouseEnter={() => setIsViewAllHovered(true)}
                onMouseLeave={() => setIsViewAllHovered(false)}
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '48px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  color: '#262626'
                }}
              >
                <span className={isViewAllHovered ? 'pulsing-glow' : ''} style={{ color: '#262626' }}>
                  View all my work
                </span>
                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 10 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ display: 'flex', color: '#262626' }}
                  className={isViewAllHovered ? 'pulsing-glow' : ''}
                >
                  <ArrowRight size={48} weight="bold" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer Section */}
        <footer
          style={{
            backgroundColor: '#262626',
            marginLeft: '-176px',
            marginRight: '-176px',
            paddingLeft: '176px',
            paddingRight: '176px',
            paddingTop: '80px',
            paddingBottom: '40px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '64px' }}>
            {/* Left side - Message */}
            <div style={{ maxWidth: '400px' }}>
              <p style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '24px',
                fontWeight: '600',
                color: '#E8E8E3',
                lineHeight: '1.4'
              }}>
                Thanks for stopping by! Feel free to reach out if you'd like to collaborate or just chat about design and code.
              </p>
            </div>

            {/* Right side - Navigation and Connections */}
            <div style={{ display: 'flex', gap: '80px' }}>
              {/* Navigation */}
              <div>
                <h4 style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#C4B5FD',
                  marginBottom: '24px'
                }}>
                  Navigation
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#title-tracks"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('title-tracks').scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Featured Tracks
                  </a>
                  <Link
                    to="/playlist"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Playlist
                  </Link>
                  <a
                    href="#about"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="/resume/khangresume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Resume
                  </a>
                </div>
              </div>

              {/* Connections */}
              <div>
                <h4 style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#C4B5FD',
                  marginBottom: '24px'
                }}>
                  Connections
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a
                    href="https://www.linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:your.email@example.com"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)'
            }}>
              © 2026 Khang Nguyen
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              className="hover:text-[#C4B5FD] transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Home;

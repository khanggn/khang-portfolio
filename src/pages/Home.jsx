import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Home as HomeIcon, Mic2, Library, Music, Download } from 'lucide-react';
import { SkipBack, SkipForward, Play, Pause, MusicNote, MusicNotes, MusicNotesSimple } from 'phosphor-react';

const roles = [
  "Frontend Developer.",
  "UI/UX Designer.",
  "Software Engineer.",
  "music enjoyer."
];

// Animated text component for hover effect
function JumpingText({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = children.split('');

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-block', color: '#c9a84c' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block' }}
          animate={isHovered ? { y: [0, -8, 0] } : { y: 0 }}
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

// Music note cursor trail component
function MusicCursorTrail() {
  const [notes, setNotes] = useState([]);
  const noteIcons = [MusicNote, MusicNotes, MusicNotesSimple];

  useEffect(() => {
    let noteId = 0;

    const handleMouseMove = (e) => {
      // Only spawn notes occasionally (every ~50ms based on random chance)
      if (Math.random() > 0.85) {
        const newNote = {
          id: noteId++,
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          direction: Math.random() > 0.5 ? 1 : -1,
          IconComponent: noteIcons[Math.floor(Math.random() * noteIcons.length)]
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
            <IconComponent size={20} weight="fill" color="#ffffff" />
          </motion.div>
        );
      })}
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: "Campus Swipe",
    role: "Frontend Developer + UI/UX Designer",
    team: "Team of 11",
    type: "SWE",
    tags: ["React", "Figma", "Game Design"],
    links: {
      live: "https://cse110-sp25-group11.github.io/card-game/",
      github: "https://github.com/cse110-sp25-group11/card-game"
    }
  },
  {
    id: 2,
    title: "Zippy",
    role: "Frontend Developer + UI/UX Designer",
    team: "Team Project",
    type: "SWE",
    tags: ["React", "Node.js", "API"],
    links: {
      github: "https://github.com/jadenseangmany/Zippy",
      devpost: "https://devpost.com/software/zippy"
    }
  },
  {
    id: 3,
    title: "PlateMate",
    role: "UI/UX Designer",
    team: "Team Project",
    type: "UI/UX",
    tags: ["Figma", "Prototyping", "User Research"],
    links: {
      figma: "https://www.figma.com/proto/9su99fyj0UFOow7y6fBi2c/PlateMate"
    }
  }
];

function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);
  const titleTracksRef = useRef(null);
  const titleTracksInView = useInView(titleTracksRef, {
    once: false,  // Allow reverse animation
    amount: 0.3  // Trigger when 30% of section is visible
  });

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

  // Project auto-advance with progress bar
  useEffect(() => {
    if (isPaused) return;

    const duration = 15000; // 15 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentProjectIndex((current) => (current + 1) % projects.length);
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, [isPaused]);

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
    <div className="min-h-screen bg-[#0a2218] text-white flex flex-col">
      {/* Music Note Cursor Trail */}
      <MusicCursorTrail />

      {/* Navbar - 80px height, 176px side padding, 24px vertical padding */}
      <nav
        className="sticky top-0 z-50 bg-[#0a2218] border-b border-white/10"
        style={{
          height: '80px',
          padding: '24px 176px',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
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
            <a href="#home" className="hover:text-[#c9a84c] transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-[#c9a84c] transition-colors">
              About
            </a>
            <a href="#title-tracks" className="hover:text-[#c9a84c] transition-colors">
              Title Tracks
            </a>
            <a href="#b-sides" className="hover:text-[#c9a84c] transition-colors">
              B-Sides
            </a>
            <a href="#resume" className="hover:text-[#c9a84c] transition-colors">
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content - fills middle, scrollable */}
      <main className="flex-1 overflow-y-auto" style={{ padding: '0 176px' }}>
        {/* Hero Section - fills viewport */}
        <section
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
                color: '#ffffff',
                marginBottom: '24px'
              }}
            >
              Hi! I'm{' '}
              <span className="italic" style={{ color: '#4a7c5f' }}>
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
                  className="inline-block"
                  style={{
                    color: '#c9a84c',
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
                color: '#ffffff',
                marginBottom: '32px'
              }}
            >
              I <JumpingText>design</JumpingText> in Figma and{' '}
              <JumpingText>code</JumpingText> in React. Whether it's for clients, hackathons, or just for fun, I'm always{' '}
              <JumpingText>building something</JumpingText>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '8px'
              }}
            >
              CS + Cognitive Science @ UCSD
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="italic"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '13px',
                lineHeight: '1.6',
                color: 'rgba(255,255,255,0.5)'
              }}
            >
              fun fact: I spent 153,601 minutes listening to music last year (that's 107 days I could've spent learning other programming languages... but music &gt; syntax errors)
            </motion.p>
          </motion.div>
        </section>

        {/* Title Tracks Section */}
        <section
          ref={titleTracksRef}
          style={{
            paddingTop: '176px',
            paddingBottom: '176px',
            backgroundColor: '#4a7c5f',
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
              className="font-semibold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '64px',
                lineHeight: '1.2'
              }}
            >
              Title Tracks
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
                style={{
                  backgroundColor: '#243D2F',
                  borderRadius: '12px',
                  padding: '48px',
                  marginBottom: '48px'
                }}
              >
              <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
                {/* Project Image/Number */}
                <div
                  style={{
                    width: '300px',
                    height: '300px',
                    backgroundColor: '#0a2218',
                    borderRadius: '8px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '80px',
                    fontWeight: 'bold',
                    color: '#c9a84c',
                    fontFamily: "'Clash Display', sans-serif"
                  }}
                >
                  0{projects[currentProjectIndex].id}
                </div>

                {/* Project Info */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: '#c9a84c',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {projects[currentProjectIndex].type} · {projects[currentProjectIndex].team}
                  </p>
                  <h4
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: '48px',
                      fontWeight: '700',
                      marginBottom: '16px',
                      lineHeight: '1.2'
                    }}
                  >
                    {projects[currentProjectIndex].title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '20px',
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '24px'
                    }}
                  >
                    {projects[currentProjectIndex].role}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    {projects[currentProjectIndex].tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          padding: '8px 16px',
                          backgroundColor: '#071230',
                          borderRadius: '20px',
                          color: 'rgba(255,255,255,0.8)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {projects[currentProjectIndex].links.live && (
                      <a
                        href={projects[currentProjectIndex].links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          padding: '12px 24px',
                          backgroundColor: '#c9a84c',
                          color: '#0a2218',
                          borderRadius: '24px',
                          textDecoration: 'none',
                          fontWeight: '600'
                        }}
                      >
                        View Live
                      </a>
                    )}
                    {projects[currentProjectIndex].links.github && (
                      <a
                        href={projects[currentProjectIndex].links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          padding: '12px 24px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          border: '2px solid #ffffff',
                          borderRadius: '24px',
                          textDecoration: 'none',
                          fontWeight: '600'
                        }}
                      >
                        GitHub
                      </a>
                    )}
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
            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#243D2F',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '16px'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: '#c9a84c',
                  width: `${progress}%`,
                  transition: 'width 0.05s linear'
                }}
              />
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
                  color: '#ffffff',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
              >
                <SkipBack size={32} weight="fill" />
              </button>

              {/* Pause/Play Button */}
              <button
                onClick={togglePause}
                style={{
                  background: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#0a2218',
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
                  color: '#ffffff',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
              >
                <SkipForward size={32} weight="fill" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Footer Section */}
        <footer
          style={{
            backgroundColor: '#0a2218',
            marginLeft: '-176px',
            marginRight: '-176px',
            paddingLeft: '176px',
            paddingRight: '176px',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            {/* Left side - Name/Brand */}
            <div>
              <h4
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}
              >
                Khang's Wrapped
              </h4>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)'
                }}
              >
                Built with React + Vite · Designed in Figma
              </p>
            </div>

            {/* Right side - Links */}
            <div style={{ display: 'flex', gap: '64px' }}>
              <div>
                <h5
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#c9a84c'
                  }}
                >
                  Navigation
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href="#home"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#title-tracks"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Title Tracks
                  </a>
                </div>
              </div>

              <div>
                <h5
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#c9a84c'
                  }}
                >
                  Connect
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none'
                    }}
                    className="hover:text-[#c9a84c] transition-colors"
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
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div
            style={{
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)'
              }}
            >
              © 2026 Khang Nguyen
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Home;

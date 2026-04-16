import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicNote, MusicNotes, MusicNotesSimple, Play, Pause, X, SpeakerHigh, SpeakerLow, SpeakerSlash } from 'phosphor-react';

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

// Scroll animation music notes component
function ScrollMusicNotes({ isScrolling, shouldSpawn }) {
  const [notes, setNotes] = useState([]);
  const noteIcons = [MusicNote, MusicNotes, MusicNotesSimple];
  const colors = ['#E8E8E3', '#C4B5FD', '#9D92C8'];

  useEffect(() => {
    if (!isScrolling && notes.length === 0) {
      return;
    }

    if (!shouldSpawn) {
      // Stop spawning but let existing notes finish
      return;
    }

    let noteId = 0;
    const spawnInterval = setInterval(() => {
      const newNotes = [];

      // Spawn 5-8 notes across the entire screen width
      const noteCount = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < noteCount; i++) {
        const id = `note-${noteId++}`;
        newNotes.push({
          id,
          x: Math.random() * window.innerWidth, // Anywhere across the screen
          y: window.innerHeight - 50 + Math.random() * 50, // Spawn at bottom of viewport
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.8,
          IconComponent: noteIcons[Math.floor(Math.random() * noteIcons.length)],
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      setNotes((prev) => {
        // Keep only recent notes to prevent memory issues
        const allNotes = [...prev, ...newNotes];
        return allNotes.slice(-60); // Keep max 60 notes
      });
    }, 100); // Spawn every 100ms

    return () => clearInterval(spawnInterval);
  }, [isScrolling, shouldSpawn]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998, width: '100vw', height: '100vh' }}>
      {notes.map((note) => {
        const IconComponent = note.IconComponent;
        return (
          <motion.div
            key={note.id}
            initial={{
              x: note.x,
              y: note.y,
              opacity: 0.9,
              scale: note.scale,
              rotate: note.rotation
            }}
            animate={{
              y: -100, // Move upward off screen
              opacity: 0,
              rotate: note.rotation + 180
            }}
            transition={{
              duration: 1,
              ease: "linear"
            }}
            style={{ position: 'absolute' }}
          >
            <IconComponent size={40} weight="fill" color={note.color} />
          </motion.div>
        );
      })}
    </div>
  );
}

const playlists = [
  {
    id: 'all',
    title: 'this is khang',
    description: 'All projects. SWE, UI/UX, and everything in between.',
    color: '#E8E8E3',
    image: '/images/projects/snorlax.jpeg',
    category: 'all',
    audio: '/audio/crazy(130bpm).mp3',
    bpm: 130,
    songName: 'CRAZY - LE SSERAFIM'
  },
  {
    id: 'swe',
    title: 'git push --force origin main',
    description: 'Full-stack development, coding projects, and technical builds.',
    color: '#E8E8E3',
    image: '/images/projects/pysduck.jpg',
    category: 'swe',
    audio: '/audio/bubblegum(105bpm).mp3',
    bpm: 105,
    songName: 'Bubble Gum - NewJeans'
  },
  {
    id: 'uiux',
    title: 'user tested, khang approved',
    description: 'Product design, UX research, and Figma prototypes.',
    color: '#E8E8E3',
    image: '/images/projects/rowlet.jpeg',
    category: 'uiux',
    audio: '/audio/Supernatural(109bpm).mp3',
    bpm: 109,
    songName: 'Supernatural - NewJeans'
  }
];

const projects = [
  {
    id: 1,
    title: 'West Coast Adult Soccer League',
    role: 'Product Designer',
    category: 'uiux',
    image: '/images/projects/wcasl.jpeg',
    startDate: 'Apr 2025',
    endDate: 'Present'
  },
  {
    id: 2,
    title: 'Plastic Beach',
    role: 'Product Designer',
    category: 'uiux',
    image: '/images/projects/plasticbeach.png',
    startDate: 'Apr 2025',
    endDate: 'Jul 2025'
  },
  {
    id: 3,
    title: 'Project Nafasi',
    role: 'Product Designer',
    category: 'uiux',
    image: '/images/projects/nafasi.png',
    startDate: 'Mar 2026',
    endDate: 'Mar 2026'
  },
  {
    id: 4,
    title: 'SnapShot',
    role: 'Software Engineer',
    category: 'swe',
    image: '/images/projects/snapshot.png',
    startDate: 'Jan 2026',
    endDate: 'Mar 2026'
  },
  {
    id: 5,
    title: 'Decidr',
    role: 'Tech Lead + Frontend Developer',
    category: 'swe',
    image: '/images/projects/decidr.png',
    startDate: 'Oct 2025',
    endDate: 'Jan 2026'
  },
  {
    id: 6,
    title: 'Campus Swipe',
    role: 'Frontend Developer',
    category: 'swe',
    image: '/images/projects/campusswipe.png',
    startDate: 'Mar 2025',
    endDate: 'Jun 2025'
  },
  {
    id: 7,
    title: 'Zippy',
    role: 'Frontend Developer',
    category: 'swe',
    image: '/images/projects/zippy.png',
    startDate: 'Apr 2025',
    endDate: 'Apr 2025'
  },
  {
    id: 8,
    title: 'AgentUX',
    role: 'Frontend Developer',
    category: 'swe',
    image: '/images/projects/agentux.svg',
    startDate: 'Apr 2026',
    endDate: 'Apr 2026'
  },
  {
    id: 9,
    title: 'Bontourismo',
    role: 'UI/UX Designer',
    category: 'uiux',
    image: '/images/projects/bontourismo.png',
    startDate: 'Mar 2025',
    endDate: 'Mar 2025'
  },
  {
    id: 10,
    title: 'PlateMate',
    role: 'UI/UX Designer',
    category: 'uiux',
    image: '/images/projects/platemate.png',
    startDate: 'Oct 2024',
    endDate: 'Jan 2025'
  },
  {
    id: 11,
    title: 'VendorDex',
    role: 'UI/UX Designer',
    category: 'uiux',
    image: '/images/projects/vendordex.png',
    startDate: 'Sep 2025',
    endDate: 'Dec 2025'
  }
];

function Playlist() {
  const [selectedPlaylist, setSelectedPlaylist] = useState('all');
  const [blurAmount, setBlurAmount] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldSpawnNotes, setShouldSpawnNotes] = useState(false);
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [audioProgress, setAudioProgress] = useState({});
  const [audioVolume, setAudioVolume] = useState(0.15);

  const audioRefs = useRef({});
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioSourcesRef = useRef({});
  const animationFrameRef = useRef(null);
  const lastBeatTime = useRef(0);
  const energyHistory = useRef([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop all audio
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Close audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioVolume(newVolume);

    // Update volume for all audio elements
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.volume = newVolume;
      }
    });
  };

  // Handle progress bar click to seek
  const handleProgressClick = (playlistId, e) => {
    const audio = audioRefs.current[playlistId];
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * audio.duration;
  };

  // Beat detection using Web Audio API with energy-based detection
  const detectBeat = () => {
    if (!analyserRef.current) {
      console.log('❌ No analyser ref, stopping detection');
      return;
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(dataArray);

    // Focus on bass and low-mid frequencies (0-250 Hz)
    const bassEnd = Math.floor(bufferLength * 0.2);
    let currentEnergy = 0;

    for (let i = 0; i < bassEnd; i++) {
      currentEnergy += dataArray[i] * dataArray[i]; // Square for energy
    }

    currentEnergy = currentEnergy / bassEnd;

    // Keep history of last 43 frames (~0.7 seconds at 60fps)
    energyHistory.current.push(currentEnergy);
    if (energyHistory.current.length > 43) {
      energyHistory.current.shift();
    }

    // Calculate average energy
    const avgEnergy = energyHistory.current.reduce((a, b) => a + b, 0) / energyHistory.current.length;

    // Detect beat if current energy is significantly higher than average
    // AND enough time has passed since last beat (prevent multiple triggers)
    const now = Date.now();
    const timeSinceLastBeat = now - lastBeatTime.current;

    // More aggressive threshold to catch actual beats, not just variations
    const energyThreshold = avgEnergy * 1.5; // 50% above average for clearer beats

    // Use BPM-based cooldown: 130 BPM = ~460ms per beat, use 400ms minimum
    const minBeatInterval = 400; // Prevents double-triggers on same beat

    // Calculate pulse intensity based on how much energy exceeds the threshold
    if (currentEnergy > energyThreshold && timeSinceLastBeat > minBeatInterval && currentEnergy > 3000) {
      // Calculate intensity from 0.6 to 1.0 based on energy ratio
      const energyRatio = Math.min(currentEnergy / energyThreshold, 2.5); // Cap at 2.5x
      const intensity = 0.6 + ((energyRatio - 1) / 1.5) * 0.4; // Maps 1-2.5x to 0.6-1.0

      console.log('🎵 BEAT!', 'Energy:', Math.round(currentEnergy), 'Avg:', Math.round(avgEnergy), 'Ratio:', (currentEnergy/avgEnergy).toFixed(2), 'Intensity:', intensity.toFixed(2));
      setPulseIntensity(intensity);
      lastBeatTime.current = now;

      // Fade out intensity over 200ms
      setTimeout(() => setPulseIntensity(0), 200);
    } else {
      // Gradually fade intensity to 0 when no beat
      setPulseIntensity(prev => Math.max(0, prev * 0.8));
    }

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(detectBeat);
  };

  // Handle play/pause button click
  const handlePlayPause = (playlistId) => {
    const audio = audioRefs.current[playlistId];

    if (!audio) return;

    if (playingPlaylist === playlistId) {
      // Pause current playlist
      audio.pause();
      setPlayingPlaylist(null);
      setPulseIntensity(0);

      // Stop beat detection
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      // Stop any currently playing audio
      if (playingPlaylist) {
        const prevAudio = audioRefs.current[playingPlaylist];
        if (prevAudio) {
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }
      }

      // Stop previous beat detection
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        console.log('✅ Audio Context created');
      }

      // Resume audio context if suspended (required by some browsers)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        console.log('▶️ Audio Context resumed');
      }

      // Create audio source and analyser if not already created for this audio element
      if (!audioSourcesRef.current[playlistId]) {
        console.log('🔧 Creating analyser for playlist:', playlistId);
        const source = audioContextRef.current.createMediaElementSource(audio);
        const analyser = audioContextRef.current.createAnalyser();

        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.7;

        source.connect(analyser);
        analyser.connect(audioContextRef.current.destination);

        audioSourcesRef.current[playlistId] = { source, analyser };
        analyserRef.current = analyser;
        console.log('✅ Analyser created and connected');
      } else {
        // Reuse existing analyser
        analyserRef.current = audioSourcesRef.current[playlistId].analyser;
        console.log('♻️ Reusing existing analyser');
      }

      // Play new audio
      audio.currentTime = 0;
      audio.volume = audioVolume;
      audio.play();
      setPlayingPlaylist(playlistId);

      console.log('🎵 Starting beat detection...');
      // Start beat detection
      detectBeat();
    }
  };

  // Track audio progress
  useEffect(() => {
    const updateProgress = () => {
      const newProgress = {};
      Object.entries(audioRefs.current).forEach(([id, audio]) => {
        if (audio && !isNaN(audio.duration)) {
          newProgress[id] = (audio.currentTime / audio.duration) * 100;
        }
      });
      setAudioProgress(newProgress);
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle playlist card click with custom slow scroll
  const handlePlaylistClick = (playlistId) => {
    // Start playing the music for this playlist if not already playing
    if (playingPlaylist !== playlistId) {
      handlePlayPause(playlistId);
    }

    const element = document.getElementById(`playlist-${playlistId}`);
    if (element) {
      setIsScrolling(true);
      setShouldSpawnNotes(true);

      // Get target position
      const targetPosition = element.offsetTop - 80; // Account for navbar height
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2000; // 2 seconds for slower scroll
      let start = null;
      let stoppedSpawning = false;

      // Custom scroll animation
      const scrollAnimation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Stop spawning at 50% progress (when unblurring starts)
        if (progress >= 0.5 && !stoppedSpawning) {
          setShouldSpawnNotes(false); // Stop spawning new notes
          stoppedSpawning = true;
        }

        // Blur control: Full blur (10px) from 0-50%, then unblur from 50-100%
        if (progress < 0.5) {
          setBlurAmount(10);
        } else {
          // Gradually reduce blur from 10px to 0px
          const unblurProgress = (progress - 0.5) / 0.5;
          setBlurAmount(10 * (1 - unblurProgress));
        }

        // Ease out cubic for smoother end
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(scrollAnimation);
        } else {
          // Ensure blur is completely removed
          setBlurAmount(0);
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(scrollAnimation);
    }
  };

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Music Note Cursor Trail */}
      <MusicCursorTrail />

      {/* Scroll Animation Music Notes */}
      <ScrollMusicNotes isScrolling={isScrolling} shouldSpawn={shouldSpawnNotes} />


      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '80px',
          padding: '24px 176px',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="text-3xl font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Khang's Wrapped
          </Link>
          <div
            className="flex items-center text-base"
            style={{ fontFamily: "'Inter', sans-serif", gap: '32px' }}
          >
            <Link to="/" className="hover:text-[#C4B5FD] transition-colors">
              Home
            </Link>
            <a href="/#about" className="hover:text-[#C4B5FD] transition-colors">
              About
            </a>
            <Link
              to="/playlist"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C4B5FD] transition-colors text-[#C4B5FD]"
            >
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

      {/* Main Content */}
      <main
        className="flex-1"
        style={{
          filter: `blur(${blurAmount}px)`
        }}
      >
        {/* Landing Section */}
        <section style={{ padding: '80px 176px 176px 176px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Page Title */}
            <h1
              className="font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '64px',
                lineHeight: '1.2',
                marginBottom: '16px'
              }}
            >
              <span className="gradient-shimmer">Discover My Projects </span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '48px',
                lineHeight: '1.6'
              }}
            >
              what i've been making instead of sleeping.
            </p>

            {/* Bordered Wrapper for Filters and Playlists */}
            <div
              style={{
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '16px',
                padding: '64px 48px',
                backgroundColor: 'rgba(78, 74, 92, 0.2)'
              }}
            >
              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
            {['all', 'swe', 'uiux'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedPlaylist(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '12px 32px',
                  borderRadius: '24px',
                  border: '2px solid #C4B5FD',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'transparent',
                  color: selectedPlaylist === filter ? '#262626' : '#C4B5FD',
                  transition: 'color 0.4s ease, border-color 0.4s ease, transform 0.2s ease',
                  zIndex: 1
                }}
              >
                {/* Background fill overlay */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: selectedPlaylist === filter ? 1 : 0
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, #C4B5FD 0%, #E5DEFF 50%, #C4B5FD 100%)',
                    borderRadius: '22px',
                    zIndex: -1
                  }}
                />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {filter === 'all' && 'ALL'}
                  {filter === 'swe' && 'SWE'}
                  {filter === 'uiux' && 'UI/UX'}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Playlist Cards Grid - Filtered */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <AnimatePresence mode="wait">
            {playlists
              .filter(playlist => selectedPlaylist === 'all' || playlist.category === selectedPlaylist)
              .map((playlist) => (
              <motion.div
                key={`${playlist.id}-${selectedPlaylist}`}
                onClick={() => handlePlaylistClick(playlist.id)}
                onMouseEnter={() => setHoveredPlaylist(playlist.id)}
                onMouseLeave={() => setHoveredPlaylist(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 8px 32px rgba(196, 181, 253, 0.4), 0 0 60px rgba(196, 181, 253, 0.3)',
                  transition: { duration: 0.2 }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: playlist.color,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: '120px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Playlist Image */}
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#4E4A5C',
                    flexShrink: 0,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={playlist.image}
                    alt={playlist.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Play Button - appears on hover */}
                  <AnimatePresence>
                    {hoveredPlaylist === playlist.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '120px',
                          height: '120px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          pointerEvents: 'none'
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: '#C4B5FD',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(196, 181, 253, 0.5)'
                          }}
                        >
                          <Play size={24} weight="fill" color="#262626" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Playlist Title & Description */}
                <div style={{ padding: '0 20px', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#262626',
                      lineHeight: '1.3',
                      marginBottom: '4px'
                    }}
                  >
                    {playlist.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      color: 'rgba(38, 38, 38, 0.7)',
                      lineHeight: '1.4'
                    }}
                  >
                    {playlist.description}
                  </p>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(196, 181, 253, 0.5) 50%, transparent 100%)',
            margin: '0 176px'
          }}
        />

        {/* Playlist Detail Sections */}
        <section style={{ padding: '0 176px 176px 176px' }}>
          {playlists.map((playlist, index) => {
            const playlistProjects = projects
              .filter(p => playlist.category === 'all' || p.category === playlist.category)
              .sort((a, b) => {
                // Convert date strings to Date objects for comparison
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                return dateB - dateA; // Most recent first
              });

            return (
              <div key={playlist.id}>
                {index > 0 && (
                  <div
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(196, 181, 253, 0.5) 50%, transparent 100%)',
                      marginTop: '120px',
                      marginBottom: '120px'
                    }}
                  />
                )}
                <motion.section
                  id={`playlist-${playlist.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  style={{
                    marginTop: index === 0 ? '120px' : '0',
                    position: 'relative'
                  }}
                >
                {/* Close/Back to Top Icon */}
                <motion.div
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    cursor: 'pointer',
                    opacity: 0.5,
                    transition: 'opacity 0.2s ease'
                  }}
                >
                  <X size={32} weight="regular" color="rgba(255, 255, 255, 0.7)" />
                </motion.div>

                {/* Playlist Header */}
                <div style={{ display: 'flex', gap: '32px', marginBottom: '48px' }}>
                  {/* Playlist Image */}
                  <div
                    style={{
                      width: '232px',
                      height: '232px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <img
                      src={playlist.image}
                      alt={playlist.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Playlist Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#E8E8E3',
                        marginBottom: '8px'
                      }}
                    >
                      Public Playlist
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: '48px',
                        fontWeight: '700',
                        color: '#E8E8E3',
                        lineHeight: '1.2',
                        marginBottom: '16px'
                      }}
                    >
                      {playlist.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.6'
                      }}
                    >
                      {playlist.description}
                    </p>
                  </div>

                  {/* Play/Pause Button */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '8px' }}>
                    <motion.button
                      onClick={() => handlePlayPause(playlist.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#C4B5FD',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(196, 181, 253, 0.4)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {playingPlaylist === playlist.id ? (
                        <Pause size={28} weight="fill" color="#262626" />
                      ) : (
                        <Play size={28} weight="fill" color="#262626" />
                      )}
                    </motion.button>
                  </div>

                  {/* Audio Element */}
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[playlist.id] = el;
                    }}
                    src={playlist.audio}
                    loop
                  />
                </div>

                {/* Progress Bar and Volume Control */}
                <div style={{ marginTop: '24px', marginBottom: '32px' }}>
                  {/* Progress Bar */}
                  <div
                    onClick={(e) => handleProgressClick(playlist.id, e)}
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}
                  >
                    <div
                      style={{
                        width: `${audioProgress[playlist.id] || 0}%`,
                        height: '100%',
                        backgroundColor: '#C4B5FD',
                        borderRadius: '3px',
                        transition: 'width 0.1s linear'
                      }}
                    />
                  </div>

                  {/* Now Playing and Volume Control */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Now Playing */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                        Now Playing:
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#C4B5FD', fontWeight: '500' }}>
                        {playlist.songName}
                      </span>
                    </div>

                    {/* Volume Control */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {audioVolume === 0 ? (
                        <SpeakerSlash size={18} weight="fill" color="rgba(255,255,255,0.5)" />
                      ) : audioVolume < 0.5 ? (
                        <SpeakerLow size={18} weight="fill" color="rgba(255,255,255,0.5)" />
                      ) : (
                        <SpeakerHigh size={18} weight="fill" color="rgba(255,255,255,0.5)" />
                      )}
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={audioVolume}
                        onChange={handleVolumeChange}
                        style={{
                          width: '100px',
                          height: '4px',
                          borderRadius: '2px',
                          outline: 'none',
                          background: `linear-gradient(to right, #C4B5FD 0%, #C4B5FD ${audioVolume * 100}%, rgba(255,255,255,0.1) ${audioVolume * 100}%, rgba(255,255,255,0.1) 100%)`,
                          cursor: 'pointer',
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Projects List */}
                <div
                  style={{
                    backgroundColor: 'rgba(78, 74, 92, 0.2)',
                    borderRadius: '8px',
                    padding: '24px',
                    maxHeight: '440px',
                    overflowY: 'auto',
                    border: playingPlaylist === playlist.id
                      ? `2px solid rgba(196, 181, 253, ${0.3 + pulseIntensity * 0.3})`
                      : '2px solid transparent',
                    boxShadow: playingPlaylist === playlist.id && pulseIntensity > 0
                      ? `0 0 ${15 + pulseIntensity * 25}px rgba(196, 181, 253, ${0.3 + pulseIntensity * 0.3}),
                         0 0 ${10 + pulseIntensity * 20}px rgba(196, 181, 253, ${0.4 + pulseIntensity * 0.2}),
                         inset 0 0 ${8 + pulseIntensity * 15}px rgba(196, 181, 253, ${0.2 + pulseIntensity * 0.3})`
                      : playingPlaylist === playlist.id
                      ? '0 0 10px rgba(196, 181, 253, 0.15)'
                      : 'none',
                    transition: 'none'
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 200px',
                      gap: '16px',
                      padding: '0 16px 16px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      marginBottom: '8px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: '500'
                      }}
                    >
                      #
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: '500'
                      }}
                    >
                      Project
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: '500',
                        textAlign: 'right'
                      }}
                    >
                      Date
                    </span>
                  </div>

                  {/* Project Rows */}
                  {playlistProjects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      whileHover={{
                        backgroundColor: 'rgba(196, 181, 253, 0.1)'
                      }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 1fr 200px',
                        gap: '16px',
                        padding: '12px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      {/* Track Number */}
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.7)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {idx + 1}
                      </span>

                      {/* Project Info */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <img
                            src={project.image}
                            alt={project.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transform: project.title === 'Project Nafasi' ? 'scale(1.8) translateX(1.5px)' : 'scale(1)'
                            }}
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '16px',
                              fontWeight: '500',
                              color: '#E8E8E3',
                              marginBottom: '4px'
                            }}
                          >
                            {project.title}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '13px',
                              color: 'rgba(255,255,255,0.5)'
                            }}
                          >
                            {project.role}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                      >
                        {project.startDate} - {project.endDate}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
              </div>
            );
          })}
        </section>
      </main>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: '#262626',
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
                <Link
                  to="/"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <a
                  href="/#title-tracks"
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
                  href="/#about"
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
    </div>
  );
}

export default Playlist;

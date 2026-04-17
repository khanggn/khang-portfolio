import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicNote, MusicNotes, MusicNotesSimple, Play, Pause, X, SpeakerHigh, SpeakerLow, SpeakerSlash, CaretDown } from 'phosphor-react';
import ProjectDetail from '../components/ProjectDetail';

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
    id: 'swe',
    title: 'git push --force origin main',
    description: 'Full-stack development, coding projects, and technical builds.',
    color: '#E8E8E3',
    image: '/images/projects/snorlax.jpeg',
    category: 'swe',
    audio: '/audio/crazy(130bpm).mp3',
    bpm: 130,
    songName: 'CRAZY - LE SSERAFIM'
  },
  {
    id: 'uiux',
    title: 'user tested, khang approved',
    description: 'Product design, UX research, and Figma prototypes.',
    color: '#E8E8E3',
    image: '/images/projects/pysduck.jpg',
    category: 'uiux',
    audio: '/audio/bubblegum(105bpm).mp3',
    bpm: 105,
    songName: 'Bubble Gum - NewJeans'
  }
];

const projects = [
  {
    id: 1,
    title: 'West Coast Adult Soccer League',
    role: 'Product Designer',
    category: 'uiux',
    image: '/images/projects/wcasl.png',
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
    endDate: 'Mar 2026',
        tags: ['Python', 'Git', 'Developer Tools', 'Diff Algorithms', 'Tkinter UI'],
    links: {
      live: '',
      github: '',
      devpost: '',
      figma: ''
    },
    description: 'Built a Git source control interface inside Python IDLE, enabling beginners to stage, commit, and visualize code changes through an interactive split-view diff editor.',
    previews: [
      { id: 1, type: 'image', src: '/images/projects/snapshotp1.jpeg', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/projects/snapshotp2.jpeg', alt: 'Preview 2' },
    ],
    keyFeatures: [
        'VS Code–style source control UI inside IDLE',
        'Side-by-side diff view with line and character highlighting',
        'Live editing with synchronized split-view updates',
        'Stage, commit, and push directly from the editor',
        'Debounced diff engine for smooth performance on large files'
    ],
    team: {
      members: ['Jaden Seangmany', 'Jonathan Ty', 'Eric Nguyen'],
      myContributions: [  
      'Developed a split-view diff editor with synchronized scrolling and real-time updates',
      'Implemented VS Code–style highlighting for line and character-level differences',
      ]
    },
    challenges: [
      {
        challenge: 'Real-time Diff Performance',
        solution: 'Debounced updates to prevent lag while typing and improve responsiveness.'
      },
      {
        challenge: 'Accurate Diff Visualization',
        solution: 'Combined line-level and character-level diffing for precise highlighting.'
      },
      {
        challenge: 'Split-View Synchronization',
        solution: 'Synced scrolling and state between panes for a seamless comparison experience.'
      }
    ]
  },
  {
    id: 5,
    title: 'Decidr',
    role: 'Tech Lead + Frontend Developer',
    category: 'swe',
    image: '/images/projects/decidr.png',
    startDate: 'Oct 2025',
    endDate: 'Jan 2026',
            tags: [  
              'React Native',
              'TypeScript',
              'Node.js',
              'REST API',
              'Mobile App'],
    links: {
      live: '',
      github: 'https://github.com/jadenseangmany/decidr',
      devpost: '',
      figma: ''
    },
    description: 'A mobile app that eliminates group indecision by recommending nearby restaurants using a rating-weighted algorithm that balances quality and credibility.',
    previews: [
      { id: 1, type: 'image', src: '/images/projects/', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/projects/', alt: 'Preview 2' },
      { id: 3, type: 'image', src: '/images/projects/', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/projects/', alt: 'Preview 4' }
    ],
    keyFeatures: [
        'Location-based restaurant recommendations',
        'Rating-weighted algorithm balancing quality and review count',
        'Reroll system for alternative high-quality options',
        'Mobile-first UI built with React Native (Expo)',
        'Client-server architecture with REST API'
    ],
    team: {
      members: ['Jaden Seangmany','Christine Le','Hoang Lam', 'Tom Situ', 'Sarthak Kapoor', 'Katelyn Li'],
      myContributions: [  
        'Co-led a team of 5 developers, enforcing code reviews and structured workflows',
        'Led frontend development from concept to implementation using React Native',
      ]
    },
    challenges: [
    {
      challenge: 'Balancing Rating vs Review Count',
      solution: 'Designed a weighted scoring algorithm to prioritize both quality and credibility.'
    },
    {
      challenge: 'Avoiding Repetitive Recommendations',
      solution: 'Implemented randomized selection from top-ranked results to ensure variety.'
    },
    {
      challenge: 'Coordinating a Team of Developers',
      solution: 'Established structured workflows and code reviews to maintain consistency and velocity.'
    }
    ]
  },
  {
    id: 6,
    title: 'Campus Swipe',
    role: 'Frontend Developer',
    category: 'swe',
    image: '/images/projects/campusswipe.png',
    startDate: 'Mar 2025',
    endDate: 'Jun 2025',
            tags: ['JavaScript','HTML/CSS','Frontend Development','Agile','CI/CD'],
    links: {
      live: 'https://cse110-sp25-group11.github.io/card-game/',
      github: 'https://github.com/cse110-sp25-group11/card-game',
      devpost: '',
      figma: ''
    },
    description: 'A swipe-based web app for discovering UCSD events, enabling students to browse, like, and share events through an interactive interface.',
    previews: [
      { id: 1, type: 'image', src: '/images/projects/campusswipep1.png', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/projects/campusswipep2.png', alt: 'Preview 2' },
      { id: 3, type: 'image', src: '/images/projects/campusswipep3.png', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/projects/campusswipep4.png', alt: 'Preview 4' }
    ],
    keyFeatures: [
      'Swipe-based event discovery interface',
      'Like system for saving events',
      'User-submitted event creation flow',
      'Categorized browsing (upcoming, ongoing events)',
      'Responsive UI built with vanilla JavaScript'
    ],
    team: {
      members: ['Verania Salcido', 'Mia Chen', 'Wyatt Fong', 'Lucas Hlaing', 'Benjamin Miller', 'Alan De Luna', 'Aryan Ahuja', 'Sachin Ramanathan', 'Charles Nguyen', 'Prasham Shah'
      ],
      myContributions: [  
      'Designed wireframes and translated Figma mockups into a functional frontend using HTML, CSS, and JavaScript',
      'Collaborated in an 11-person agile team with pull request reviews, testing, and CI/CD workflows',
      ]
    },
    challenges: [
    {
      challenge: 'Coordinating a Large Team',
      solution: 'Followed structured workflows with PR reviews and CI/CD to maintain code quality.'
    },
    {
      challenge: 'Building Without Frameworks',
      solution: 'Implemented UI and state logic using vanilla JavaScript without relying on libraries.'
    },
    {
      challenge: 'Maintaining Consistent UI',
      solution: 'Used shared Figma designs and code reviews to ensure visual and functional consistency.'
    }
    ]
  },
  {
    id: 7,
    title: 'Zippy',
    role: 'Frontend Developer',
    category: 'swe',
    image: '/images/projects/zippy.png',
    startDate: 'Apr 2025',
    endDate: 'Apr 2025',
            tags: ['Next.js','TypeScript','Real-time UI','Gamification','Gemini API'],
    links: {
      live: '',
      github: 'https://github.com/jadenseangmany/zippy',
      devpost: 'https://devpost.com/software/zippy',
      figma: ''
    },
    description: 'A gamified education platform that motivates students to complete homework through real-time leaderboards, AI feedback, and a reward-driven gacha system.',
    previews: [
      { id: 1, type: 'image', src: '/images/projects/zippyp1.png', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/projects/zippyp2.png', alt: 'Preview 2' },
      { id: 3, type: 'image', src: '/images/projects/zippyp3.png', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/projects/zippyp4.png', alt: 'Preview 4' }
    ],
    keyFeatures: [
    'Gamified homework system with points, leaderboards, and rewards',
    'Real-time leaderboard updates using Socket.IO',
    'AI-powered feedback and grading via Gemini API',
    'Gacha system for unlocking virtual pets and items',
    'Responsive UI with smooth animations and interactions'
    ],
    team: {
      members: ['Jaden Seangmany', 'Manjusri Gobiraj'],
      myContributions: [  
      'Designed and implemented a high-fidelity UI from Figma using Next.js and TypeScript',
      'Built smooth, interactive animations including a gacha pull sequence with Framer Motion',
      ]
    },
    challenges: [
    {
      challenge: 'Framework Compatibility Issues',
      solution: 'Pivoted to Next.js to resolve Tailwind limitations and support dynamic UI features.'
    },
    {
      challenge: 'Gemini API Integration',
      solution: 'Handled API configuration and data flow to reliably surface AI-generated feedback.'
    },
    {
      challenge: 'Inconsistent Design Assets',
      solution: 'Optimized and standardized custom illustrations for consistent UI rendering.'
    }
    ]
  },
  {
    id: 8,
    title: 'AgentUX',
    role: 'Frontend Developer',
    category: 'swe',
    image: '/images/projects/agentux.svg',
    startDate: 'Apr 2026',
    endDate: 'Apr 2026',
    tags: ['HTML / CSS / JS', 'Chrome Extension', 'AI Agents', 'Browser Automation', 'Real-Time UI'],
    links: {
      live: 'https://www.agentux.dev/',
      github: '',
      devpost: 'https://devpost.com/software/agent-ux',
      figma: ''
    },
    description: 'AI-powered Chrome extension that automates usability testing by deploying real browsing agents to simulate user behavior, uncover friction points, and generate actionable UI fixes in minutes.',
    previews: [
      { id: 1, type: 'image', src: '/images/projects/agentuxp1.png', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/projects/agentuxp2.webp', alt: 'Preview 2' },
      { id: 3, type: 'gif', src: '/images/projects/agentuxp3.gif', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/projects/agentuxp4.png', alt: 'Preview 4' }
    ],
    keyFeatures: [
      'AI agents simulate real user personas in live browser sessions',
      'Real time activity feed with actions and reasoning',
      'Detects usability issues from behavior (misclicks and hesitation)',
      'One-click UI fixes with live preview',
      'Parallel testing across multiple personas',
      'End-to-end flow: URL → issues → fixes → deploy prompt'
    ],
    team: {
      members: ['Jaden Seangmany', 'Manjusri Gobiraj', 'Alice Lan'],
      myContributions: [  
      'Developed a responsive Chrome extension UI with smooth, performant animations',
      'Implemented intuitive interaction logic to create a seamless user experience',
      ]
    },
    challenges: [
    {
      challenge: 'Raw Agent Output',
      solution: 'Parsed low level actions into human readable logs with simulated persona reasoning.'
    },
    {
      challenge: 'Noisy Execution Logs',
      solution: 'Filtered internal commands to clean up the live activity feed.'
    },
    {
      challenge: 'Missed Agent Actions',
      solution: 'Improved polling and consumed full step data to capture all events.'
    }
    ]
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
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [blurAmount, setBlurAmount] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldSpawnNotes, setShouldSpawnNotes] = useState(false);
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [audioProgress, setAudioProgress] = useState({});
  const [audioVolume, setAudioVolume] = useState(0.15);
  const [selectedProject, setSelectedProject] = useState(null);

  const audioRefs = useRef({});
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioSourcesRef = useRef({});
  const animationFrameRef = useRef(null);
  const lastBeatTime = useRef(0);
  const energyHistory = useRef([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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

      // Play audio (only reset to 0 if switching from a different playlist)
      if (playingPlaylist && playingPlaylist !== playlistId) {
        audio.currentTime = 0;
      }
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
          height: '72px',
          padding: '22px 158px',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '27px' }}
          >
            Khang's Wrapped
          </Link>
          <div
            className="flex items-center"
            style={{ fontFamily: "'Inter', sans-serif", gap: '29px', fontSize: '14px' }}
          >
            <Link to="/" className="hover:text-[#C4B5FD] transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#C4B5FD] transition-colors">
              About
            </Link>
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
        <section style={{ padding: '72px 158px 158px 158px' }}>
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
                fontSize: '58px',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}
            >
              <span className="gradient-shimmer">Discover My Projects </span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '43px',
                lineHeight: '1.6'
              }}
            >
              what i've been making instead of sleeping.
            </p>

            {/* Bordered Wrapper for Filters and Playlists */}
            <div
              style={{
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '14px',
                padding: '58px 43px',
                backgroundColor: 'rgba(78, 74, 92, 0.2)'
              }}
            >
              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '43px' }}>
            {['swe', 'uiux'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedPlaylist(selectedPlaylist === filter ? null : filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '11px 29px',
                  borderRadius: '22px',
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
                    borderRadius: '20px',
                    zIndex: -1
                  }}
                />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {filter === 'swe' && 'SWE'}
                  {filter === 'uiux' && 'UI/UX'}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Playlist Cards Grid - Filtered */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px' }}>
            <AnimatePresence mode="wait">
            {playlists
              .filter(playlist => !selectedPlaylist || playlist.category === selectedPlaylist)
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
                  borderRadius: '7px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: '108px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Playlist Image */}
                <div
                  style={{
                    width: '108px',
                    height: '108px',
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
                          width: '108px',
                          height: '108px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          pointerEvents: 'none'
                        }}
                      >
                        <div
                          style={{
                            width: '43px',
                            height: '43px',
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
                <div style={{ padding: '0 18px', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: '18px',
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
                      fontSize: '11px',
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
            margin: '0 158px'
          }}
        />

        {/* Playlist Detail Sections */}
        <section style={{ padding: '0 158px 158px 158px' }}>
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
                      marginTop: '108px',
                      marginBottom: '108px'
                    }}
                  />
                )}
                <motion.section
                  id={`playlist-${playlist.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  style={{
                    marginTop: index === 0 ? '108px' : '0',
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
                <div style={{ display: 'flex', gap: '29px', marginBottom: '43px' }}>
                  {/* Playlist Image */}
                  <div
                    style={{
                      width: '209px',
                      height: '209px',
                      borderRadius: '7px',
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
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#E8E8E3',
                        marginBottom: '7px'
                      }}
                    >
                      Public Playlist
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: '43px',
                        fontWeight: '700',
                        color: '#E8E8E3',
                        lineHeight: '1.2',
                        marginBottom: '14px'
                      }}
                    >
                      {playlist.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.6'
                      }}
                    >
                      {playlist.description}
                    </p>
                  </div>

                  {/* Play/Pause Button */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '7px' }}>
                    <motion.button
                      onClick={() => handlePlayPause(playlist.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '58px',
                        height: '58px',
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
                <div style={{ marginTop: '22px', marginBottom: '29px' }}>
                  {/* Progress Bar */}
                  <div
                    onClick={(e) => handleProgressClick(playlist.id, e)}
                    style={{
                      width: '100%',
                      height: '5px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      marginBottom: '11px'
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                        Now Playing:
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#C4B5FD', fontWeight: '500' }}>
                        {playlist.songName}
                      </span>
                    </div>

                    {/* Volume Control */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
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
                          width: '90px',
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
                    borderRadius: '7px',
                    padding: '22px',
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
                      gridTemplateColumns: '36px 1fr 180px',
                      gap: '14px',
                      padding: '0 14px 14px 14px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      marginBottom: '7px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: '500'
                      }}
                    >
                      #
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: '500'
                      }}
                    >
                      Project
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
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
                      style={{
                        borderRadius: '7px',
                        overflow: 'hidden',
                        border: selectedProject?.id === project.id
                          ? '2px solid rgba(196, 181, 253, 0.3)'
                          : '2px solid transparent',
                        transition: 'all 0.3s ease',
                        marginBottom: '7px'
                      }}
                    >
                      <motion.div
                        onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                        whileHover={{
                          backgroundColor: 'rgba(196, 181, 253, 0.1)'
                        }}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '36px 1fr 180px',
                          gap: '14px',
                          padding: '11px 14px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease',
                          backgroundColor: selectedProject?.id === project.id ? 'rgba(196, 181, 253, 0.05)' : 'transparent'
                        }}
                      >
                        {/* Track Number */}
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.7)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {idx + 1}
                        </span>

                        {/* Project Info */}
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                          <div style={{
                            width: '43px',
                            height: '43px',
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
                                fontSize: '14px',
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
                                fontSize: '12px',
                                color: 'rgba(255,255,255,0.5)'
                              }}
                            >
                              {project.role}
                            </p>
                          </div>
                        </div>

                        {/* Date */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '7px'
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '13px',
                              color: 'rgba(255,255,255,0.7)'
                            }}
                          >
                            {project.startDate} - {project.endDate}
                          </span>
                          <motion.div
                            animate={{
                              rotate: selectedProject?.id === project.id ? 180 : 0
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <CaretDown size={16} weight="bold" color="rgba(255,255,255,0.5)" />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Inline Project Detail */}
                      <ProjectDetail
                        project={project}
                        isOpen={selectedProject?.id === project.id}
                      />
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
          paddingLeft: '158px',
          paddingRight: '158px',
          paddingTop: '72px',
          paddingBottom: '36px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '58px' }}>
          {/* Left side - Message */}
          <div style={{ maxWidth: '360px' }}>
            <p style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '22px',
              fontWeight: '600',
              color: '#E8E8E3',
              lineHeight: '1.4'
            }}>
              Thanks for stopping by! Feel free to reach out if you'd like to collaborate or just chat about design and code.
            </p>
          </div>

          {/* Right side - Navigation and Connections */}
          <div style={{ display: 'flex', gap: '72px' }}>
            {/* Navigation */}
            <div>
              <h4 style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#C4B5FD',
                marginBottom: '22px'
              }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link
                  to="/"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/playlist"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none'
                  }}
                  className="hover:text-white transition-colors"
                >
                  My Playlists
                </Link>
                <a
                  href="/resume/khangresume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
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
                fontSize: '14px',
                fontWeight: '600',
                color: '#C4B5FD',
                marginBottom: '22px'
              }}>
                Connections
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
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
                    fontSize: '13px',
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
                    fontSize: '13px',
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
          paddingTop: '29px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)'
          }}>
            © 2026 Khang Nguyen
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
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

import { useState, useEffect, useRef } from 'react';
import FooterWithSpotlight from '../../components/FooterWithSpotlight';
import Navbar from '../../components/Navbar';
import { playlists } from '../../data/projects';
import LandingSection from './LandingSection';
import PlaylistDetailSection from './PlaylistDetailSection';

function Playlist() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [audioProgress, setAudioProgress] = useState({});
  const [audioVolume, setAudioVolume] = useState(0.15);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownClick = event.target.closest('[data-dropdown]');
      if (!isDropdownClick && openSortDropdown !== null) {
        setOpenSortDropdown(null);
      }
    };

    if (openSortDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSortDropdown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioVolume(newVolume);

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
      currentEnergy += dataArray[i] * dataArray[i];
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
    const now = Date.now();
    const timeSinceLastBeat = now - lastBeatTime.current;

    const energyThreshold = avgEnergy * 1.5;
    const minBeatInterval = 400;

    if (currentEnergy > energyThreshold && timeSinceLastBeat > minBeatInterval && currentEnergy > 3000) {
      const energyRatio = Math.min(currentEnergy / energyThreshold, 2.5);
      const intensity = 0.6 + ((energyRatio - 1) / 1.5) * 0.4;

      console.log('🎵 BEAT!', 'Energy:', Math.round(currentEnergy), 'Avg:', Math.round(avgEnergy), 'Ratio:', (currentEnergy/avgEnergy).toFixed(2), 'Intensity:', intensity.toFixed(2));
      lastBeatTime.current = now;
    }

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(detectBeat);
  };

  // Handle play/pause button click
  const handlePlayPause = (playlistId) => {
    const audio = audioRefs.current[playlistId];

    if (!audio) return;

    if (playingPlaylist === playlistId) {
      audio.pause();
      setPlayingPlaylist(null);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      if (playingPlaylist) {
        const prevAudio = audioRefs.current[playingPlaylist];
        if (prevAudio) {
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        console.log('✅ Audio Context created');
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        console.log('▶️ Audio Context resumed');
      }

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
        analyserRef.current = audioSourcesRef.current[playlistId].analyser;
        console.log('♻️ Reusing existing analyser');
      }

      if (playingPlaylist && playingPlaylist !== playlistId) {
        audio.currentTime = 0;
      }
      audio.volume = audioVolume;
      audio.play();
      setPlayingPlaylist(playlistId);

      console.log('🎵 Starting beat detection...');
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
    if (playingPlaylist !== playlistId) {
      handlePlayPause(playlistId);
    }

    const element = document.getElementById(`playlist-${playlistId}`);
    if (element) {
      const targetPosition = element.offsetTop - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2000;
      let start = null;

      const scrollAnimation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        if (progress < 0.5) {
          setBlurAmount(10);
        } else {
          const unblurProgress = (progress - 0.5) / 0.5;
          setBlurAmount(10 * (1 - unblurProgress));
        }

        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(scrollAnimation);
        } else {
          setBlurAmount(0);
        }
      };

      requestAnimationFrame(scrollAnimation);
    }
  };

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      <Navbar activePage="playlist" />

      {/* Main Content */}
      <main
        className="flex-1"
        style={{
          padding: '0 var(--page-padding)'
        }}
      >
        {/* Content wrapper with blur effect */}
        <div style={{ filter: `blur(${blurAmount}px)` }}>
          <LandingSection onPlaylistClick={handlePlaylistClick} />

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(196, 181, 253, 0.5) 50%, transparent 100%)'
            }}
          />

          {/* Playlist Detail Sections */}
          <section style={{ paddingBottom: 'var(--section-padding)' }}>
            {playlists.map((playlist, index) => (
              <PlaylistDetailSection
                key={playlist.id}
                playlist={playlist}
                index={index}
                playingPlaylist={playingPlaylist}
                audioProgress={audioProgress}
                audioVolume={audioVolume}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                openSortDropdown={openSortDropdown}
                setOpenSortDropdown={setOpenSortDropdown}
                onPlayPause={handlePlayPause}
                onVolumeChange={handleVolumeChange}
                onProgressClick={handleProgressClick}
                audioRef={(el) => { if (el) audioRefs.current[playlist.id] = el; }}
              />
            ))}
          </section>
        </div>
        {/* End blur wrapper */}

        {/* Footer Section */}
        <FooterWithSpotlight />
      </main>
    </div>
  );
}

export default Playlist;

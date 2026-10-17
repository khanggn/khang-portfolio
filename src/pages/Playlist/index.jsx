import { useState, useEffect, useRef } from 'react';
import FooterWithSpotlight from '../../components/layout/FooterWithSpotlight';
import Navbar from '../../components/layout/Navbar';
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

  // Handle play/pause button click
  const handlePlayPause = (playlistId) => {
    const audio = audioRefs.current[playlistId];

    if (!audio) return;

    if (playingPlaylist === playlistId) {
      audio.pause();
      setPlayingPlaylist(null);
    } else {
      if (playingPlaylist) {
        const prevAudio = audioRefs.current[playingPlaylist];
        if (prevAudio) {
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }
      }

      if (playingPlaylist && playingPlaylist !== playlistId) {
        audio.currentTime = 0;
      }
      audio.volume = audioVolume;
      audio.play();
      setPlayingPlaylist(playlistId);
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

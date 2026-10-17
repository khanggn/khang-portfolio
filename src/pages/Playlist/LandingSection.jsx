import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from '@phosphor-icons/react';
import { playlists } from '../../data/projects';

export default function LandingSection({ onPlaylistClick }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null);

  return (
    <section style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'var(--section-padding)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section with Title and Description */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ maxWidth: '800px' }}>
            {/* Page Title */}
            <h1
              className="font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(32px, 5vw, 58px)',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}
            >
              <span className="gradient-shimmer">Discover My Projects </span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Gamja Flower', sans-serif",
                fontSize: '22px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.6',
                marginTop: '24px'
              }}
            >
              what i've been making instead of sleeping.
            </p>
          </div>
        </div>

        {/* Bordered Wrapper for Filters and Playlists */}
        <div
          style={{
            border: '1px solid rgba(196, 181, 253, 0.3)',
            borderRadius: '14px',
            padding: 'clamp(24px, 4vw, 58px) clamp(16px, 3vw, 43px)',
            backgroundColor: 'rgba(78, 74, 92, 0.2)',
            position: 'relative'
          }}
        >
          {/* Music Notes GIF - Inside Box */}
          <img
            src="/images/shared/musicnotes.gif"
            alt="Music notes"
            className="playlist-music-gif"
          />
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '43px' }}>
            {['swe', 'uiux'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedPlaylist(selectedPlaylist === filter ? null : filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: "'Gamja Flower', sans-serif",
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '8px 20px',
                  minHeight: '36px',
                  borderRadius: '999px',
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
          <div className="playlist-cards-grid">
            <AnimatePresence mode="wait">
            {playlists
              .filter(playlist => !selectedPlaylist || playlist.category === selectedPlaylist)
              .map((playlist) => (
              <motion.div
                key={`${playlist.id}-${selectedPlaylist}`}
                onClick={() => onPlaylistClick(playlist.id)}
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
                      fontSize: '15px',
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
                      fontFamily: "'Gamja Flower', sans-serif",
                      fontSize: '17px',
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
  );
}

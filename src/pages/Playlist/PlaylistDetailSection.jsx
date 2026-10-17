import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, SpeakerHigh, SpeakerLow, SpeakerSlash, CaretDown, CheckCircle } from '@phosphor-icons/react';
import ProjectDetail from '../../components/playlist/ProjectDetail';
import { projects } from '../../data/projects';

export default function PlaylistDetailSection({
  playlist,
  index,
  playingPlaylist,
  audioProgress,
  audioVolume,
  selectedProject,
  setSelectedProject,
  openSortDropdown,
  setOpenSortDropdown,
  onPlayPause,
  onVolumeChange,
  onProgressClick,
  audioRef,
}) {
  const [sortOrder, setSortOrder] = useState('newest');

  const playlistProjects = projects
    .filter(p => playlist.category === 'all' || p.category === playlist.category)
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
      } else if (sortOrder === 'oldest') {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      } else if (sortOrder === 'type') {
        const typeOrder = playlist.category === 'swe'
          ? { 'Hackathon': 1, 'Project': 2 }
          : { 'Case Study': 1, 'Designathon': 2, 'Project': 3 };

        const orderA = typeOrder[a.projectType] || 999;
        const orderB = typeOrder[b.projectType] || 999;

        if (orderA !== orderB) {
          return orderA - orderB;
        }
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
      }
      return 0;
    });

  return (
    <div>
      {index > 0 && (
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(196, 181, 253, 0.5) 50%, transparent 100%)',
            marginTop: 'clamp(48px, 8vw, 108px)',
            marginBottom: 'clamp(48px, 8vw, 108px)'
          }}
        />
      )}
      <motion.section
        id={`playlist-${playlist.id}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 * index }}
        style={{
          marginTop: index === 0 ? 'clamp(48px, 8vw, 108px)' : '0',
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
      <div className="playlist-header">
        {/* Playlist Image */}
        <div className="playlist-header-image">
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
        <div className="playlist-header-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }}>
          <p
            style={{
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '19px',
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
              fontSize: 'clamp(24px, 4vw, 43px)',
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
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '19px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.6'
            }}
          >
            {playlist.description}
          </p>
        </div>

        {/* Play/Pause Button */}
        <div className="playlist-header-play" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '7px' }}>
          <motion.button
            onClick={() => onPlayPause(playlist.id)}
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
          ref={audioRef}
          src={playlist.audio}
          loop
        />
      </div>

      {/* Progress Bar and Volume Control */}
      <div style={{ marginTop: '22px' }}>
        {/* Progress Bar */}
        <div
          onClick={(e) => onProgressClick(playlist.id, e)}
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
        <div className="now-playing-row">
          {/* Now Playing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ fontFamily: "'Gamja Flower', sans-serif", fontSize: '17px', color: 'rgba(255,255,255,0.5)' }}>
              Now Playing:
            </span>
            <span style={{ fontFamily: "'Gamja Flower', sans-serif", fontSize: '17px', color: '#C4B5FD', fontWeight: '500' }}>
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
              onChange={onVolumeChange}
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

      {/* Sort Control */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', marginBottom: '14px' }}>
        {/* Sort Dropdown */}
        <div data-dropdown style={{ position: 'relative' }}>
          <button
            data-dropdown
            onClick={(e) => {
              e.stopPropagation();
              setOpenSortDropdown(openSortDropdown === playlist.id ? null : playlist.id);
            }}
            style={{
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '18px',
              color: '#C4B5FD',
              background: 'rgba(196, 181, 253, 0.1)',
              border: '1px solid rgba(196, 181, 253, 0.3)',
              borderRadius: '5px',
              padding: '7px 12px',
              minHeight: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(196, 181, 253, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(196, 181, 253, 0.1)';
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Sort by:</span>
            {sortOrder === 'newest' && 'Newest First'}
            {sortOrder === 'oldest' && 'Oldest First'}
            {sortOrder === 'type' && 'Project Type'}
            <CaretDown size={12} weight="bold" color="#C4B5FD" />
          </button>

          {/* Dropdown Menu */}
          {openSortDropdown === playlist.id && (
            <motion.div
              data-dropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '5px',
                background: '#4E4A5C',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '5px',
                overflow: 'hidden',
                zIndex: 1000,
                minWidth: '160px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'type', label: 'Project Type' }
              ].map((option, idx) => (
                <button
                  key={option.value}
                  data-dropdown
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Clicked:', option.value, 'for playlist:', playlist.id);
                    setSortOrder(option.value);
                    setOpenSortDropdown(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: sortOrder === option.value ? 'rgba(196, 181, 253, 0.2)' : 'transparent',
                    border: 'none',
                    borderBottom: idx < 2 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    cursor: 'pointer',
                    fontFamily: "'Gamja Flower', sans-serif",
                    fontSize: '18px',
                    color: sortOrder === option.value ? '#C4B5FD' : '#E8E8E3',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    if (sortOrder !== option.value) {
                      e.currentTarget.style.background = 'rgba(196, 181, 253, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortOrder !== option.value) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {option.label}
                  {sortOrder === option.value && (
                    <CheckCircle size={14} weight="fill" color="#C4B5FD" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Projects List */}
      <div
        style={{
          backgroundColor: 'rgba(78, 74, 92, 0.2)',
          borderRadius: '7px',
          padding: '22px',
          boxShadow: 'none',
          transition: 'none'
        }}
      >
        {/* Table Header */}
        <div
          className="project-table-header"
          style={{
            padding: '0 14px 14px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '7px'
          }}
        >
          <span
            style={{
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '19px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: '500'
            }}
          >
            #
          </span>
          <span
            style={{
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '19px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: '500'
            }}
          >
            Project
          </span>
          <span
            className="project-date-column"
            style={{
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '19px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: '500',
              textAlign: 'right'
            }}
          >
            Date
          </span>
        </div>

        {/* Project Rows */}
        <AnimatePresence mode="wait">
        {playlistProjects.map((project, idx) => (
          <motion.div
            key={`${project.id}-${sortOrder}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.05,
              ease: "easeOut"
            }}
            style={{
              borderRadius: '7px',
              overflow: 'hidden',
              border: selectedProject?.id === project.id
                ? '1px solid rgba(196, 181, 253, 0.3)'
                : '1px solid transparent',
              marginBottom: '7px'
            }}
          >
            <motion.div
              className="project-table-row"
              onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
              whileHover={{
                backgroundColor: 'rgba(196, 181, 253, 0.1)'
              }}
              style={{
                padding: '11px 14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                backgroundColor: selectedProject?.id === project.id ? 'rgba(196, 181, 253, 0.05)' : 'transparent'
              }}
            >
              {/* Track Number */}
              <span
                style={{
                  fontFamily: "'Gamja Flower', sans-serif",
                  fontSize: '19px',
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
                      fontFamily: "'Gamja Flower', sans-serif",
                      fontSize: '20px',
                      fontWeight: '500',
                      color: '#E8E8E3',
                      marginBottom: '4px'
                    }}
                  >
                    {project.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Gamja Flower', sans-serif",
                      fontSize: '18px',
                      color: 'rgba(255,255,255,0.5)'
                    }}
                  >
                    {project.role}{project.projectType ? ` · ${project.projectType}` : ''}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div
                className="project-date-column"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '7px'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Gamja Flower', sans-serif",
                    fontSize: '19px',
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
        </AnimatePresence>
      </div>
    </motion.section>
    </div>
  );
}

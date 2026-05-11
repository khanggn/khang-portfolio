import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowSquareOut, GithubLogo, Article, FigmaLogo, X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function ProjectDetail({ project, isOpen }) {
  const [expandedImage, setExpandedImage] = useState(null);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (!expandedImage || !project?.previews) return;

    const handleKeyDown = (e) => {
      const currentIndex = project.previews.findIndex(p => p.id === expandedImage.id);
      const totalImages = project.previews.length;

      if (e.key === 'ArrowLeft') {
        const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
        setExpandedImage(project.previews[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
        setExpandedImage(project.previews[nextIndex]);
      } else if (e.key === 'Escape') {
        setExpandedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedImage, project?.previews]);

  const navigateImage = (direction) => {
    if (!project?.previews) return;
    const currentIndex = project.previews.findIndex(p => p.id === expandedImage.id);
    const totalImages = project.previews.length;

    if (direction === 'prev') {
      const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      setExpandedImage(project.previews[prevIndex]);
    } else if (direction === 'next') {
      const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
      setExpandedImage(project.previews[nextIndex]);
    }
  };

  if (!project) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(78, 74, 92, 0.15)',
                padding: 'clamp(16px, 3vw, 29px)',
                borderTop: '1px solid rgba(196, 181, 253, 0.2)'
              }}
            >

            {/* Tags + Links Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '29px', flexWrap: 'wrap', gap: '14px' }}>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                {project.tags?.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(196, 181, 253, 0.4)' }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      padding: '5px 13px',
                      backgroundColor: 'rgba(196, 181, 253, 0.15)',
                      border: '1px solid #9D92C8',
                      borderRadius: '18px',
                      color: '#E8E8E3',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Links */}
              {project.links && (
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: '#C4B5FD',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      <ArrowSquareOut size={14} weight="bold" />
                      Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: '#C4B5FD',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      <GithubLogo size={14} weight="bold" />
                      GitHub
                    </a>
                  )}
                  {project.links.devpost && (
                    <a
                      href={project.links.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: '#C4B5FD',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      <Article size={14} weight="bold" />
                      Devpost
                    </a>
                  )}
                  {project.links.figma && (
                    <a
                      href={project.links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: '#C4B5FD',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      <FigmaLogo size={14} weight="bold" />
                      Figma
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <div style={{ marginBottom: '29px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#C4B5FD',
                    marginBottom: '14px'
                  }}
                >
                  Description
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  {project.description}
                </p>
              </div>
            )}

            {/* Key Features */}
            {project.keyFeatures && (
              <div style={{ marginBottom: '29px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#C4B5FD',
                    marginBottom: '14px'
                  }}
                >
                  Key Features
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {project.keyFeatures.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '15px',
                        lineHeight: '1.7',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '11px',
                        paddingLeft: '18px',
                        position: 'relative'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: '#9D92C8'
                        }}
                      >
                        •
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Team Members */}
            {project.team?.members && (
              <div style={{ marginBottom: '29px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#C4B5FD',
                    marginBottom: '14px'
                  }}
                >
                  Team Members
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  {project.team.members.join(', ')}
                </p>
              </div>
            )}

            {/* My Contributions */}
            {project.team?.myContributions && (
              <div style={{ marginBottom: '29px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#C4B5FD',
                    marginBottom: '14px'
                  }}
                >
                  My Contributions
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {project.team.myContributions.map((contribution, index) => (
                    <li
                      key={index}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '15px',
                        lineHeight: '1.7',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '11px',
                        paddingLeft: '18px',
                        position: 'relative'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: '#9D92C8'
                        }}
                      >
                        •
                      </span>
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Media Preview Section - 2x2 Grid at Bottom */}
            {project.previews && project.previews.length > 0 && (
              <div style={{ marginBottom: '29px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#C4B5FD',
                    marginBottom: '14px'
                  }}
                >
                  Preview
                </h3>
                <div className="preview-grid">
                  {project.previews.map((preview, index) => (
                  <motion.div
                    key={preview.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(196, 181, 253, 0.3)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedImage(preview);
                    }}
                    style={{
                      height: 'clamp(180px, 30vw, 280px)',
                      borderRadius: '11px',
                      overflow: 'hidden',
                      backgroundColor: '#4E4A5C',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      pointerEvents: 'auto'
                    }}
                  >
                    {preview.type === 'video' ? (
                      <video
                        src={preview.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          pointerEvents: 'none'
                        }}
                      />
                    ) : (
                      <img
                        src={preview.src}
                        alt={preview.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                  </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox - Portal to body level */}
      {expandedImage && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 10000,
              padding: 'clamp(16px, 5vw, 80px)',
              boxSizing: 'border-box'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setExpandedImage(null)}
              style={{
                position: 'fixed',
                top: 'clamp(16px, 3vw, 40px)',
                right: 'clamp(16px, 3vw, 40px)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#E8E8E3',
                opacity: 0.7,
                transition: 'opacity 0.2s',
                zIndex: 10001,
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              <X size={36} weight="bold" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              style={{
                position: 'fixed',
                left: 'clamp(8px, 2vw, 40px)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '50%',
                width: 'clamp(44px, 6vw, 58px)',
                height: 'clamp(44px, 6vw, 58px)',
                cursor: 'pointer',
                color: '#E8E8E3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10001
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(196, 181, 253, 0.3)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-50%)';
              }}
            >
              <CaretLeft size={28} weight="bold" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              style={{
                position: 'fixed',
                right: 'clamp(8px, 2vw, 40px)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '50%',
                width: 'clamp(44px, 6vw, 58px)',
                height: 'clamp(44px, 6vw, 58px)',
                cursor: 'pointer',
                color: '#E8E8E3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10001
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(196, 181, 253, 0.3)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-50%)';
              }}
            >
              <CaretRight size={28} weight="bold" />
            </button>

            {/* Expanded Image Container */}
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {expandedImage.type === 'video' ? (
                <motion.video
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  src={expandedImage.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '14px',
                    boxShadow: '0 0 60px rgba(196, 181, 253, 0.4)'
                  }}
                />
              ) : (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  src={expandedImage.src}
                  alt={expandedImage.alt}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '14px',
                    boxShadow: '0 0 60px rgba(196, 181, 253, 0.4)'
                  }}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default ProjectDetail;

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SkipBack, SkipForward, Play, Pause, ArrowRight } from '@phosphor-icons/react';
import { featuredProjects } from '../../data/home';

export default function TitleTracksSection() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isViewAllHovered, setIsViewAllHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const navigate = useNavigate();
  const titleTracksRef = useRef(null);
  const titleTracksInView = useInView(titleTracksRef, {
    once: false,  // Allow reverse animation
    amount: 0.3  // Trigger when 30% of section is visible
  });

  // Progress bar update - only when section is in view
  useEffect(() => {
    if (isPaused || !titleTracksInView) return;

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
  }, [isPaused, titleTracksInView]);

  // Auto-advance when progress completes - only when section is in view
  useEffect(() => {
    if (progress >= 100 && !isPaused && titleTracksInView) {
      const timeout = setTimeout(() => {
        setSlideDirection(1);
        setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
        setProgress(0);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [progress, isPaused, titleTracksInView]);

  const handlePrevProject = () => {
    setSlideDirection(-1);
    setCurrentProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    setProgress(0);
  };

  const handleNextProject = () => {
    setSlideDirection(1);
    setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section
      id="title-tracks"
      ref={titleTracksRef}
      style={{
        paddingTop: 'var(--section-padding)',
        paddingBottom: 'var(--section-padding)',
        backgroundColor: '#E8E8E3',
        marginLeft: 'calc(var(--page-padding) * -1)',
        marginRight: 'calc(var(--page-padding) * -1)',
        paddingLeft: 'var(--page-padding)',
        paddingRight: 'var(--page-padding)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={titleTracksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ marginBottom: '43px' }}
      >
        <h3
          className="font-bold"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 'clamp(28px, 5vw, 58px)',
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
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentProjectIndex}
            custom={slideDirection}
            variants={{
              enter: (dir) => ({ opacity: 0, x: 100 * dir }),
              center: { opacity: 1, x: 0 },
              exit: (dir) => ({ opacity: 0, x: -100 * dir }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsCardHovered(true)}
            onHoverEnd={() => setIsCardHovered(false)}
            onClick={() => {
              const project = featuredProjects[currentProjectIndex];
              if (project.caseStudy) navigate(project.caseStudy);
            }}
            whileHover={{
              scale: 1.01
            }}
            style={{
              backgroundColor: '#262626',
              borderRadius: '11px',
              padding: 'clamp(20px, 3.5vw, 43px)',
              marginBottom: 'clamp(20px, 3.5vw, 43px)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
          {/* Soccer player slide-in animation - only for WCASL project */}
          {currentProjectIndex === 0 && (
            <motion.img
              className="card-hover-image"
              src="/images/wcasl/soccer.webp"
              alt="Soccer player"
              initial={{ x: 200, y: 200, opacity: 0 }}
              animate={isCardHovered ? { x: 0, y: 0, opacity: 1 } : { x: 200, y: 200, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                right: -70,
                bottom: -120,
                height: '60%',
                width: 'auto',
                objectFit: 'contain',
                pointerEvents: 'none',
                zIndex: 1,
                filter: 'invert(1) brightness(1.2)'
              }}
            />
          )}

          {/* Plastic bag slide-in animation - only for PlasticBeach project */}
          {currentProjectIndex === 1 && (
            <motion.img
              className="card-hover-image"
              src="/images/plasticbeach/plasticbag.avif"
              alt="Plastic bag"
              initial={{ x: 200, y: 200, opacity: 0, rotate: -30 }}
              animate={isCardHovered ? { x: 0, y: 0, opacity: 1, rotate: -30 } : { x: 200, y: 200, opacity: 0, rotate: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                right: -70,
                bottom: -120,
                height: '70%',
                width: 'auto',
                objectFit: 'contain',
                pointerEvents: 'none',
                zIndex: 1,
                filter: 'invert(1) brightness(1.2)',
                mixBlendMode: 'screen'
              }}
            />
          )}

          {/* Groceries slide-in animation - only for Coming Soon project */}
          {currentProjectIndex === 2 && (
            <motion.img
              className="card-hover-image"
              src="/images/propel/groceries.png"
              alt="Groceries"
              initial={{ x: 200, y: 200, opacity: 0, rotate: -15 }}
              animate={isCardHovered ? { x: 0, y: 0, opacity: 1, rotate: -15 } : { x: 200, y: 200, opacity: 0, rotate: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                right: -80,
                bottom: -90,
                height: '70%',
                width: 'auto',
                objectFit: 'contain',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          )}

          <div className="card-content-flex">
            {/* Project Media (Image or Video) */}
            <motion.div className="card-media">
              {featuredProjects[currentProjectIndex].media ? (
                featuredProjects[currentProjectIndex].mediaType === 'video' ? (
                  <motion.video
                    src={featuredProjects[currentProjectIndex].media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <motion.img
                    src={featuredProjects[currentProjectIndex].media}
                    alt={featuredProjects[currentProjectIndex].title}
                    animate={{ scale: 1 }}
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
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: '#C4B5FD',
                    fontFamily: "'Clash Display', sans-serif"
                  }}
                >
                  0{featuredProjects[currentProjectIndex].id}
                </span>
              )}
            </motion.div>

            {/* Project Info */}
            <div className="card-info">
              <div>
                <h4
                  className="gradient-text"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 'clamp(22px, 3.5vw, 58px)',
                    fontWeight: '700',
                    marginBottom: 'clamp(14px, 2.5vw, 29px)',
                    lineHeight: '1.2'
                  }}
                >
                  {featuredProjects[currentProjectIndex].title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Gamja Flower', sans-serif",
                    fontSize: 'clamp(14px, 1.8vw, 22px)',
                    color: '#ffffff',
                    lineHeight: '1.6',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {featuredProjects[currentProjectIndex].summary.replace(' — ', ' ')}
                </p>
              </div>

              {/* Type tags */}
              <div style={{ display: 'flex', gap: '11px', flexWrap: 'wrap', alignItems: 'center' }}>
                {featuredProjects[currentProjectIndex].types.map((type) => (
                  <span
                    key={type}
                    style={{
                      fontFamily: "'Gamja Flower', sans-serif",
                      fontSize: '18px',
                      padding: '5px 13px',
                      backgroundColor: 'rgba(196, 181, 253, 0.15)',
                      border: '1px solid #C4B5FD',
                      borderRadius: '18px',
                      color: '#C4B5FD',
                      fontWeight: '500',
                      boxShadow: '0 0 11px rgba(196, 181, 253, 0.4)'
                    }}
                  >
                    {type}
                  </span>
                ))}
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
            gap: '14px',
            marginBottom: '22px'
          }}
        >
          {/* Start timestamp */}
          <span
            style={{
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '17px',
              color: '#4E4A5C',
              flexShrink: 0
            }}
          >
            {featuredProjects[currentProjectIndex].date.split(/ – | - /)[0]}
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
              fontFamily: "'Gamja Flower', sans-serif",
              fontSize: '17px',
              color: '#4E4A5C',
              flexShrink: 0
            }}
          >
            {featuredProjects[currentProjectIndex].date.split(/ – | - /)[1] || featuredProjects[currentProjectIndex].date}
          </span>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
          {/* Previous Button */}
          <button
            aria-label="Previous project"
            onClick={handlePrevProject}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#262626',
              padding: '10px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              filter: 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C4B5FD';
              e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.6))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#262626';
              e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))';
            }}
          >
            <SkipBack size={29} weight="fill" />
          </button>

          {/* Pause/Play Button */}
          <button
            aria-label={isPaused ? 'Play' : 'Pause'}
            onClick={togglePause}
            style={{
              background: '#262626',
              border: 'none',
              cursor: 'pointer',
              color: '#E8E8E3',
              padding: '11px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              transition: 'all 0.3s',
              boxShadow: '0 0 0px rgba(196, 181, 253, 0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(196, 181, 253, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 0px rgba(196, 181, 253, 0)';
            }}
          >
            {isPaused ? <Play size={25} weight="fill" /> : <Pause size={25} weight="fill" />}
          </button>

          {/* Next Button */}
          <button
            aria-label="Next project"
            onClick={handleNextProject}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#262626',
              padding: '10px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              filter: 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C4B5FD';
              e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.6))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#262626';
              e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))';
            }}
          >
            <SkipForward size={29} weight="fill" />
          </button>
        </div>

        {/* View All My Work Link */}
        <motion.div
          style={{ marginTop: 'clamp(24px, 3.5vw, 43px)' }}
          whileHover="hover"
          initial="rest"
        >
          <Link
            to="/playlist"
            onMouseEnter={() => setIsViewAllHovered(true)}
            onMouseLeave={() => setIsViewAllHovered(false)}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(22px, 3.5vw, 43px)',
              textDecoration: 'none',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 1.2vw, 14px)',
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
              <ArrowRight size={43} weight="bold" />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

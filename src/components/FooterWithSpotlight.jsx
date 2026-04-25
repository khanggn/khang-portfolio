import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';
import VisitorCounter from './VisitorCounter';

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

// Footer with spotlight cursor effect
function FooterWithSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false); // Track cursor activity
  const [isInView, setIsInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const footerRef = useRef(null);
  const khangsRef = useRef(null);
  const wrappedRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  // Intersection Observer to detect when footer is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setAnimationKey(prev => prev + 1); // Force animation reset
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });

        // Show spotlight effect and reset inactivity timer
        setIsActive(true);

        // Clear existing timer
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }

        // Set new timer to hide spotlight after 2 seconds of inactivity
        inactivityTimerRef.current = setTimeout(() => {
          setIsActive(false);
        }, 2000);
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsActive(false);
      // Clear timer when leaving footer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      footer.addEventListener('mouseenter', handleMouseEnter);
      footer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (footer) {
        footer.removeEventListener('mousemove', handleMouseMove);
        footer.removeEventListener('mouseenter', handleMouseEnter);
        footer.removeEventListener('mouseleave', handleMouseLeave);
      }
      // Clean up timer on unmount
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // Calculate position relative to KHANG'S element
  // Use ellipse to compensate for scaleY(2) transform
  const getKhangsClipPath = () => {
    if (!isActive || !khangsRef.current) return 'ellipse(0px 0px at 0px 0px)';
    const rect = khangsRef.current.getBoundingClientRect();
    const footerRect = footerRef.current?.getBoundingClientRect();
    if (!footerRect) return 'ellipse(0px 0px at 0px 0px)';

    const relativeX = mousePosition.x - (rect.left - footerRect.left);
    const relativeY = mousePosition.y - (rect.top - footerRect.top);

    // Compensate for scaleY(2) with transformOrigin: center
    // Find center, adjust distance from center, then recalculate position
    const elementHeight = rect.height;
    const centerY = elementHeight / 2;
    const distanceFromCenter = relativeY - centerY;
    const adjustedY = centerY + (distanceFromCenter / 2);

    // Ellipse with X radius 40px, Y radius 20px (half because of scaleY(2))
    return `ellipse(40px 20px at ${relativeX}px ${adjustedY}px)`;
  };

  // Calculate position relative to WRAPPED element
  const getWrappedClipPath = () => {
    if (!isActive || !wrappedRef.current) return 'circle(0px at 0px 0px)';
    const rect = wrappedRef.current.getBoundingClientRect();
    const footerRect = footerRef.current?.getBoundingClientRect();
    if (!footerRect) return 'circle(0px at 0px 0px)';

    const relativeX = mousePosition.x - (rect.left - footerRect.left);
    const relativeY = mousePosition.y - (rect.top - footerRect.top);

    return `circle(40px at ${relativeX}px ${relativeY}px)`;
  };

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: '#262626',
        marginLeft: '-158px',
        marginRight: '-158px',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Custom Cursor Circle - Fluid Blob */}
      <div
        className="blob-cursor"
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          border: '3px solid #C4B5FD',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          zIndex: 9999,
          opacity: isHovering && isActive ? 0.95 : 0,
          visibility: isHovering && isActive ? 'visible' : 'hidden',
          boxShadow: '0 0 30px rgba(196, 181, 253, 0.8), 0 0 60px rgba(196, 181, 253, 0.5), 0 0 90px rgba(196, 181, 253, 0.3), inset 0 0 30px rgba(196, 181, 253, 0.3)',
          background: 'rgba(196, 181, 253, 0.1)',
          transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out'
        }}
      />

      {/* Top Left Text */}
      <motion.p
        key={`footer-text-left-${animationKey}`}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: 'absolute',
          top: '120px',
          left: '158px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '28px',
          fontWeight: '400',
          color: '#E8E8E3',
          margin: 0,
          cursor: 'default',
          userSelect: 'none'
        }}
      >
        <JumpingText delay={0}>thanks</JumpingText> for stopping by {'>.<'}
      </motion.p>

      {/* Bottom Left Copyright & Visitor Counter */}
      <motion.div
        key={`footer-copyright-${animationKey}`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '137px',
          left: '158px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: '400',
          color: '#E8E8E3',
          cursor: 'default',
          userSelect: 'none'
        }}
      >
        <p style={{ margin: 0 }}>© 2026 Khang Nguyen</p>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
        <VisitorCounter />
      </motion.div>

      {/* Bottom Right Text with Social Icons */}
      <motion.div
        key={`footer-text-right-${animationKey}`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '120px',
          right: '158px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '28px',
            fontWeight: '400',
            color: '#E8E8E3',
            margin: 0,
            cursor: 'default',
            userSelect: 'none'
          }}
        >
          feel free to <JumpingText delay={1000}>connect</JumpingText> with me!
        </p>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '16px', zIndex: 20, position: 'relative' }}>
          <a
            href="https://www.linkedin.com/in/khangnguyen05/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#4E4A5C',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <LinkedinLogo size={24} color="#C4B5FD" weight="fill" />
          </a>
          <a
            href="https://github.com/khanggn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#4E4A5C',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <GithubLogo size={24} color="#C4B5FD" weight="fill" />
          </a>
          <a
            href="mailto:khangg.nguyen05@gmail.com"
            className="hover:opacity-80 transition-opacity"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#4E4A5C',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Envelope size={24} color="#C4B5FD" weight="fill" />
          </a>
        </div>
      </motion.div>

      {/* Typography Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
          paddingLeft: '158px',
          paddingRight: '158px',
          cursor: 'default',
          userSelect: 'none'
        }}
      >
        {/* Base Layer - Regular Text with letter-by-letter animation */}
        <div
          ref={khangsRef}
          style={{
            position: 'relative',
            display: 'flex'
          }}
        >
          <h2
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '222px',
              fontWeight: '900',
              color: '#E8E8E3',
              lineHeight: '1',
              margin: 0,
              letterSpacing: '-0.02em',
              transform: 'scaleY(2)',
              transformOrigin: 'center',
              flexShrink: 0,
              display: 'flex'
            }}
          >
            {"KHANG'S".split('').map((letter, index) => (
              <motion.span
                key={`khang-base-${animationKey}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.19, 1.0, 0.22, 1.0]
                }}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>

          {/* Shimmer Layer - Revealed by spotlight */}
          <h2
            className="gradient-shimmer"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '222px',
              fontWeight: '900',
              lineHeight: '1',
              margin: 0,
              letterSpacing: '-0.02em',
              transform: 'scaleY(2)',
              transformOrigin: 'center',
              flexShrink: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              clipPath: getKhangsClipPath(),
              display: 'flex'
            }}
          >
            {"KHANG'S".split('').map((letter, index) => (
              <motion.span
                key={`khang-shimmer-${animationKey}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.19, 1.0, 0.22, 1.0]
                }}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* WRAPPED - Vertical */}
        <div
          ref={wrappedRef}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '60px',
              fontWeight: '900',
              color: '#E8E8E3',
              lineHeight: '1',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '-0.02em',
              transform: 'scaleX(1.5) rotate(180deg)',
              transformOrigin: 'center',
              flexShrink: 0
            }}
          >
            {"WRAPPED".split('').map((letter, index) => (
              <motion.span
                key={`wrapped-base-${animationKey}-${index}`}
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: (index + 7) * 0.08,
                  ease: [0.19, 1.0, 0.22, 1.0]
                }}
                style={{ display: 'inline' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Shimmer Layer for WRAPPED with transform compensation */}
          <div
            className="gradient-shimmer"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '60px',
              fontWeight: '900',
              lineHeight: '1',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '-0.02em',
              transform: 'scaleX(1.5) rotate(180deg)',
              transformOrigin: 'center',
              flexShrink: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              clipPath: (() => {
                if (!isActive || !wrappedRef.current) return 'circle(0px at 0px 0px)';
                const rect = wrappedRef.current.getBoundingClientRect();
                const footerRect = footerRef.current?.getBoundingClientRect();
                if (!footerRect) return 'circle(0px at 0px 0px)';

                const relativeX = mousePosition.x - (rect.left - footerRect.left);
                const relativeY = mousePosition.y - (rect.top - footerRect.top);

                // Compensate for scaleX(1.5) and rotate(180deg)
                const elementWidth = rect.width;
                const elementHeight = rect.height;

                const centerX = elementWidth / 2;
                const centerY = elementHeight / 2;

                // Account for rotation: invert both X and Y from center
                const distanceFromCenterX = relativeX - centerX;
                const distanceFromCenterY = relativeY - centerY;

                // Compensate for scaleX(1.5) and invert due to rotate(180deg)
                const adjustedX = centerX - (distanceFromCenterX / 1.5);
                const adjustedY = centerY - distanceFromCenterY;

                // Use ellipse with inverted dimensions due to scaleX(1.5)
                return `ellipse(26.67px 40px at ${adjustedX}px ${adjustedY}px)`;
              })()
            }}
          >
            {"WRAPPED".split('').map((letter, index) => (
              <motion.span
                key={`wrapped-shimmer-${animationKey}-${index}`}
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: (index + 7) * 0.08,
                  ease: [0.19, 1.0, 0.22, 1.0]
                }}
                style={{ display: 'inline' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterWithSpotlight;

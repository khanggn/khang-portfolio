import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import JumpingText from '../../components/JumpingText';
import { roles } from '../../data/home';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDittoHovered, setIsDittoHovered] = useState(false);
  const heroRef = useRef(null);
  const dittoImgRef = useRef(null);

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

  // Track scroll position for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to animation values - delayed blur
  const blurValue = useTransform(scrollYProgress, [0.5, 0.85], [0, 10]);
  const filter = useTransform(blurValue, (value) => `blur(${value}px)`);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(40px, 8vh, 80px)',
        paddingBottom: 'clamp(40px, 8vh, 80px)'
      }}
    >
      <div className="hero-flex">
        <motion.div
          style={{
            filter,
            flex: 1,
            position: 'relative'
          }}
        >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: 'clamp(18px, 2.5vw, 29px)',
            lineHeight: '1.2',
            color: '#E8E8E3',
            marginBottom: 'clamp(12px, 2vw, 22px)'
          }}
        >
          Hi! I'm{' '}
          <span className="italic pulsing-glow" style={{ fontWeight: '600' }}>
            Khang Nguyen
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: 'clamp(28px, 5vw, 58px)',
            height: 'auto',
            minHeight: 'clamp(36px, 6vw, 72px)',
            lineHeight: '1.2',
            fontWeight: '700',
            marginBottom: 'clamp(20px, 3.5vw, 43px)'
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
              className="inline-block gradient-shimmer"
              style={{
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
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: 'clamp(15px, 2vw, 22px)',
            lineHeight: '1.6',
            color: '#E8E8E3',
            marginBottom: 'clamp(16px, 2.5vw, 29px)',
            maxWidth: '100%'
          }}
        >
          I like to <JumpingText delay={0}>design</JumpingText> and{' '}
          <JumpingText delay={1000}>code</JumpingText>. Whether it's for clients, hackathons, or just for fun, I'm always{' '}
          <JumpingText delay={2000}>building something</JumpingText>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: '1.6',
            color: '#E8E8E3',
            marginBottom: 'clamp(32px, 5vw, 64px)'
          }}
        >
          Computer Science & Cognitive Science @ UCSD
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="italic fun-fact"
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            lineHeight: '1.6',
            color: '#E8E8E3',
            opacity: 1
          }}
        >
          fun fact: I spent <span style={{ color: '#C4B5FD' }}><AnimatedCounter target={153601} duration={2500} /></span> minutes listening to music last year (that's 107 days I could've spent learning other programming languages... but music &gt; syntax errors)
        </motion.p>
      </motion.div>

      {/* Ditto GIF - Aligned with text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="ditto-wrapper"
        onMouseEnter={() => setIsDittoHovered(true)}
        onMouseLeave={() => setIsDittoHovered(false)}
        style={{
          width: 'clamp(160px, 20vw, 280px)',
          height: 'auto'
        }}
      >
        {/* Static first frame - hidden on hover */}
        <canvas
          ref={dittoImgRef}
          style={{
            width: '100%',
            height: 'auto',
            display: isDittoHovered ? 'none' : 'block'
          }}
        />
        {/* Animated GIF - shown on hover */}
        <img
          src="/images/shared/ditto.gif"
          alt="Ditto"
          style={{
            width: '100%',
            height: 'auto',
            display: isDittoHovered ? 'block' : 'none'
          }}
        />
        {/* Hidden img to load GIF and extract first frame */}
        <img
          src="/images/shared/ditto.gif"
          alt=""
          style={{ display: 'none' }}
          onLoad={(e) => {
            const canvas = dittoImgRef.current;
            if (canvas && e.target) {
              const ctx = canvas.getContext('2d');
              canvas.width = e.target.naturalWidth;
              canvas.height = e.target.naturalHeight;
              ctx.drawImage(e.target, 0, 0);
            }
          }}
        />
      </motion.div>
      </div>
    </section>
  );
}

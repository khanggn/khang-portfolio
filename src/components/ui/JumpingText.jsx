import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function JumpingText({ children, delay = 0 }) {
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

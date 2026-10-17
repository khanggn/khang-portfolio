import { useState, useEffect, useRef } from 'react';
import { useReducedMotion, useInView } from 'framer-motion';

export default function AnimatedNumber({ value, suffix = '', duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration, prefersReduced]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

import { useState, useEffect } from 'react';

export default function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure we hit exact target
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span style={{ display: 'inline-block', position: 'relative', marginRight: '0.22em' }}>
      <span style={{ visibility: 'hidden' }}>{target.toLocaleString()}</span>
      <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>{count.toLocaleString()}</span>
    </span>
  );
}

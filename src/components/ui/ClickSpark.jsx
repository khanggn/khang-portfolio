import { useState, useEffect, useRef, useCallback } from 'react';

function ClickSpark({
  color = '#C4B5FD',
  sparkCount = 8,
  sparkLength = 12,
  radius = 25,
  duration = 450,
}) {
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    const handler = (e) => { reducedMotion.current = e.matches; };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const removeBurst = useCallback((id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (reducedMotion.current) return;

      const id = idRef.current++;
      const sparks = Array.from({ length: sparkCount }, (_, i) => {
        const baseAngle = (360 / sparkCount) * i;
        const jitter = (Math.random() - 0.5) * 20;
        return baseAngle + jitter;
      });

      setBursts((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, sparks },
      ]);

      setTimeout(() => removeBurst(id), duration + 50);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [sparkCount, duration, removeBurst]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {bursts.map((burst) => (
        <div key={burst.id} style={{ position: 'absolute', left: burst.x, top: burst.y }}>
          {burst.sparks.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const tx = Math.cos(rad) * radius;
            const ty = Math.sin(rad) * radius;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: sparkLength,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: color,
                  transform: `rotate(${angle}deg)`,
                  animation: `clickspark-travel ${duration}ms ease-out forwards`,
                  '--spark-tx': `${tx}px`,
                  '--spark-ty': `${ty}px`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ClickSpark;

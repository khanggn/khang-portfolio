import { useState, useId, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function ImageToggle({ options, caption, wipe = false }) {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();
  const toggleId = useId();
  const tablistRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  // Wipe transition state
  const [prevActive, setPrevActive] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const wipeDirection = useRef(1);

  const goTo = useCallback((index) => {
    if (index === active) return;
    if (wipe) {
      wipeDirection.current = index > active ? 1 : -1;
      setPrevActive(active);
      setIsWiping(true);
    }
    setActive(index);
  }, [active, wipe]);

  const measurePill = useCallback(() => {
    const tablist = tablistRef.current;
    if (!tablist) return;
    const btn = tablist.querySelectorAll('[role="tab"]')[active];
    if (!btn) return;
    setPillStyle({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
    });
  }, [active]);

  useEffect(() => {
    measurePill();
  }, [measurePill]);

  // Measure active content height for smooth fade transitions,
  // re-measuring when images load and resize the content
  useEffect(() => {
    if (wipe || !contentRef.current) return;
    const container = contentRef.current;
    const measure = () => {
      const children = container.children;
      if (children[active]) {
        setContentHeight(children[active].scrollHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (container.children[active]) {
      ro.observe(container.children[active]);
    }
    return () => ro.disconnect();
  }, [active, wipe]);

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') {
      next = (index + 1) % options.length;
    } else if (e.key === 'ArrowLeft') {
      next = (index - 1 + options.length) % options.length;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = options.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    goTo(next);
  };

  const fadeDuration = prefersReduced ? 0 : 0.45;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Tab row — matches ScreenshotPanel tabs */}
      <div
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          marginBottom: 'clamp(24px, 4vw, 40px)',
          scrollbarWidth: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Toggle view"
          style={{
            display: 'flex',
            gap: '6px',
            width: 'max-content',
            position: 'relative',
          }}
        >
          {options.map((opt, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                role="tab"
                id={`${toggleId}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${toggleId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                style={{
                  fontFamily: "inherit",
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1,
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  zIndex: 1,
                  background: 'transparent',
                  color: isActive ? '#C4B5FD' : 'rgba(255,255,255,0.45)',
                  transition: prefersReduced ? 'color 0s' : 'color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  }
                }}
              >
                {opt.label}
              </button>
            );
          })}
          {/* Sliding active pill */}
          <motion.div
            layoutId={`${toggleId}-pill`}
            transition={prefersReduced ? { duration: 0 } : { type: 'tween', duration: wipe ? 1.2 : 0.25, ease: wipe ? [0.25, 0.1, 0.25, 1] : 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: pillStyle.left,
              width: pillStyle.width,
              borderRadius: '999px',
              background: 'rgba(196, 181, 253, 0.15)',
              zIndex: 0,
            }}
          />
        </div>
      </div>

      {/* Content area */}
      <div
        ref={contentRef}
        id={`${toggleId}-panel`}
        role="tabpanel"
        aria-labelledby={`${toggleId}-tab-${active}`}
        style={{
          width: '100%',
          position: 'relative',
          overflow: wipe ? 'hidden' : undefined,
          height: wipe ? undefined : contentHeight,
          transition: wipe || prefersReduced ? undefined : `height ${fadeDuration}s ease`,
        }}
      >
        {wipe ? (
          <>
            {/* Base layer — inactive image underneath */}
            <div>{options[active === 0 ? 1 : 0].content}</div>

            {/* Top layer — active image, always mounted to avoid unmount stutter */}
            <motion.div
              key={`wipe-${active}`}
              initial={isWiping ? {
                clipPath: wipeDirection.current > 0
                  ? 'inset(0 100% 0 0)'
                  : 'inset(0 0 0 100%)',
              } : false}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={prefersReduced
                ? { duration: 0 }
                : { duration: 2, ease: [0.25, 0.1, 0.25, 1] }
              }
              onAnimationComplete={() => {
                setIsWiping(false);
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            >
              {options[active].content}
            </motion.div>

          </>
        ) : (
          options.map((opt, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                aria-hidden={!isActive}
                style={{
                  position: isActive ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: prefersReduced ? 'none' : `opacity ${fadeDuration}s ease`,
                }}
              >
                {opt.content}
              </div>
            );
          })
        )}
      </div>

      {/* Caption */}
      {caption && (
        <p
          style={{
            fontFamily: "inherit",
            fontSize: '15px',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

export default ImageToggle;

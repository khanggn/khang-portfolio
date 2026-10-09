import { useState, useRef, useCallback, useId, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ShowcasePanel from './ShowcasePanel';

function ScreenshotPanel({ slides, heading }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const tabsRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const panelId = useId();
  const total = slides.length;

  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const goTo = useCallback((index) => {
    setCurrent(((index % total) + total) % total);
  }, [total]);

  const measurePill = useCallback(() => {
    const tablist = tabsRef.current;
    if (!tablist) return;
    const btn = tablist.querySelectorAll('[role="tab"]')[current];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [current]);

  useEffect(() => {
    measurePill();
  }, [measurePill]);

  const handleTabKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') {
      next = (index + 1) % total;
    } else if (e.key === 'ArrowLeft') {
      next = (index - 1 + total) % total;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = total - 1;
    } else {
      return;
    }
    e.preventDefault();
    goTo(next);
    const tabs = tabsRef.current?.querySelectorAll('[role="tab"]');
    tabs?.[next]?.focus();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goTo(current + 1);
    else if (diff < -50) goTo(current - 1);
  };

  const fadeDuration = prefersReduced ? 0 : 0.2;

  return (
    <div>
      {/* Heading */}
      {heading && (
        <p
          style={{
            fontFamily: "inherit",
            fontSize: '15px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '8px',
          }}
        >
          {heading}
        </p>
      )}

      <ShowcasePanel>
        <div
          role="tabpanel"
          id={`${panelId}-panel`}
          aria-labelledby={`${panelId}-tab-${current}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ outline: 'none' }}
        >
          {/* Tabs inside the panel */}
          {total > 1 && (
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
                ref={tabsRef}
                role="tablist"
                aria-label={heading || 'Screenshots'}
                style={{
                  display: 'flex',
                  gap: '6px',
                  width: 'max-content',
                  position: 'relative',
                }}
              >
                {slides.map((slide, i) => {
                  const isActive = i === current;
                  return (
                    <button
                      key={i}
                      role="tab"
                      id={`${panelId}-tab-${i}`}
                      aria-selected={isActive}
                      aria-controls={`${panelId}-panel`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => goTo(i)}
                      onKeyDown={(e) => handleTabKeyDown(e, i)}
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
                      {slide.label}
                    </button>
                  );
                })}
                {/* Sliding active pill */}
                <motion.div
                  layoutId={`${panelId}-pill`}
                  transition={prefersReduced ? { duration: 0 } : { type: 'tween', duration: 0.25, ease: 'easeInOut' }}
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
          )}

          {/* Image area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'grid',
            }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={current}
                src={slides[current].src}
                alt={slides[current].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeDuration }}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)',
                  gridArea: '1 / 1',
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </ShowcasePanel>
    </div>
  );
}

export default ScreenshotPanel;

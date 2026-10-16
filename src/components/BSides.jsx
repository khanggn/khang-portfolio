import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const ALBUM_ART = [
  {
    category: 'World Tour',
    entries: [
      {
        title: 'Japan',
        photos: [
          '/images/projects/japan1.png',
          '/images/projects/japan2.png',
          '/images/projects/japan3.png',
          '/images/projects/japan4.png',
          '/images/projects/japan5.png',
        ],
      },
      {
        title: 'Vietnam',
        photos: [
          '/images/projects/vietnam1.png',
          '/images/projects/vietnam2.png',
          '/images/projects/vietnam3.png',
          '/images/projects/vietnam4.png',
          '/images/projects/vietnam5.png',
        ],
      },
      {
        title: 'Cancun',
        photos: [
          '/images/projects/cancun1.png',
          '/images/projects/cancun2.png',
          '/images/projects/cancun3.png',
          '/images/projects/cancun4.png',
          '/images/projects/cancun5.png',
        ],
      },
    ],
  },
  {
    category: 'Featuring',
    entries: [
      {
        title: 'The Squad',
        animation: 'fade',
        photos: [
          '/images/projects/squad1.png',
          '/images/projects/squad2.png',
          '/images/projects/squad3.png',
          '/images/projects/squad4.png',
          '/images/projects/squad5.png',
          '/images/projects/squad6.png',
          '/images/projects/squad7.png',
        ],
      },
    ],
  },
];


/* ---- Photo Stack with toss-to-side animation ---- */

// slight random offsets for stacked look
const STACK_OFFSETS = [
  { rotate: 0, x: 0, y: 0 },
  { rotate: 2.5, x: 4, y: -2 },
  { rotate: -1.8, x: -3, y: 1 },
  { rotate: 3.2, x: 5, y: -3 },
];

function PhotoStack({ photos, destination, animation, onPrev, onNext, prevLabel, nextLabel }) {
  // Track which photos have been tossed (by index)
  const [tossed, setTossed] = useState([]);

  // Reset stack when destination changes
  const [prevDest, setPrevDest] = useState(destination);
  if (destination !== prevDest) {
    setPrevDest(destination);
    setTossed([]);
  }

  const visiblePhotos = photos.filter((_, i) => !tossed.includes(i));

  const handleToss = useCallback(() => {
    // Find the top-most visible photo (last in array = top of stack visually)
    const topIndex = photos.findIndex((_, i) => !tossed.includes(i));
    if (topIndex === -1) return;

    setTossed((prev) => [...prev, topIndex]);
  }, [photos, tossed]);

  const handleReset = useCallback(() => {
    setTossed([]);
  }, []);

  const allTossed = visiblePhotos.length === 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        maxWidth: 480,
      }}
    >
      {/* Stack container — first visible image sets natural size */}
      <div
        onClick={!allTossed ? handleToss : undefined}
        style={{
          position: 'relative',
          width: '100%',
          cursor: allTossed ? 'default' : 'pointer',
        }}
      >
        {/* Hidden sizer image to hold natural aspect ratio */}
        <img
          src={photos[0]}
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            visibility: 'hidden',
          }}
        />
        <AnimatePresence>
          {photos.map((photo, i) => {
            if (tossed.includes(i)) return null;
            const stackPos = visiblePhotos.indexOf(photo);
            const isTop = stackPos === 0;
            const offset = STACK_OFFSETS[i % STACK_OFFSETS.length];

            return (
              <motion.div
                key={`${destination}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={animation === 'fade'
                  ? { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }
                  : { opacity: 1, scale: 1, rotate: offset.rotate, x: offset.x, y: offset.y }
                }
                exit={animation === 'fade'
                  ? { opacity: 0, transition: { duration: 0.4 } }
                  : {
                    x: (Math.random() > 0.5 ? 1 : -1) * (300 + Math.random() * 200),
                    y: -80 - Math.random() * 60,
                    rotate: (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 25),
                    opacity: 0,
                    transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] },
                  }
                }
                transition={{ duration: 0.3 }}
                whileHover={isTop ? { scale: 1.02, rotate: 0 } : undefined}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: photos.length - i,
                  border: 'none',
                }}
              >
                <img
                  src={photo}
                  alt={`${destination} photo ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    userSelect: 'none',
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state — nav + restart */}
        {allTossed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            {/* Restart */}
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.15, color: '#C4B5FD' }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#8a8a8a',
                padding: 8,
              }}
              aria-label="Reset photo stack"
            >
              <RotateCcw size={36} strokeWidth={2} />
            </motion.button>

            {/* Prev / Next navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {onPrev && (
                <motion.button
                  onClick={onPrev}
                  whileHover={{ x: -3, color: '#C4B5FD' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: "'Gamja Flower', sans-serif",
                    fontSize: 16,
                  }}
                >
                  <ChevronLeft size={18} />
                  {prevLabel}
                </motion.button>
              )}
              {onNext && (
                <motion.button
                  onClick={onNext}
                  whileHover={{ x: 3, color: '#C4B5FD' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: "'Gamja Flower', sans-serif",
                    fontSize: 16,
                  }}
                >
                  {nextLabel}
                  <ChevronRight size={18} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Hint text */}
      {!allTossed && (
        <p
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}
        >
          Click to flip through ({visiblePhotos.length} left)
        </p>
      )}
    </div>
  );
}

function AlbumArtSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeEntry, setActiveEntry] = useState(0);

  const category = ALBUM_ART[activeCategory];
  const entry = category.entries[activeEntry];

  // Flatten all entries for prev/next navigation
  const allEntries = ALBUM_ART.flatMap((cat, ci) =>
    cat.entries.map((ent, ei) => ({ ci, ei, title: ent.title }))
  );
  const currentFlat = allEntries.findIndex(
    (e) => e.ci === activeCategory && e.ei === activeEntry
  );
  const prevEntry = currentFlat > 0 ? allEntries[currentFlat - 1] : null;
  const nextEntry = currentFlat < allEntries.length - 1 ? allEntries[currentFlat + 1] : null;

  const goTo = (flat) => {
    setActiveCategory(flat.ci);
    setActiveEntry(flat.ei);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: 'clamp(36px, 4vw, 48px)',
          fontWeight: 600,
          color: '#E8E8E3',
          margin: 0,
        }}
      >
        Album Art
      </motion.h3>

      <div
        className="bsides-travels-layout"
        style={{
          display: 'flex',
          gap: 32,
          minHeight: 360,
        }}
      >
        {/* Left 1/3 — Two-level menu */}
        <div
          style={{
            width: '33.33%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {ALBUM_ART.map((cat, ci) => {
            const isCatActive = ci === activeCategory;
            return (
              <div key={cat.category}>
                {/* Category heading */}
                <motion.button
                  onClick={() => {
                    setActiveCategory(ci);
                    setActiveEntry(0);
                  }}
                  whileHover={!isCatActive ? { x: 4 } : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 20px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: isCatActive ? '#C4B5FD' : 'rgba(255,255,255,0.4)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {cat.category}
                  </span>
                </motion.button>

                {/* Sub-entries (always visible) */}
                <div>
                  {cat.entries.map((ent, ei) => {
                    const isEntActive = isCatActive && ei === activeEntry;
                    return (
                      <motion.button
                        key={ent.title}
                        onClick={() => { setActiveCategory(ci); setActiveEntry(ei); }}
                        whileHover={!isEntActive ? { x: 4 } : undefined}
                        style={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 20px 10px 36px',
                          borderRadius: 10,
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          backgroundColor: 'transparent',
                          width: '100%',
                        }}
                      >
                        {isEntActive && (
                          <motion.img
                            src="/images/projects/ditto-separator.png"
                            alt=""
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            style={{
                              position: 'absolute',
                              left: 36,
                              width: 28,
                              height: 19,
                            }}
                          />
                        )}
                        <span
                          style={{
                            fontFamily: "'Gamja Flower', sans-serif",
                            fontSize: 18,
                            fontWeight: isEntActive ? 600 : 400,
                            color: isEntActive ? '#E8E8E3' : 'rgba(255,255,255,0.4)',
                            transition: 'margin-left 0.25s ease-out, color 0.2s',
                            marginLeft: isEntActive ? 38 : 0,
                          }}
                        >
                          {ent.title}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2/3 — Photo stack centered */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PhotoStack
            photos={entry.photos}
            animation={entry.animation}
            destination={`${category.category}-${entry.title}`}
            onPrev={prevEntry ? () => goTo(prevEntry) : null}
            onNext={nextEntry ? () => goTo(nextEntry) : null}
            prevLabel={prevEntry?.title}
            nextLabel={nextEntry?.title}
          />
        </div>
      </div>
    </div>
  );
}

function BSides() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Album Art */}
      <AlbumArtSection />

    </section>
  );
}

export default BSides;

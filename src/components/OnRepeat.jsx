import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import stats from '../data/spotify-stats.json';

const STAGES = [
  ...stats.years.map((y) => ({ key: String(y.year), label: String(y.year), ...y })),
  { key: 'all-time', label: 'All time', partial: false, ...stats.allTime },
];

const ARTIST_POS = [
  { top: '10%', left: '18%' },
  { top: '11%', right: '10%' },
  { bottom: '8%', left: '17%' },
];

const SONG_POS = [
  { top: '10%', left: '45%', transform: 'translateX(-50%)' },
  { top: '42%', left: '1%' },
  { top: '43%', right: '7%' },
  { bottom: '5%', left: '46%', transform: 'translateX(-50%)' },
  { bottom: '14%', right: '8%' },
];

function fmt(n) {
  return n.toLocaleString('en-US');
}

function fmtDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function spotifyUrl(uri) {
  // spotify:track:ABC123 → https://open.spotify.com/track/ABC123
  const parts = uri?.split(':');
  if (!parts || parts.length < 3) return null;
  return `https://open.spotify.com/${parts[1]}/${parts[2]}`;
}

function artistSearchUrl(name) {
  return `https://open.spotify.com/search/${encodeURIComponent(name)}`;
}

function useIsWide(bp = 1100) {
  const [w, setW] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= bp,
  );
  useEffect(() => {
    const h = () => setW(window.innerWidth >= bp);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return w;
}

function useCountUp(target, duration = 700) {
  const [val, setVal] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) {
      setVal(target);
      return;
    }
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    setVal(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduceMotion]);
  return val;
}

/* ---- timeline ---- */

function Timeline({ activeStage, onSelect }) {
  const DOT = 14;
  const n = STAGES.length;
  const trackLeft = `${(0.5 / n) * 100}%`;
  const trackRight = `${(0.5 / n) * 100}%`;
  const fillLeft = `${(0.5 / n) * 100}%`;
  // Fill spans from first dot center to active dot center.
  const fillFrac = activeStage / (n - 1);
  const trackSpan = (n - 1) / n;
  const fillWidth = `${fillFrac * trackSpan * 100}%`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* dots row — the line runs through the vertical center of this row */}
      <div style={{ position: 'relative', height: DOT }}>
        {/* track bg — spans first dot center to last dot center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: trackLeft,
            right: trackRight,
            height: 2,
            marginTop: -1,
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
        {/* track fill */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: fillLeft,
            height: 2,
            marginTop: -1,
            width: fillWidth,
            backgroundColor: '#C4B5FD',
            transition: 'width 0.3s ease-out',
          }}
        />
        {/* dots */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: '100%',
          }}
        >
          {STAGES.map((s, i) => {
            const reached = i <= activeStage;
            const current = i === activeStage;
            const size = current ? 14 : 10;
            return (
              <button
                key={s.key}
                onClick={() => onSelect(i)}
                aria-label={`Jump to ${s.label}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: reached ? '#C4B5FD' : '#9D92C8',
                    transition: 'all 0.3s',
                    boxShadow: current
                      ? '0 0 10px rgba(196,181,253,0.5)'
                      : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
      {/* labels row */}
      <div style={{ display: 'flex' }}>
        {STAGES.map((s, i) => {
          const reached = i <= activeStage;
          const current = i === activeStage;
          return (
            <span
              key={s.key}
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: current ? 600 : 400,
                color: reached ? '#E8E8E3' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ---- desktop floats ---- */

function ArtistFloat({ artist, pos, i, noMotion }) {
  return (
    <motion.a
      href={artistSearchUrl(artist.name)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...(noMotion ? {} : { y: [0, -4, 0, 3, 0] }),
      }}
      exit={{ opacity: 0, scale: 0.85 }}
      whileHover={{
        scale: 1.05,
        filter: 'drop-shadow(0 0 12px rgba(196,181,253,0.6))',
      }}
      transition={{
        opacity: { duration: 0.35, delay: i * 0.07 },
        scale: { duration: 0.35, delay: i * 0.07 },
        y: noMotion
          ? undefined
          : {
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
      }}
      style={{
        position: 'absolute',
        ...pos,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        zIndex: 2,
        textDecoration: 'none',
        cursor: 'pointer',
        filter: 'drop-shadow(0 0 0px transparent)',
      }}
    >
      <img
        src={artist.image}
        alt={artist.name}
        loading="lazy"
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid rgba(196,181,253,0.25)',
        }}
      />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: '#E8E8E3',
          textAlign: 'center',
          maxWidth: 110,
        }}
      >
        {artist.name}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: '#9D92C8',
        }}
      >
        {fmt(artist.minutes)} min
      </span>
    </motion.a>
  );
}

function SongFloat({ song, rank, pos, i, noMotion }) {
  const href = spotifyUrl(song.uri);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        ...(noMotion ? {} : { y: [0, -3, 0, 2, 0] }),
      }}
      exit={{ opacity: 0 }}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 16px rgba(196,181,253,0.45)',
        borderColor: 'rgba(196,181,253,0.5)',
      }}
      transition={{
        opacity: { duration: 0.3, delay: 0.12 + i * 0.05 },
        y: noMotion
          ? undefined
          : {
              duration: 7 + i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
      }}
      style={{
        position: 'absolute',
        ...pos,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 12,
        backgroundColor: 'rgba(78,74,92,0.45)',
        border: '1px solid rgba(157,146,200,0.15)',
        backdropFilter: 'blur(8px)',
        maxWidth: 220,
        zIndex: 2,
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 0px transparent',
      }}
    >
      <img
        src={song.image}
        alt={`${song.title} cover`}
        loading="lazy"
        style={{
          width: 36,
          height: 36,
          borderRadius: 4,
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: '#E8E8E3',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: '#9D92C8', marginRight: 4 }}>#{rank}</span>
          {song.title}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: '#C4B5FD',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {fmt(song.plays)} plays
        </p>
      </div>
    </motion.a>
  );
}

/* ---- mobile layout ---- */

function MobileContent({ stage }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        marginTop: 16,
        paddingBottom: 8,
      }}
    >
      {/* artists row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        {stage.topArtists.map((a) => (
          <a
            key={a.name}
            href={artistSearchUrl(a.name)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              width: 90,
              textDecoration: 'none',
            }}
          >
            <img
              src={a.image}
              alt={a.name}
              loading="lazy"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(196,181,253,0.25)',
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: '#E8E8E3',
                textAlign: 'center',
                maxWidth: 90,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {a.name}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: '#9D92C8',
              }}
            >
              {fmt(a.minutes)} min
            </span>
          </a>
        ))}
      </div>
      {/* songs list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {stage.topSongs.map((s, i) => (
          <a
            key={s.uri}
            href={spotifyUrl(s.uri)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 10px',
              borderRadius: 10,
              backgroundColor: 'rgba(78,74,92,0.35)',
              textDecoration: 'none',
            }}
          >
            <img
              src={s.image}
              alt={`${s.title} cover`}
              loading="lazy"
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: '#9D92C8',
                flexShrink: 0,
                width: 20,
              }}
            >
              #{i + 1}
            </span>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: '#E8E8E3',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
                minWidth: 0,
              }}
            >
              {s.title}
            </p>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: '#C4B5FD',
                flexShrink: 0,
              }}
            >
              {fmt(s.plays)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---- rolling text (only changed characters animate) ---- */

function RollingText({ text, className, style }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span
      style={{
        ...style,
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        height: '1.15em',
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className={className}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: 'block', whiteSpace: 'nowrap' }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---- stats text (remounts per stage for count-up) ---- */

function StatsText({ stage, wide }) {
  const mins = useCountUp(stage.minutes);
  const dayLabel =
    stage.days < 1
      ? `that's like ${Math.round(stage.minutes / 60)} hours`
      : `that's like ${stage.days.toFixed(1)} days`;

  return (
    <div style={{ textAlign: 'center' }}>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: wide ? 'clamp(16px, 1.5vw, 20px)' : 14,
          color: '#E8E8E3',
          margin: '6px 0 0',
        }}
      >
        I streamed {fmt(mins)} minutes{stage.partial ? ' so far' : ''}
      </p>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: wide ? 'clamp(14px, 1.2vw, 16px)' : 13,
          color: 'rgba(255,255,255,0.5)',
          margin: '4px 0 0',
        }}
      >
        {dayLabel}
      </p>
    </div>
  );
}

/* ---- main ---- */

function OnRepeat() {
  const reduceMotion = useReducedMotion();
  const wide = useIsWide(1100);
  const [active, setActive] = useState(0);

  const stage = STAGES[active];

  return (
    <section
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'calc(var(--page-padding) * -1)',
        marginRight: 'calc(var(--page-padding) * -1)',
        padding: '0 var(--page-padding)',
        backgroundColor: '#262626',
      }}
    >
      {/* screen-reader live region */}
      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
        }}
      >
        {stage.label}: {fmt(stage.minutes)} minutes streamed
      </div>

      {/* header */}
      <div style={{ paddingTop: 48, textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 32,
            fontWeight: 600,
            color: '#E8E8E3',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          What's in My Headphones
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: 'rgba(255,255,255,0.5)',
            margin: '8px 0 0',
          }}
        >
          {fmt(stats.totalHours)} hours of music and counting
        </p>
      </div>

      {/* timeline */}
      <div
        style={{
          padding: '24px clamp(4px, 3vw, 48px) 0',
        }}
      >
        <Timeline activeStage={active} onSelect={setActive} />
      </div>

      {/* content area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          minHeight: wide ? 500 : 'auto',
          overflow: 'hidden',
        }}
      >
        {wide ? (
          <>
            {/* Center text layer (year persistent + stats fade) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            >
              <RollingText
                text={stage.label}
                className="gradient-shimmer"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(72px, 8vw, 104px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatsText stage={stage} wide />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating items layer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                {stage.topArtists.map((a, i) => (
                  <ArtistFloat
                    key={a.name}
                    artist={a}
                    pos={ARTIST_POS[i]}
                    i={i}
                    noMotion={reduceMotion}
                  />
                ))}
                {stage.topSongs.map((s, i) => (
                  <SongFloat
                    key={s.uri}
                    song={s}
                    rank={i + 1}
                    pos={SONG_POS[i]}
                    i={i}
                    noMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Mobile layout */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 16,
            }}
          >
            <RollingText
              text={stage.label}
              className="gradient-shimmer"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 'clamp(48px, 12vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.1,
                margin: 0,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <StatsText stage={stage} wide={false} />
                <MobileContent stage={stage} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* caption */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          padding: '16px 0 32px',
          margin: 0,
        }}
      >
        From my Spotify streaming history, through{' '}
        {fmtDate(stats.dataThrough)}
      </p>
    </section>
  );
}

export default OnRepeat;

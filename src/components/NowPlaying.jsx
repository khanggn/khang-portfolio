import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SpotifyLogo } from '@phosphor-icons/react';

const POLL_MS = 30000;

function timeAgo(isoDate) {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// Three bouncing bars, like Spotify's "playing" indicator.
function Equalizer() {
  const reduceMotion = useReducedMotion();
  const bars = [
    [0.4, 1, 0.6, 0.9, 0.4],
    [1, 0.5, 0.9, 0.3, 1],
    [0.6, 0.9, 0.3, 1, 0.6],
  ];

  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '12px' }}>
      {bars.map((frames, i) => (
        <motion.span
          key={i}
          style={{
            width: '3px',
            height: '12px',
            borderRadius: '1px',
            backgroundColor: '#C4B5FD',
            transformOrigin: 'bottom',
          }}
          initial={{ scaleY: 0.5 }}
          animate={reduceMotion ? { scaleY: 0.7 } : { scaleY: frames }}
          transition={reduceMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function NowPlaying() {
  const [song, setSong] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | hidden
  const [progressMs, setProgressMs] = useState(0);
  const timerRef = useRef(null);

  // Fetch from our own API (which talks to Spotify), and refetch every 30s
  // while the tab is visible.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/now-playing');
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        if (cancelled) return;
        if (data.empty || !data.title) {
          setStatus('hidden');
          return;
        }
        // The server response may be cached for a few seconds, so account for that.
        const drift = data.fetchedAt ? Date.now() - data.fetchedAt : 0;
        setSong(data);
        setProgressMs(data.isPlaying ? Math.min((data.progressMs ?? 0) + drift, data.durationMs) : 0);
        setStatus('ready');
      } catch {
        // If Spotify is unreachable, hide the widget rather than show a broken card.
        if (!cancelled) setStatus((prev) => (prev === 'ready' ? prev : 'hidden'));
      }
    };

    const start = () => {
      clearInterval(timerRef.current);
      load();
      timerRef.current = setInterval(load, POLL_MS);
    };
    const stop = () => clearInterval(timerRef.current);
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Move the progress bar forward locally between polls.
  const isPlaying = song?.isPlaying;
  useEffect(() => {
    if (!isPlaying) return undefined;
    const tick = setInterval(() => {
      setProgressMs((p) => Math.min(p + 1000, song.durationMs || p));
    }, 1000);
    return () => clearInterval(tick);
  }, [isPlaying, song]);

  if (status === 'hidden') return null;

  if (status === 'loading') {
    return (
      <div className="now-playing-card" aria-hidden="true" style={cardStyle}>
        <div style={{ ...artStyle, backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ height: '10px', width: '40%', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div style={{ height: '14px', width: '75%', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div style={{ height: '12px', width: '55%', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    );
  }

  const progressPct = song.durationMs ? (progressMs / song.durationMs) * 100 : 0;
  const label = song.isPlaying ? 'Listening now' : `Last played · ${timeAgo(song.playedAt)}`;

  return (
    <motion.a
      className="now-playing-card"
      href={song.url ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${song.isPlaying ? 'Khang is listening to' : 'Khang last played'} ${song.title} by ${song.artist} on Spotify`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, borderColor: '#9D92C8' }}
      style={{ ...cardStyle, textDecoration: 'none', color: 'inherit' }}
    >
      {song.albumArt ? (
        <img src={song.albumArt} alt="" style={artStyle} />
      ) : (
        <div style={{ ...artStyle, backgroundColor: '#4E4A5C' }} />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          {song.isPlaying && <Equalizer />}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: song.isPlaying ? '#C4B5FD' : 'rgba(255,255,255,0.5)',
            }}
          >
            {label}
          </span>
        </div>

        <p style={{ ...truncate, fontFamily: "'Clash Display', sans-serif", fontSize: '16px', fontWeight: 600, color: '#E8E8E3', lineHeight: 1.3 }}>
          {song.title}
        </p>
        <p style={{ ...truncate, fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
          {song.artist}
        </p>

        {song.isPlaying && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={timeStyle}>{formatTime(progressMs)}</span>
            <div style={{ flex: 1, height: '3px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: '#C4B5FD', transition: 'width 1s linear' }} />
            </div>
            <span style={timeStyle}>{formatTime(song.durationMs)}</span>
          </div>
        )}
      </div>

      <SpotifyLogo size={20} weight="fill" color="#9D92C8" style={{ flexShrink: 0, alignSelf: 'flex-start' }} aria-hidden="true" />
    </motion.a>
  );
}

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  maxWidth: '340px',
  padding: '12px',
  marginTop: '32px',
  borderRadius: '12px',
  border: '1px solid #4E4A5C',
  backgroundColor: 'rgba(78, 74, 92, 0.35)',
  textAlign: 'left',
};

const artStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '6px',
  objectFit: 'cover',
  flexShrink: 0,
};

const truncate = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const timeStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.5)',
  fontVariantNumeric: 'tabular-nums',
};

export default NowPlaying;

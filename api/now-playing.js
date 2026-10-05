// Vercel serverless function: GET /api/now-playing
// Returns what Khang is listening to on Spotify right now, or the last track played.
// Secrets live in Vercel env vars, never in the frontend:
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

// Reuse the access token across warm invocations (it lasts ~1 hour).
let cachedToken = null;
let cachedTokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedTokenExpiresAt) return cachedToken;

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Missing Spotify environment variables');
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  // Refresh a minute early to be safe.
  cachedTokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

// Only send the frontend what it needs to draw the card.
function formatItem(item) {
  if (!item) return null;

  if (item.type === 'episode') {
    return {
      title: item.name,
      artist: item.show?.name ?? 'Podcast',
      album: item.show?.name ?? '',
      albumArt: item.images?.[0]?.url ?? item.show?.images?.[0]?.url ?? null,
      url: item.external_urls?.spotify ?? null,
      durationMs: item.duration_ms ?? 0,
    };
  }

  return {
    title: item.name,
    artist: (item.artists ?? []).map((a) => a.name).join(', '),
    album: item.album?.name ?? '',
    // images[1] is ~300px, plenty for a small card; fall back to the largest.
    albumArt: item.album?.images?.[1]?.url ?? item.album?.images?.[0]?.url ?? null,
    url: item.external_urls?.spotify ?? null,
    durationMs: item.duration_ms ?? 0,
  };
}

export default async function handler(req, res) {
  // Let Vercel's CDN share one answer across visitors for 15s,
  // so traffic spikes don't burn through Spotify's rate limit.
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');

  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    // 1. Is something playing right now?
    const nowResponse = await fetch(NOW_PLAYING_URL, { headers });

    if (nowResponse.status === 200) {
      const now = await nowResponse.json();
      const track = formatItem(now.item);

      // Ads or private sessions come back without an item.
      if (track && now.is_playing) {
        return res.status(200).json({
          isPlaying: true,
          ...track,
          progressMs: now.progress_ms ?? 0,
          fetchedAt: Date.now(),
        });
      }
    } else if (nowResponse.status !== 204) {
      // 204 just means "nothing playing"; anything else is a real error.
      throw new Error(`Currently playing failed: ${nowResponse.status}`);
    }

    // 2. Nothing playing, so show the most recent track instead.
    const recentResponse = await fetch(RECENTLY_PLAYED_URL, { headers });
    if (!recentResponse.ok) {
      throw new Error(`Recently played failed: ${recentResponse.status}`);
    }

    const recent = await recentResponse.json();
    const last = recent.items?.[0];
    if (!last) {
      return res.status(200).json({ isPlaying: false, empty: true });
    }

    return res.status(200).json({
      isPlaying: false,
      ...formatItem(last.track),
      playedAt: last.played_at,
    });
  } catch (error) {
    console.error('[now-playing]', error.message);
    // Don't cache failures for long, and don't leak details to visitors.
    res.setHeader('Cache-Control', 's-maxage=5');
    return res.status(500).json({ error: 'Could not reach Spotify' });
  }
}

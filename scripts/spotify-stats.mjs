// Turns Spotify's Extended Streaming History export into a small stats file
// for the About page. Run it on your own computer; the raw export stays private.
//
// Usage (from the project root):
//   node scripts/spotify-stats.mjs ~/Downloads/"Spotify Extended Streaming History"
//
// Optional: to also fetch album art and artist photos, run it with your Spotify
// app keys (the same Client ID and secret as the Now Playing widget):
//   read "SPOTIFY_CLIENT_ID?Client ID: "; read -s "SPOTIFY_CLIENT_SECRET?Client secret: "; echo; \
//   export SPOTIFY_CLIENT_ID SPOTIFY_CLIENT_SECRET; \
//   node scripts/spotify-stats.mjs ~/Downloads/"Spotify Extended Streaming History"
//
// Output: src/data/spotify-stats.json (a few KB, safe to commit; it contains
// no IP addresses, devices, or timestamps of individual plays).

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const TIME_ZONE = 'America/Los_Angeles';
const STREAM_MIN_MS = 30_000; // Spotify counts a play as a "stream" after 30 seconds
const TOP_ARTISTS = 3;
const TOP_SONGS = 5;
const OUT_FILE = path.resolve('src/data/spotify-stats.json');

const folder = process.argv[2];
if (!folder) {
  console.error('\nTell me where your export is, e.g.:\n');
  console.error('  node scripts/spotify-stats.mjs ~/Downloads/"Spotify Extended Streaming History"\n');
  process.exit(1);
}

// ---------- 1. Read every Streaming_History_Audio_*.json file ----------

const files = (await readdir(folder))
  .filter((f) => /^Streaming_History_Audio_.*\.json$/.test(f))
  .sort();

if (files.length === 0) {
  console.error(`No Streaming_History_Audio_*.json files found in ${folder}`);
  process.exit(1);
}

const yearFormatter = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, year: 'numeric' });
const years = new Map(); // year -> { ms, artists: Map, songs: Map }
let lastPlayed = null;
let skippedPodcastMs = 0;

function bucket(year) {
  if (!years.has(year)) years.set(year, { ms: 0, artists: new Map(), songs: new Map() });
  return years.get(year);
}

for (const file of files) {
  const plays = JSON.parse(await readFile(path.join(folder, file), 'utf8'));
  for (const play of plays) {
    const ms = play.ms_played ?? 0;
    const track = play.master_metadata_track_name;
    const artist = play.master_metadata_album_artist_name;

    // Podcasts and audiobooks have no track name; Wrapped-style stats are music only.
    if (!track || !artist) {
      skippedPodcastMs += ms;
      continue;
    }

    const year = Number(yearFormatter.format(new Date(play.ts)));
    const b = bucket(year);
    b.ms += ms;

    // Artists are ranked by time listened (like Wrapped).
    const a = b.artists.get(artist) ?? { name: artist, ms: 0, topTrackUri: null, topTrackPlays: 0, trackPlays: new Map() };
    a.ms += ms;
    b.artists.set(artist, a);

    // Songs are ranked by stream count (plays of 30s or more).
    if (ms >= STREAM_MIN_MS) {
      const key = `${track}\u0000${artist}`;
      const s = b.songs.get(key) ?? { title: track, artist, plays: 0, uri: play.spotify_track_uri ?? null };
      s.plays += 1;
      b.songs.set(key, s);

      // Remember each artist's most-played track, used to look up their photo.
      const uri = play.spotify_track_uri;
      if (uri) {
        const n = (a.trackPlays.get(uri) ?? 0) + 1;
        a.trackPlays.set(uri, n);
        if (n > a.topTrackPlays) {
          a.topTrackPlays = n;
          a.topTrackUri = uri;
        }
      }
    }

    if (!lastPlayed || play.ts > lastPlayed) lastPlayed = play.ts;
  }
  console.log(`Read ${file} (${plays.length.toLocaleString()} plays)`);
}

// ---------- 2. Summarize per year and all-time ----------

const minutes = (ms) => Math.round(ms / 60_000);

function summarize(b) {
  const topArtists = [...b.artists.values()]
    .sort((x, y) => y.ms - x.ms)
    .slice(0, TOP_ARTISTS)
    .map((a) => ({ name: a.name, minutes: minutes(a.ms), topTrackUri: a.topTrackUri, image: null }));

  const topSongs = [...b.songs.values()]
    .sort((x, y) => y.plays - x.plays)
    .slice(0, TOP_SONGS)
    .map((s) => ({ ...s, image: null }));

  return {
    minutes: minutes(b.ms),
    days: Math.round((b.ms / 86_400_000) * 10) / 10,
    topArtists,
    topSongs,
  };
}

// All-time totals merge every year's maps.
const allTime = { ms: 0, artists: new Map(), songs: new Map() };
for (const b of years.values()) {
  allTime.ms += b.ms;
  for (const [k, a] of b.artists) {
    const t = allTime.artists.get(k) ?? { ...a, ms: 0, trackPlays: new Map(), topTrackPlays: 0 };
    t.ms += a.ms;
    for (const [uri, n] of a.trackPlays) {
      const total = (t.trackPlays.get(uri) ?? 0) + n;
      t.trackPlays.set(uri, total);
      if (total > t.topTrackPlays) {
        t.topTrackPlays = total;
        t.topTrackUri = uri;
      }
    }
    allTime.artists.set(k, t);
  }
  for (const [k, s] of b.songs) {
    const t = allTime.songs.get(k) ?? { ...s, plays: 0 };
    t.plays += s.plays;
    allTime.songs.set(k, t);
  }
}

const currentYear = Number(yearFormatter.format(new Date()));
const stats = {
  generatedAt: new Date().toISOString().slice(0, 10),
  dataThrough: lastPlayed ? lastPlayed.slice(0, 10) : null,
  totalHours: Math.round(allTime.ms / 3_600_000),
  allTime: summarize(allTime),
  years: [...years.keys()]
    .sort((a, b) => a - b)
    .map((year) => ({
      year,
      partial: year === currentYear,
      ...summarize(years.get(year)),
    })),
};

// ---------- 3. Optional: look up album art and artist photos ----------

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

async function getAppToken() {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });
  if (!res.ok) throw new Error(`Spotify token request failed (${res.status})`);
  return (await res.json()).access_token;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function spotifyGet(token, url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 429) {
      await sleep((Number(res.headers.get('retry-after')) || 2) * 1000);
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}

async function addImages() {
  const token = await getAppToken();
  const trackCache = new Map();
  const artistCache = new Map();

  const getTrack = async (uri) => {
    if (!uri) return null;
    if (!trackCache.has(uri)) {
      const id = uri.split(':').pop();
      trackCache.set(uri, await spotifyGet(token, `https://api.spotify.com/v1/tracks/${id}`));
      await sleep(150); // stay well under the rate limit
    }
    return trackCache.get(uri);
  };

  const getArtistImage = async (artistId) => {
    if (!artistId) return null;
    if (!artistCache.has(artistId)) {
      const artist = await spotifyGet(token, `https://api.spotify.com/v1/artists/${artistId}`);
      artistCache.set(artistId, artist?.images?.[1]?.url ?? artist?.images?.[0]?.url ?? null);
      await sleep(150);
    }
    return artistCache.get(artistId);
  };

  const sections = [stats.allTime, ...stats.years];
  for (const section of sections) {
    for (const song of section.topSongs) {
      const track = await getTrack(song.uri);
      song.image = track?.album?.images?.[1]?.url ?? track?.album?.images?.[0]?.url ?? null;
    }
    for (const artist of section.topArtists) {
      const track = await getTrack(artist.topTrackUri);
      const match = track?.artists?.find((a) => a.name === artist.name) ?? track?.artists?.[0];
      // Fall back to album art if the artist has no photo.
      artist.image = (await getArtistImage(match?.id)) ?? track?.album?.images?.[1]?.url ?? null;
    }
  }
  console.log(`Looked up ${trackCache.size} tracks and ${artistCache.size} artists`);
}

if (SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET) {
  try {
    await addImages();
  } catch (error) {
    console.warn(`\nCouldn't fetch images (${error.message}). Stats were still saved without them.`);
  }
} else {
  console.log('\nNo Spotify keys set, so skipping images. (See the top of this file to add them.)');
}

// The lookup helper isn't needed on the website.
for (const section of [stats.allTime, ...stats.years]) {
  for (const artist of section.topArtists) delete artist.topTrackUri;
}

// ---------- 4. Save ----------

await mkdir(path.dirname(OUT_FILE), { recursive: true });
await writeFile(OUT_FILE, JSON.stringify(stats, null, 2) + '\n');

console.log(`\nSaved ${path.relative(process.cwd(), OUT_FILE)}`);
console.log(`Total: ${stats.totalHours.toLocaleString()} hours of music across ${stats.years.length} years`);
for (const y of stats.years) {
  console.log(
    `  ${y.year}${y.partial ? ' (so far)' : ''}: ${y.minutes.toLocaleString()} min · ` +
      `top artist ${y.topArtists[0]?.name ?? '-'} · top song "${y.topSongs[0]?.title ?? '-'}" (${y.topSongs[0]?.plays ?? 0} plays)`
  );
}
if (skippedPodcastMs > 0) {
  console.log(`  (Left out ${Math.round(skippedPodcastMs / 3_600_000)} hours of podcasts/audiobooks)`);
}

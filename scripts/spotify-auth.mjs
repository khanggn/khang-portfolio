// One-time helper: gets a Spotify refresh token for the Now Playing widget.
//
// Usage (from the project root):
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs
//
// Then open the link it prints, log in, and click Agree.
// The refresh token is printed in this terminal. Paste it into Vercel as
// SPOTIFY_REFRESH_TOKEN. Never commit it to git.

import http from 'node:http';
import { randomBytes } from 'node:crypto';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
// Spotify no longer accepts "localhost"; it must be the loopback IP.
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nMissing credentials. Run it like this:\n');
  console.error('  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs\n');
  process.exit(1);
}

const state = randomBytes(16).toString('hex');
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state,
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }

  const finish = (message) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<body style="font-family:sans-serif;background:#262626;color:#E8E8E3;padding:40px">
      <h2>${message}</h2><p>You can close this tab and go back to the terminal.</p></body>`);
    server.close();
  };

  if (url.searchParams.get('state') !== state) {
    console.error('State mismatch. Please run the script again.');
    return finish('Something went wrong (state mismatch).');
  }
  if (url.searchParams.get('error')) {
    console.error('Spotify returned an error:', url.searchParams.get('error'));
    return finish('Authorization was cancelled.');
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: url.searchParams.get('code'),
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenResponse.json();
  if (!tokenResponse.ok || !data.refresh_token) {
    console.error('Token exchange failed:', data);
    return finish('Token exchange failed. Check the terminal.');
  }

  console.log('\nSuccess! Add this to Vercel (and .env.local) as SPOTIFY_REFRESH_TOKEN:\n');
  console.log(data.refresh_token);
  console.log('\nKeep it secret. Anyone with it can see your listening activity.\n');
  finish('Done! Your refresh token is in the terminal.');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\nOpen this link in your browser and click Agree:\n');
  console.log(authUrl + '\n');
});

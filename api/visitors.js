// Vercel Serverless Function to fetch analytics data
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.VERCEL_ACCESS_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID; // optional, for team projects
    const projectId = process.env.VERCEL_PROJECT_ID;

    if (!token || !projectId) {
      console.error('Missing environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Calculate date range (last 7 days)
    const since = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const until = Date.now();

    // Build API URL
    const baseUrl = 'https://vercel.com/api/web/insights/stats';
    const params = new URLSearchParams({
      projectId,
      from: since.toString(),
      to: until.toString(),
      ...(teamId && { teamId })
    });

    const response = await fetch(`${baseUrl}?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract total visitors (unique visitors)
    const visitors = data?.visitors?.value || 0;
    const pageViews = data?.pageViews?.value || 0;

    return res.status(200).json({
      visitors,
      pageViews,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({
      error: 'Failed to fetch analytics',
      details: error.message
    });
  }
}

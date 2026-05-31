export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: 'You are an email organization assistant.',
        messages: [{
          role: 'user',
          content: 'Give me a brief 2-sentence tip on how to best organize a business inbox using folders like Finance, Projects, HR, Newsletters, and Archive. Be practical and concise.'
        }]
      })
    });

    const data = await response.json();
    const tip = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || '';

    return res.status(200).json({
      success: true,
      message: `AI Tip: ${tip}\n\nTo fully automate inbox organization with Microsoft Graph, add MS credentials to your Vercel env vars.`
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

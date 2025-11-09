// server.js
const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = 3000;

// Initialize OpenAI with env var (export OPENAI_API_KEY=...)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middlewares
app.use(express.json());
app.use(express.static(__dirname)); // serve /youtubeShorts.html, /video, /scripts, etc.

// Default: open the demo page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Stub endpoint to test frontend wiring quickly (no OpenAI call)
app.post('/analyze-stub', (req, res) => {
  const { script } = req.body || {};
  console.log('[STUB] script length =', script?.length ?? 0);
  return res.json({
    biasPercentage: 42,
    reasoning: 'Stub OK – frontend wiring looks good.',
  });
});

// Real analysis endpoint (OpenAI)
app.post('/analyze', async (req, res) => {
  const { script } = req.body || {};
  if (!script || !script.trim()) {
    return res.status(400).json({ error: 'No script provided.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      // Use a small, widely available model; change if needed
      model: 'gpt-4o-mini',
      // Force JSON-only output
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            `You are a media-bias analysis expert. ` +
            `Analyze the provided script and return ONLY valid JSON with this exact structure:\n` +
            `{"biasPercentage": <number>, "reasoning": "<string>"}`,
        },
        {
          role: 'user',
          content: `Analyze the following script:\n"""${script}"""`,
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content ?? '{}';
    console.log('[OPENAI RAW]', raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error('JSON parse failed:', e);
      data = { biasPercentage: 0, reasoning: 'Model did not return valid JSON.' };
    }
    // Minimal validation
    if (typeof data.biasPercentage !== 'number') data.biasPercentage = 0;
    if (typeof data.reasoning !== 'string') data.reasoning = 'No reasoning returned.';

    res.json(data);
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'AI analysis failed', detail: String(error?.message || error) });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('Open http://localhost:3000/test.html');
});

const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const fetch = require('node-fetch');
const cors = require('cors');

const GROQ_API_KEY = defineSecret('GROQ_API_KEY');

const corsHandler = cors({
  origin: [
    'https://recursivetechsolution.com',
    'https://www.recursivetechsolution.com',
    'http://localhost:8000',
    'http://localhost:8080'
  ]
});

exports.groqChat = onRequest({ secrets: [GROQ_API_KEY] }, (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const { messages, model = 'llama3-8b-8192', max_tokens = 500 } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request: messages array required' });
      }
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY.value()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages, max_tokens }),
      });
      if (!groqRes.ok) {
        const error = await groqRes.text();
        return res.status(groqRes.status).json({ error });
      }
      const data = await groqRes.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('Groq proxy error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

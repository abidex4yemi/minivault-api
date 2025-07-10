const axios = require('axios');

const streamFromOllama = async (prompt, model, res, logResponse) => {
  try {
    const ollamaServerUrl = 'http://localhost:11434';
    const response = await axios.post(
      `${ollamaServerUrl}/api/generate`,
      {
        prompt,
        model,
      },
      {
        responseType: 'stream',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    let completeResponse = '';

    response.data.on('data', (chunk) => {
      const token = chunk.toString();
      res.write(`data: ${token}\n\n`);
      completeResponse += token;
    });

    response.data.on('end', () => {
      res.end();
      try {
        logResponse(prompt, completeResponse);
      } catch (logErr) {
        console.error('Error in logResponse:', logErr);
      }
    });

    response.data.on('error', (err) => {
      console.error('Stream error:', err);
      res.end();
    });

    res.on('close', () => {
      response.data.destroy();
    });
  } catch (error) {
    console.error('Error streaming from Ollama:', error);
    res.status(500).json({ error: 'Failed to stream from Ollama.' });
  }
};

module.exports = { streamFromOllama };

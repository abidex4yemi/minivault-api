const express = require('express');
const router = express.Router();

const { streamDummyResponse } = require('../services/dummyResponse.js');
const { logResponse } = require('../utils/logger');

const SUPPORTED_MODELS = ['mistral', 'llama3'];
router.post('/', async (req, res) => {
  const { model = 'dummy', prompt } = req?.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  if (model != 'dummy' && !SUPPORTED_MODELS.includes(model)) {
    return res.status(400).json({
      error: `Invalid model, supported models are: ${SUPPORTED_MODELS.join(
        ', '
      )}`,
    });
  }

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const useDummy = !SUPPORTED_MODELS.includes(model);
  if (useDummy) {
    await streamDummyResponse(prompt, res, logResponse);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const { streamDummyResponse } = require('../services/dummyResponse.js');
const { logResponse } = require('../utils/logger');
const { streamFromOllama } = require('../services/ollamaService.js');

const SUPPORTED_MODELS = ['mistral', 'llama3'];

router.post('/', async (req, res) => {
  let { model = 'dummy', prompt } = req?.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  model = model.toLowerCase().trim();

  if (model != 'dummy' && !SUPPORTED_MODELS.includes(model)) {
    return res.status(400).json({
      error: `Invalid model, supported models are: ${SUPPORTED_MODELS.join(
        ', '
      )}`,
    });
  }

  const useDummy = !SUPPORTED_MODELS.includes(model);
  if (useDummy) {
    await streamDummyResponse(prompt, model, res, logResponse);
  } else {
    await streamFromOllama(prompt, model, res, logResponse);
  }
});

module.exports = router;

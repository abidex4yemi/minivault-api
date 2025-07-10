const streamDummyResponse = async (prompt, response, logFn) => {
  const tokens = [
    'Hello',
    ' ',
    'there',
    '!',
    ' ',
    'This',
    ' ',
    'is',
    ' ',
    'a',
    ' ',
    'test',
    ' ',
    'response',
    '.',
  ];

  let completeResponse = '';

  for (let token of tokens) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    response.write(`data: ${JSON.stringify(token)}\n\n`);
    completeResponse += token;
  }

  response.write(`data: [DONE]\n\n`);
  response.end();
  logFn(prompt, completeResponse);
};

module.exports = { streamDummyResponse };

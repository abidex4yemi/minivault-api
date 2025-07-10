const streamDummyResponse = async (prompt, model, response, logFn) => {
  try {
    const startTime = Date.now();
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

    response.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    for (let token of tokens) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const now = new Date().toISOString();

      response.write(
        `data: ${JSON.stringify({
          model,
          created_at: now,
          response: token,
          done: false,
        })}\n\n`
      );
      completeResponse += token;
    }

    const now = new Date().toISOString();
    const total_duration = Date.now() - startTime;
    const context = null;
    const load_duration = 0;
    const prompt_eval_count = 0;
    const prompt_eval_duration = 0;
    const eval_count = 0;
    const eval_duration = 0;

    response.write(
      `data: ${JSON.stringify({
        model,
        created_at: now,
        response: '',
        done: true,
        done_reason: 'stop',
        context,
        total_duration,
        load_duration,
        prompt_eval_count,
        prompt_eval_duration,
        eval_count,
        eval_duration,
      })}\n\n`
    );

    response.end();
    logFn(prompt, completeResponse);
  } catch (error) {
    console.error('Error in streamDummyResponse:', error);
    response.status(500).json({ error: 'Failed to stream dummy response.' });
  }
};

module.exports = { streamDummyResponse };

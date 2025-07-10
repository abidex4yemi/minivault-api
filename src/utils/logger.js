const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'logs', 'log.jsonl');

const logResponse = (prompt, response) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    prompt,
    response,
    timestamp,
  };

  console.log(JSON.stringify(logEntry));

  fs.appendFileSync(logFilePath, `${JSON.stringify(logEntry)}\n`);
};

module.exports = { logResponse };

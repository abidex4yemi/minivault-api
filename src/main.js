const express = require('express');
const bodyParser = require('body-parser');

const generateRoute = require('./routes/generate');

const app = express();
app.use(bodyParser.json());
app.use('/generate', generateRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

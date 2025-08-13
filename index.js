const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Import and use the /generate-text router
const generateTextRoute = require('./router/generateRoute');
app.use('/', generateTextRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
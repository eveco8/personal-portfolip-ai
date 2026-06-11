const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/contact', contactRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'Case file server online.' });
});

app.listen(PORT, () => {
  console.log(`[CASE FILE SERVER] Running on port ${PORT}`);
});

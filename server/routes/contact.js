const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.status(201).json({
      success: true,
      message: 'Transmission received. The engineer will be in touch.',
    });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Failed to log transmission. Try again.' });
  }
});

module.exports = router;

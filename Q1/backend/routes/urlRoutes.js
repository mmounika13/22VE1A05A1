const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlStats
} = require('../controllers/urlController');

// Create short URL
router.post('/', createShortUrl);

// Redirect
router.get('/:shortCode', redirectToOriginalUrl);

// ✅ Get stats
router.get('/stats/:shortCode', getUrlStats);

module.exports = router;

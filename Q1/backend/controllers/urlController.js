const Url = require('../models/Url');
const shortid = require('shortid');

// POST: Create short URL
const createShortUrl = async (req, res) => {
  const { originalUrl, expiry } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: 'originalUrl is required' });
  }

  const shortCode = shortid.generate();
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;

  try {
    const newUrl = new Url({
      originalUrl,
      shortCode,
      shortUrl,
      expiry: expiry ? new Date(expiry) : null
    });
    await newUrl.save();
    res.json({ shortUrl });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// GET: Redirect to original URL
const redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlData = await Url.findOne({ shortCode });

    if (!urlData) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    if (urlData.expiry && new Date() > urlData.expiry) {
      return res.status(410).json({ message: 'This short URL has expired' });
    }

    res.redirect(urlData.originalUrl);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// ✅ GET: Stats for a short URL
const getUrlStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlData = await Url.findOne({ shortCode });

    if (!urlData) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    res.json({
      originalUrl: urlData.originalUrl,
      shortUrl: urlData.shortUrl,
      createdAt: urlData.createdAt,
      expiry: urlData.expiry || 'No expiry set'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlStats
};

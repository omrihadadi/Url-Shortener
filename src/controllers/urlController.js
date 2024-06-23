const Url = require('../models/urlModel');
const { generateShortUrl } = require('../utils/urlUtils');

const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body; 

  try {
    const shortUrl = generateShortUrl();
    console.log(shortUrl);
    const newUrl = await Url.create({ originalUrl, shortUrl });
    res.status(201).json(newUrl);
  }   catch (error) {
    res.status(500).json({ error: 'Failed to create short URL' });
  }
};

const getOriginalUrl = async (req, res) => {
  const { shortUrl } = req.params; // Corrected to extract directly
  console.log(shortUrl);

  try {
    const url = await Url.findOne({ where: { shortUrl } });
    console.log(url.dataValues.originalUrl);
    if (url) {
      res.json({ originalUrl: url.dataValues.originalUrl });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('Error retrieving URL:', error);
    res.status(500).json({ error: 'Failed to retrieve URL' });
  }
};


module.exports = { createShortUrl, getOriginalUrl };

const express = require('express');
const router = express.Router();
const { generateNewShortURL,totalClicks } = require('../controllers/url');

router.post('/', generateNewShortURL);
router.get('/analytics/:shortID', totalClicks);

module.exports = router;

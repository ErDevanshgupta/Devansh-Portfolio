const express = require('express');
const router = express.Router();
const { trackPageView } = require('../controllers/analyticsController');

router.post('/pageview', trackPageView);

module.exports = router;

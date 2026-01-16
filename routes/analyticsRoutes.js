const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware'); // The Bouncer

// Protect this route so only the logged-in user can see their stats
router.get('/summary', protect, getStats);

module.exports = router;
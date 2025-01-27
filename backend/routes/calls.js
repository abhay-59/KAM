const express = require('express');
const router = express.Router();
const { getTodaysCalls } = require('../controllers/calls');
const { protect } = require('../authentication/auth');

// Get Today's Calls
router.get('/today', protect, getTodaysCalls);

module.exports = router;

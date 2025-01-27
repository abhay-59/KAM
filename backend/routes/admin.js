const express = require('express');
const router = express.Router();
const { reassignRestaurants } = require('../controllers/admin');
const { protect, admin } = require('../authentication/auth');

// Reassign Restaurants
router.post('/reassign', protect, admin, reassignRestaurants);

module.exports = router;

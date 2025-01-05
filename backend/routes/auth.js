const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth');
const { protect } = require('../authentication/auth');

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);


module.exports = router;

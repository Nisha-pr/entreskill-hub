const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getProfile } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

// Register a new user
router.post('/register', registerUser)

// Login user
router.post('/login', loginUser)

// Get user profile (protected route)
router.get('/profile', protect, getProfile)

module.exports = router
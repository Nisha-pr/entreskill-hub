const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Function to generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Email is already registered' })
    }

    // Create new user
    const user = await User.create({ name, email, password, role })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check password
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { registerUser, loginUser, getProfile }
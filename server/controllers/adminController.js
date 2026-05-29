const User = require('../models/User')
const Resource = require('../models/Resource')

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all resources (including unapproved)
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({}).sort({ createdAt: -1 })
    res.json(resources)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Approve resource
const approveResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    )
    if (!resource) return res.status(404).json({ message: 'Resource not found' })
    res.json(resource)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete resource
const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id)
    res.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get platform stats
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalMentors = await User.countDocuments({ role: 'mentor' })
    const totalResources = await Resource.countDocuments()
    const pendingResources = await Resource.countDocuments({ approved: false })

    res.json({
      totalUsers,
      totalMentors,
      totalResources,
      pendingResources
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllUsers, deleteUser, getAllResources, approveResource, deleteResource, getStats }
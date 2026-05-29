const Progress = require('../models/Progress')
const Bookmark = require('../models/Bookmark')

// Get user progress
const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Save progress
const saveProgress = async (req, res) => {
  try {
    const { businessIdeaId, businessTitle, completedSteps, totalSteps } = req.body
    let progress = await Progress.findOne({ user: req.user._id, businessIdeaId })
    if (progress) {
      progress.completedSteps = completedSteps
      await progress.save()
    } else {
      progress = await Progress.create({
        user: req.user._id,
        businessIdeaId,
        businessTitle,
        completedSteps,
        totalSteps
      })
    }
    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get bookmarks
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Toggle bookmark
const toggleBookmark = async (req, res) => {
  try {
    const { businessIdeaId, businessTitle, emoji } = req.body
    const existing = await Bookmark.findOne({ user: req.user._id, businessIdeaId })
    if (existing) {
      await Bookmark.findByIdAndDelete(existing._id)
      return res.json({ bookmarked: false })
    }
    await Bookmark.create({ user: req.user._id, businessIdeaId, businessTitle, emoji })
    res.json({ bookmarked: true })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getUserProgress, saveProgress, getBookmarks, toggleBookmark }
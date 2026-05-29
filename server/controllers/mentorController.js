const MentorSession = require('../models/MentorSession')
const User = require('../models/User')

// Get all mentors
const getMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password')
    res.json(mentors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Request a session
const requestSession = async (req, res) => {
  try {
    const { mentorId, message } = req.body
    const session = await MentorSession.create({
      mentor: mentorId,
      mentee: req.user._id,
      message
    })
    res.status(201).json(session)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get mentor's sessions (for mentor dashboard)
const getMentorSessions = async (req, res) => {
  try {
    const sessions = await MentorSession.find({ mentor: req.user._id })
      .populate('mentee', 'name email')
      .sort({ createdAt: -1 })
    res.json(sessions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update session status
const updateSessionStatus = async (req, res) => {
  try {
    const session = await MentorSession.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    res.json(session)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get mentee's sessions
const getMenteeSessions = async (req, res) => {
  try {
    const sessions = await MentorSession.find({ mentee: req.user._id })
      .populate('mentor', 'name email')
      .sort({ createdAt: -1 })
    res.json(sessions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getMentors, requestSession, getMentorSessions, updateSessionStatus, getMenteeSessions }
const mongoose = require('mongoose')

const mentorSessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  message: {
    type: String,
    default: ''
  },
  scheduledAt: {
    type: Date
  }
}, { timestamps: true })

module.exports = mongoose.models.MentorSession || mongoose.model('MentorSession', mentorSessionSchema)
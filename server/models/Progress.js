const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessIdeaId: {
    type: Number,
    required: true
  },
  businessTitle: {
    type: String,
    required: true
  },
  completedSteps: [Number],
  totalSteps: {
    type: Number,
    default: 5
  }
}, { timestamps: true })

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema)
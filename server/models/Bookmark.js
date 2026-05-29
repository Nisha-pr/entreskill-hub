const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
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
  emoji: {
    type: String,
    default: '💡'
  }
}, { timestamps: true })

module.exports = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema)
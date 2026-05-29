const express = require('express')
const router = express.Router()
const { getUserProgress, saveProgress, getBookmarks, toggleBookmark } = require('../controllers/progressController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)
router.get('/', getUserProgress)
router.post('/', saveProgress)
router.get('/bookmarks', getBookmarks)
router.post('/bookmarks', toggleBookmark)

module.exports = router

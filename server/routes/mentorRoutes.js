const express = require('express')
const router = express.Router()
const { getMentors, requestSession, getMentorSessions, updateSessionStatus, getMenteeSessions } = require('../controllers/mentorController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', getMentors)
router.use(protect)
router.post('/sessions', requestSession)
router.get('/sessions/my', getMentorSessions)
router.get('/sessions/mentee', getMenteeSessions)
router.put('/sessions/:id', updateSessionStatus)

module.exports = router
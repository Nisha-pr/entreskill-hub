const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  deleteUser,
  getAllResources,
  approveResource,
  deleteResource,
  getStats
} = require('../controllers/adminController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.use(protect)
router.use(adminOnly)

router.get('/stats', getStats)
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)
router.get('/resources', getAllResources)
router.put('/resources/:id/approve', approveResource)
router.delete('/resources/:id', deleteResource)

module.exports = router
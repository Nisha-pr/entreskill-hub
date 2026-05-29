const express = require('express')
const router = express.Router()
const {
  getResources,
  getResourceById,
  createResource,
  seedResources
} = require('../controllers/resourceController')
const { protect } = require('../middleware/authMiddleware')

router.get('/seed', seedResources)
router.get('/', getResources)
router.get('/:id', getResourceById)
router.post('/', protect, createResource)

module.exports = router
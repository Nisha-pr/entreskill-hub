const Resource = require('../models/Resource')

// Get all approved resources
const getResources = async (req, res) => {
  try {
    const { type, category } = req.query
    const filter = { approved: true }
    if (type) filter.type = type
    if (category) filter.category = category

    const resources = await Resource.find(filter).sort({ createdAt: -1 })
    res.json(resources)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get single resource
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })
    res.json(resource)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create resource (mentor only)
const createResource = async (req, res) => {
  try {
    const { title, type, category, description, url, duration, level, tags } = req.body
    const resource = await Resource.create({
      title, type, category, description,
      url, duration, level, tags,
      uploadedBy: req.user._id,
      approved: false
    })
    res.status(201).json(resource)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Seed sample resources (admin)
const seedResources = async (req, res) => {
  try {
    await Resource.deleteMany({})
    const samples = [
      {
        title: 'How to Start a Tailoring Business from Home',
        type: 'video',
        category: 'Tailoring',
        description: 'Complete guide on setting up your home tailoring business, from equipment to pricing.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '18 mins',
        level: 'beginner',
        tags: ['tailoring', 'home business', 'fashion'],
        approved: true
      },
      {
        title: 'Food Business Registration in India — Step by Step',
        type: 'article',
        category: 'Food Business',
        description: 'Learn about FSSAI registration, GST, and other legal requirements for food businesses.',
        url: '',
        duration: '8 min read',
        level: 'beginner',
        tags: ['food', 'legal', 'FSSAI', 'registration'],
        approved: true
      },
      {
        title: 'Digital Marketing Basics for Small Businesses',
        type: 'video',
        category: 'Digital Marketing',
        description: 'Learn Instagram, Facebook, and WhatsApp marketing for your micro-business.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '25 mins',
        level: 'beginner',
        tags: ['marketing', 'social media', 'digital'],
        approved: true
      },
      {
        title: 'Business Launch Checklist for First-Time Entrepreneurs',
        type: 'checklist',
        category: 'General',
        description: 'A complete checklist covering legal, financial, marketing, and operational steps.',
        url: '',
        duration: '5 min read',
        level: 'beginner',
        tags: ['checklist', 'startup', 'launch'],
        approved: true
      },
      {
        title: 'How to Price Your Handmade Products',
        type: 'article',
        category: 'Handicrafts',
        description: 'Learn the formula for pricing handmade goods profitably on Etsy, Meesho, and Instagram.',
        url: '',
        duration: '6 min read',
        level: 'intermediate',
        tags: ['pricing', 'handicrafts', 'online selling'],
        approved: true
      },
      {
        title: 'Photography Business Setup Guide',
        type: 'video',
        category: 'Photography',
        description: 'From buying your first camera to getting your first paid client — complete walkthrough.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '32 mins',
        level: 'beginner',
        tags: ['photography', 'freelance', 'business'],
        approved: true
      },
      {
        title: 'GST Registration Checklist for Small Businesses',
        type: 'checklist',
        category: 'Legal',
        description: 'Step-by-step checklist for GST registration, filing, and compliance.',
        url: '',
        duration: '4 min read',
        level: 'intermediate',
        tags: ['GST', 'legal', 'tax', 'registration'],
        approved: true
      },
      {
        title: 'How to Sell on Meesho — Beginner Guide',
        type: 'article',
        category: 'E-Commerce',
        description: 'Complete guide to listing products, pricing, and getting orders on Meesho.',
        url: '',
        duration: '10 min read',
        level: 'beginner',
        tags: ['meesho', 'ecommerce', 'selling online'],
        approved: true
      },
      {
        title: 'Home Tiffin Service — Complete Startup Checklist',
        type: 'checklist',
        category: 'Food Business',
        description: 'Everything you need before launching your tiffin service — equipment, pricing, and clients.',
        url: '',
        duration: '5 min read',
        level: 'beginner',
        tags: ['tiffin', 'food', 'checklist', 'startup'],
        approved: true
      },
    ]
    await Resource.insertMany(samples)
    res.json({ message: 'Sample resources seeded successfully', count: samples.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getResources, getResourceById, createResource, seedResources }
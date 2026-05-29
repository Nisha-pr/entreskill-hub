import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const allIdeas = [
  {
    id: 1,
    title: 'Boutique / Tailoring Shop',
    skill: 'Tailoring',
    desc: 'Start a custom stitching service from home or a small shop.',
    investment: '₹5,000 - ₹20,000',
    time: '1-2 months',
    emoji: '👗'
  },
  {
    id: 2,
    title: 'Home Tiffin Service',
    skill: 'Cooking',
    desc: 'Deliver homemade food to office workers and students.',
    investment: '₹2,000 - ₹8,000',
    time: '2-4 weeks',
    emoji: '🍱'
  },
  {
    id: 3,
    title: 'Handmade Crafts Online',
    skill: 'Handicrafts',
    desc: 'Sell handmade products on Meesho, Etsy, or Instagram.',
    investment: '₹1,000 - ₹5,000',
    time: '1-2 weeks',
    emoji: '🎨'
  },
  {
    id: 4,
    title: 'Social Media Manager',
    skill: 'Digital Marketing',
    desc: 'Manage social media accounts for local businesses.',
    investment: '₹0 - ₹2,000',
    time: '1 week',
    emoji: '📱'
  },
  {
    id: 5,
    title: 'Photography Studio',
    skill: 'Photography',
    desc: 'Offer photography services for events, products, and portraits.',
    investment: '₹10,000 - ₹50,000',
    time: '2-3 months',
    emoji: '📸'
  },
  {
    id: 6,
    title: 'Home Tuition',
    skill: 'Teaching',
    desc: 'Teach students at home or online.',
    investment: '₹0 - ₹1,000',
    time: '1 week',
    emoji: '📚'
  },
  {
    id: 7,
    title: 'Beauty Parlour',
    skill: 'Beautician',
    desc: 'Provide beauty services from home — makeup, mehendi, and facial.',
    investment: '₹5,000 - ₹15,000',
    time: '2-4 weeks',
    emoji: '💄'
  },
  {
    id: 8,
    title: 'Freelance Content Writer',
    skill: 'Content Writing',
    desc: 'Write content for blogs, websites, and social media.',
    investment: '₹0',
    time: '1 week',
    emoji: '✍️'
  },
]

const BusinessIdeas = () => {
  const [ideas, setIdeas] = useState(allIdeas)
  const [saved, setSaved] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const skills = JSON.parse(localStorage.getItem('userSkills') || '[]')
    if (skills.length > 0) {
      const filtered = allIdeas.filter(idea => skills.includes(idea.skill))
      setIdeas(filtered.length > 0 ? filtered : allIdeas)
    }
  }, [])

  const toggleSave = (id) => {
    setSaved(saved.includes(id) ? saved.filter(s => s !== id) : [...saved, id])
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Ideas</h1>
      <p className="text-gray-500 mb-8">
        Best business opportunities based on your skills
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map(idea => (
          <div
            key={idea.id}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all"
          >
            <div className="text-4xl mb-3">{idea.emoji}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {idea.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{idea.desc}</p>

            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>💰 {idea.investment}</span>
              <span>⏱ {idea.time}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/roadmap/${idea.id}`)}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
              >
                View Roadmap
              </button>

              <button
                onClick={() => toggleSave(idea.id)}
                className={`px-3 py-2 rounded-lg text-sm border-2 ${
                  saved.includes(idea.id)
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-600'
                    : 'border-gray-300 text-gray-400 hover:border-yellow-400'
                }`}
              >
                {saved.includes(idea.id) ? '★' : '☆'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusinessIdeas
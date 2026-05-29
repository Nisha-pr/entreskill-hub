import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [savedIdeas] = useState([
    { id: 1, title: 'Boutique / Tailoring Shop', emoji: '👗', progress: 60 },
    { id: 2, title: 'Home Tiffin Service', emoji: '🍱', progress: 20 },
  ])
  const [recentResources] = useState([
    { title: 'How to Start a Tailoring Business', type: 'video', duration: '18 mins' },
    { title: 'Food Business Registration Guide', type: 'article', duration: '8 min read' },
    { title: 'Business Launch Checklist', type: 'checklist', duration: '5 min read' },
  ])

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  const typeColor = {
    video: 'bg-red-100 text-red-600',
    article: 'bg-blue-100 text-blue-600',
    checklist: 'bg-green-100 text-green-600',
  }

  const typeIcon = {
    video: '🎥',
    article: '📄',
    checklist: '✅',
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-indigo-200">
              Continue your entrepreneurship journey from where you left off.
            </p>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{savedIdeas.length}</p>
            <p className="text-indigo-200 text-xs">Saved Ideas</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">
              {Math.round(savedIdeas.reduce((a, b) => a + b.progress, 0) / savedIdeas.length)}%
            </p>
            <p className="text-indigo-200 text-xs">Avg Progress</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{recentResources.length}</p>
            <p className="text-indigo-200 text-xs">Resources</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Saved Business Ideas */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">My Business Ideas</h2>
              <Link to="/ideas" className="text-indigo-600 text-sm hover:underline">
                Browse More →
              </Link>
            </div>
            <div className="space-y-4">
              {savedIdeas.map(idea => (
                <div key={idea.id} className="border border-gray-100 rounded-xl p-4 hover:border-indigo-200 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{idea.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{idea.title}</p>
                        <p className="text-xs text-gray-400">Roadmap {idea.progress}% complete</p>
                      </div>
                    </div>
                    <Link
                      to={`/roadmap/${idea.id}`}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700"
                    >
                      Continue
                    </Link>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${idea.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Resources */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">Recent Resources</h2>
              <Link to="/resources" className="text-indigo-600 text-sm hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentResources.map((res, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{typeIcon[res.type]}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{res.title}</p>
                      <p className="text-xs text-gray-400">{res.duration}</p>
                    </div>
                  </div>
                  <span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + typeColor[res.type]}>
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Profile</h2>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <span className="mt-2 inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {user.role}
              </span>
            </div>
            <Link
              to="/skills"
              className="block w-full text-center bg-indigo-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Update Skills
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: '🎯', label: 'Take Skill Assessment', path: '/skills' },
                { icon: '💡', label: 'Browse Business Ideas', path: '/ideas' },
                { icon: '📚', label: 'View Resources', path: '/resources' },
                { icon: '👨‍🏫', label: 'Find a Mentor', path: '/mentors' },
              ].map((action, i) => (
                <Link
                  key={i}
                  to={action.path}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all text-sm font-medium"
                >
                  <span className="text-lg">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Next Steps</h2>
            <div className="space-y-2">
              {[
                'Complete your skill profile',
                'Choose a business idea',
                'Follow a roadmap',
                'Connect with a mentor',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React, { useState } from 'react'
import MentorChat from '../../components/MentorChat'
import LocationMap from '../../components/LocationMap'

const mentors = [
  {
    id: 1, name: 'Priya Sharma', expertise: 'Fashion & Tailoring',
    experience: '8 years', location: 'Delhi', rating: 4.8, emoji: '👩‍🎨',
    bio: 'Expert in boutique setup, fabric sourcing, and fashion entrepreneurship.',
    sessions: 'Mon, Wed, Fri — 10am to 12pm', contact: 'priya@entreskill.com'
  },
  {
    id: 2, name: 'Rajan Verma', expertise: 'Food Business',
    experience: '12 years', location: 'Mumbai', rating: 4.9, emoji: '👨‍🍳',
    bio: 'Helped 50+ entrepreneurs launch tiffin services and cloud kitchens.',
    sessions: 'Tue, Thu — 2pm to 5pm', contact: 'rajan@entreskill.com'
  },
  {
    id: 3, name: 'Sunita Devi', expertise: 'Handicrafts & Arts',
    experience: '6 years', location: 'Jaipur', rating: 4.7, emoji: '👩‍🏫',
    bio: 'Specializes in online selling of handmade crafts on Etsy and Meesho.',
    sessions: 'Daily — 9am to 11am', contact: 'sunita@entreskill.com'
  },
  {
    id: 4, name: 'Amit Kumar', expertise: 'Digital Marketing',
    experience: '5 years', location: 'Bangalore', rating: 4.6, emoji: '👨‍💻',
    bio: 'Social media strategy, SEO, and paid ads for small businesses.',
    sessions: 'Mon to Fri — 6pm to 8pm', contact: 'amit@entreskill.com'
  },
  {
    id: 5, name: 'Meena Patel', expertise: 'Beauty & Wellness',
    experience: '10 years', location: 'Ahmedabad', rating: 4.8, emoji: '💆‍♀️',
    bio: 'Guidance on setting up beauty parlours and wellness centers.',
    sessions: 'Sat, Sun — 11am to 2pm', contact: 'meena@entreskill.com'
  },
  {
    id: 6, name: 'Sandeep Yadav', expertise: 'Photography',
    experience: '7 years', location: 'Lucknow', rating: 4.5, emoji: '📸',
    bio: 'Wedding and product photography business setup and client acquisition.',
    sessions: 'Wed, Sat — 3pm to 6pm', contact: 'sandeep@entreskill.com'
  },
]

const MentorDirectory = () => {
  const [search, setSearch] = useState('')
  const [activeChat, setActiveChat] = useState(null)
  const [requested, setRequested] = useState([])
  const [activeTab, setActiveTab] = useState('mentors')

  const filtered = mentors.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.expertise.toLowerCase().includes(search.toLowerCase()) ||
    m.location.toLowerCase().includes(search.toLowerCase())
  )

  const handleConnect = (mentorId) => {
    if (!requested.includes(mentorId)) {
      setRequested(prev => [...prev, mentorId])
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mentor Directory</h1>
      <p className="text-gray-500 mb-6">Connect with expert mentors and find your local community</p>

      <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('mentors')}
          className={'px-6 py-2 rounded-lg font-medium text-sm transition-all ' + (activeTab === 'mentors' ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-700')}
        >
          Mentors
        </button>
        <button
          onClick={() => setActiveTab('location')}
          className={'px-6 py-2 rounded-lg font-medium text-sm transition-all ' + (activeTab === 'location' ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-700')}
        >
          Find Nearby
        </button>
      </div>

      {activeTab === 'mentors' && (
        <>
          <input
            type="text"
            placeholder="Search by name, expertise, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(mentor => (
              <div key={mentor.id} className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="text-4xl mb-3">{mentor.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-800">{mentor.name}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-1">{mentor.expertise}</p>
                <p className="text-gray-400 text-sm mb-2">📍 {mentor.location} • {mentor.experience} experience</p>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{mentor.bio}</p>
                <p className="text-xs text-gray-400 mb-4">🕐 {mentor.sessions}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-500 font-semibold">⭐ {mentor.rating}</span>
                  {requested.includes(mentor.id) && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">✓ Connected</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveChat(mentor)}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    💬 Chat
                  </button>
                  <button
                    onClick={() => handleConnect(mentor.id)}
                    className={'flex-1 py-2 rounded-xl text-sm font-medium transition-colors border-2 ' + (requested.includes(mentor.id) ? 'bg-green-50 border-green-400 text-green-600' : 'border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600')}
                  >
                    {requested.includes(mentor.id) ? '✓ Requested' : '+ Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'location' && <LocationMap />}

      {activeChat && (
        <MentorChat mentor={activeChat} onClose={() => setActiveChat(null)} />
      )}
    </div>
  )
}

export default MentorDirectory

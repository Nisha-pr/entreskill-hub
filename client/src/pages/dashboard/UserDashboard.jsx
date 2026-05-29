import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    emoji: '🎯',
    title: 'Skill Assessment',
    desc: 'Identify your skills and interests to find the perfect business match.',
    link: '/skills',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    emoji: '💡',
    title: 'Business Ideas',
    desc: 'Discover curated business opportunities aligned with your skillset.',
    link: '/ideas',
    color: 'from-orange-400 to-pink-500'
  },
  {
    emoji: '🗺️',
    title: 'Roadmap',
    desc: 'Follow a step-by-step plan to launch your micro-business successfully.',
    link: '/ideas',
    color: 'from-teal-400 to-cyan-500'
  },
  {
    emoji: '👨‍🏫',
    title: 'Expert Mentors',
    desc: 'Connect with experienced mentors who guide you through every stage.',
    link: '/mentors',
    color: 'from-green-400 to-emerald-600'
  },
]

const stats = [
  { value: '0', label: 'Entrepreneurs' },
  { value: '0', label: 'Business Ideas' },
  { value: '0', label: 'Expert Mentors' },
  { value: '0%', label: 'Success Rate' },
]

const UserDashboard = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)),
            url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <span className="bg-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 inline-block">
            🚀 Turn Your Skill Into a Business
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Skills Deserve
            <span className="text-indigo-400"> More</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            EntreSkill Hub helps you discover business opportunities, follow structured roadmaps,
            and connect with expert mentors — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg"
            >
              Get Started Free →
            </Link>
            <Link
              to="/mentors"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-40 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm"
            >
              Find a Mentor
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-indigo-700 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-indigo-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Everything You Need</h2>
          <p className="text-gray-500 text-lg">From idea to income — we guide every step</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Link
              to={f.link}
              key={i}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${f.color}`} />
              <div className="p-6">
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">Three simple steps to launch your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Assess Your Skills', desc: 'Tell us your skills and interests through a quick assessment.' },
              { step: '02', title: 'Choose a Business', desc: 'Get personalized business ideas matched to your profile.' },
              { step: '03', title: 'Follow the Roadmap', desc: 'Use our step-by-step plan and mentor support to launch.' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-indigo-700 group-hover:scale-110 transition-all">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div
        className="py-20 text-white text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(67,56,202,0.92), rgba(109,40,217,0.92)),
            url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-indigo-200 text-lg mb-8">
            Join thousands of entrepreneurs who turned their skills into successful businesses.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-700 px-10 py-4 rounded-xl text-lg font-bold hover:bg-indigo-50 transition-all hover:scale-105 inline-block shadow-lg"
          >
            Join EntreSkill Hub Free →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
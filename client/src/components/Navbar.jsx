import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinks = [
    { path: '/skills', label: 'Skills', icon: '🎯' },
    { path: '/ideas', label: 'Ideas', icon: '💡' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/mentors', label: 'Mentors', icon: '👨‍🏫' },
  ]

  const isActive = (path) => location.pathname === path

  const getDashboardLink = () => {
    if (!user) return null
    if (user.role === 'admin') return { path: '/admin', label: 'Admin', color: 'bg-gray-800 hover:bg-gray-900' }
    if (user.role === 'mentor') return { path: '/mentor-dashboard', label: 'My Dashboard', color: 'bg-purple-600 hover:bg-purple-700' }
    return { path: '/dashboard', label: 'Dashboard', color: 'bg-indigo-500 hover:bg-indigo-600' }
  }

  const dashLink = getDashboardLink()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-700 shadow-lg py-3">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-indigo-700 font-bold text-lg group-hover:bg-indigo-100 transition-colors">
            E
          </div>
          <span className="text-xl font-bold text-white">
            EntreSkill <span className="text-indigo-300">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-white text-indigo-700 shadow-md'
                  : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-indigo-700 text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </div>
              {dashLink && (
                <Link
                  to={dashLink.path}
                  className={`text-white px-3 py-2 rounded-xl text-xs font-medium transition-colors ${dashLink.color}`}
                >
                  {dashLink.label}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-indigo-100 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-indigo-600">
                Login
              </Link>
              <Link to="/register" className="bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:scale-105">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl text-white hover:bg-indigo-600 transition-colors"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-800 mx-4 mt-2 rounded-2xl p-4 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-white text-indigo-700'
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-indigo-600 pt-2 mt-2">
            {user ? (
              <div className="space-y-2">
                {dashLink && (
                  <Link
                    to={dashLink.path}
                    onClick={() => setMenuOpen(false)}
                    className="block text-center py-3 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500"
                  >
                    {dashLink.label}
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false) }}
                  className="w-full bg-red-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="block text-center py-3 rounded-xl text-sm font-medium text-indigo-100 hover:bg-indigo-700">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="block text-center bg-white text-indigo-700 py-3 rounded-xl text-sm font-bold hover:bg-indigo-50">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
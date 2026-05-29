import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

const MentorDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [resourceForm, setResourceForm] = useState({
    title: '', type: 'video', category: 'General',
    description: '', url: '', duration: '', level: 'beginner'
  })
  const [submitMsg, setSubmitMsg] = useState('')

  const getHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  }), [user])

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await API.get('/mentors/sessions/my', getHeaders())
      setSessions(data)
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
    setLoading(false)
  }, [getHeaders])

  useEffect(() => {
    if (!user || user.role !== 'mentor') {
      navigate('/')
      return
    }
    fetchSessions()
  }, [user, navigate, fetchSessions])

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/mentors/sessions/${id}`, { status }, getHeaders())
      setSessions(sessions.map(s => s._id === id ? { ...s, status } : s))
    } catch (error) {
      alert('Failed to update status')
    }
  }

  const handleResourceSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/resources', resourceForm, getHeaders())
      setSubmitMsg('Resource submitted for admin approval!')
      setResourceForm({
        title: '', type: 'video', category: 'General',
        description: '', url: '', duration: '', level: 'beginner'
      })
    } catch (error) {
      setSubmitMsg('Failed to submit resource.')
    }
  }

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-600',
    accepted: 'bg-green-100 text-green-600',
    rejected: 'bg-red-100 text-red-600',
    completed: 'bg-blue-100 text-blue-600',
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'sessions', label: 'Sessions', icon: '📅' },
    { id: 'upload', label: 'Upload Resource', icon: '📤' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Mentor Dashboard</h1>
            <p className="text-indigo-200">Welcome back, {user.name}!</p>
          </div>
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{sessions.length}</p>
            <p className="text-indigo-200 text-xs">Total Sessions</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{sessions.filter(s => s.status === 'pending').length}</p>
            <p className="text-indigo-200 text-xs">Pending</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{sessions.filter(s => s.status === 'completed').length}</p>
            <p className="text-indigo-200 text-xs">Completed</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={'px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ' + (activeTab === tab.id ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-700')}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Session Requests</h2>
            {sessions.length === 0 ? (
              <p className="text-gray-400 text-sm">No session requests yet.</p>
            ) : (
              <div className="space-y-3">
                {sessions.slice(0, 4).map(session => (
                  <div key={session._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{session.mentee?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-400">{new Date(session.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + statusColor[session.status]}>
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: '📅', label: 'View All Sessions', action: () => setActiveTab('sessions') },
                { icon: '📤', label: 'Upload New Resource', action: () => setActiveTab('upload') },
              ].map((item, i) => (
                <button key={i} onClick={item.action}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all text-sm font-medium">
                  <span>{item.icon}</span>{item.label}
                </button>
              ))}
              {[
                { icon: '👥', label: 'Browse Mentors', path: '/mentors' },
                { icon: '📚', label: 'View Resources', path: '/resources' },
              ].map((item, i) => (
                <Link key={i} to={item.path}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all text-sm font-medium">
                  <span>{item.icon}</span>{item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">All Session Requests ({sessions.length})</h2>
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500">No session requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map(session => (
                <div key={session._id} className="border border-gray-100 rounded-xl p-5 hover:border-indigo-200 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">{session.mentee?.name || 'Unknown User'}</p>
                      <p className="text-sm text-gray-400">{session.mentee?.email}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(session.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + statusColor[session.status]}>
                      {session.status}
                    </span>
                  </div>
                  {session.message && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">"{session.message}"</p>
                  )}
                  {session.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleStatusUpdate(session._id, 'accepted')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                        Accept
                      </button>
                      <button onClick={() => handleStatusUpdate(session._id, 'rejected')}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-600 transition-colors">
                        Reject
                      </button>
                    </div>
                  )}
                  {session.status === 'accepted' && (
                    <button onClick={() => handleStatusUpdate(session._id, 'completed')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Upload Training Resource</h2>
          {submitMsg && (
            <div className={'px-4 py-3 rounded-xl mb-4 text-sm font-medium ' + (submitMsg.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
              {submitMsg}
            </div>
          )}
          <form onSubmit={handleResourceSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={resourceForm.title}
                onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })}
                placeholder="Resource title"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={resourceForm.type}
                  onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="checklist">Checklist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select value={resourceForm.level}
                  onChange={e => setResourceForm({ ...resourceForm, level: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input type="text" value={resourceForm.category}
                  onChange={e => setResourceForm({ ...resourceForm, category: e.target.value })}
                  placeholder="e.g. Tailoring"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" value={resourceForm.duration}
                  onChange={e => setResourceForm({ ...resourceForm, duration: e.target.value })}
                  placeholder="e.g. 15 mins"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL (for videos)</label>
              <input type="text" value={resourceForm.url}
                onChange={e => setResourceForm({ ...resourceForm, url: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={4} value={resourceForm.description}
                onChange={e => setResourceForm({ ...resourceForm, description: e.target.value })}
                placeholder="Describe what this resource covers..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                required />
            </div>
            <button type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Submit for Approval
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default MentorDashboard

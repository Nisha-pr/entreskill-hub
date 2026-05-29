import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

const AdminDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate])

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${user.token}` }
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, usersRes, resourcesRes] = await Promise.all([
        API.get('/admin/stats', getHeaders()),
        API.get('/admin/users', getHeaders()),
        API.get('/admin/resources', getHeaders()),
      ])
      setStats(statsRes.data)
      setUsers(usersRes.data)
      setResources(resourcesRes.data)
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    }
    setLoading(false)
  }

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await API.delete(`/admin/users/${id}`, getHeaders())
      setUsers(users.filter(u => u._id !== id))
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  const handleApproveResource = async (id) => {
    try {
      await API.put(`/admin/resources/${id}/approve`, {}, getHeaders())
      setResources(resources.map(r => r._id === id ? { ...r, approved: true } : r))
    } catch (error) {
      alert('Failed to approve resource')
    }
  }

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return
    try {
      await API.delete(`/admin/resources/${id}`, getHeaders())
      setResources(resources.filter(r => r._id !== id))
    } catch (error) {
      alert('Failed to delete resource')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading admin data...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'resources', label: 'Resources', icon: '📚' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-400">Manage users, content, and platform settings</p>
          </div>
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
            A
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Users', value: stats.totalUsers || 0, icon: '👥', color: 'bg-blue-50 text-blue-600' },
              { label: 'Total Mentors', value: stats.totalMentors || 0, icon: '👨‍🏫', color: 'bg-purple-50 text-purple-600' },
              { label: 'Total Resources', value: stats.totalResources || 0, icon: '📚', color: 'bg-green-50 text-green-600' },
              { label: 'Pending Approval', value: stats.pendingResources || 0, icon: '⏳', color: 'bg-yellow-50 text-yellow-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map(u => (
                    <tr key={u._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-800">{u.name}</td>
                      <td className="py-3 text-gray-500">{u.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          u.role === 'admin' ? 'bg-red-100 text-red-600' :
                          u.role === 'mentor' ? 'bg-purple-100 text-purple-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              All Users ({users.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">{u.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        u.role === 'admin' ? 'bg-red-100 text-red-600' :
                        u.role === 'mentor' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              All Resources ({resources.length})
            </h2>
            <div className="flex gap-2 text-xs">
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                {resources.filter(r => r.approved).length} Approved
              </span>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium">
                {resources.filter(r => !r.approved).length} Pending
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {resources.map(resource => (
              <div
                key={resource._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {resource.type === 'video' ? '🎥' : resource.type === 'article' ? '📄' : '✅'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{resource.title}</p>
                    <p className="text-xs text-gray-400">{resource.category} • {resource.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resource.approved ? (
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                      ✓ Approved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApproveResource(resource._id)}
                      className="bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteResource(resource._id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
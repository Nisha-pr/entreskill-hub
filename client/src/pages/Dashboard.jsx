import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserProgressAPI, deleteProgressAPI } from '../services/api'

const Dashboard = () => {
  const { user } = useAuth()
  const [progressList, setProgressList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    try {
      const res = await getUserProgressAPI()
      setProgressList(res.data)
    } catch (err) {
      console.error('Failed to fetch progress', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (roadmapId) => {
    if (!window.confirm('Remove this roadmap from your dashboard?')) return
    try {
      await deleteProgressAPI(roadmapId)
      setProgressList(progressList.filter(p => p.roadmapId !== roadmapId))
    } catch (err) {
      console.error('Failed to delete', err)
    }
  }

  const totalStarted = progressList.length
  const totalCompleted = progressList.filter(
    p => p.completedSteps.length === p.totalSteps
  ).length
  const avgProgress = totalStarted === 0 ? 0 : Math.round(
    progressList.reduce((sum, p) =>
      sum + Math.round((p.completedSteps.length / p.totalSteps) * 100), 0
    ) / totalStarted
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-indigo-200 text-sm font-medium mb-1">Welcome back,</p>
          <h1 className="text-3xl font-extrabold mb-1">{user?.name} 👋</h1>
          <p className="text-indigo-200">Track your business journey from here.</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-extrabold">{totalStarted}</div>
              <div className="text-indigo-200 text-xs mt-1">Roadmaps Started</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-extrabold">{totalCompleted}</div>
              <div className="text-indigo-200 text-xs mt-1">Completed</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-extrabold">{avgProgress}%</div>
              <div className="text-indigo-200 text-xs mt-1">Avg Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-5">My Roadmaps</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-2xl h-40 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : progressList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">🗺</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No roadmaps started yet</h3>
            <p className="text-gray-400 text-sm mb-6">
              Go to Business Ideas and start your first roadmap!
            </p>
            <Link
              to="/ideas"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Ideas →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressList.map((p) => {
              const pct = Math.round((p.completedSteps.length / p.totalSteps) * 100)
              const isComplete = pct === 100
              return (
                <div
                  key={p.roadmapId}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.roadmapEmoji}</span>
                      <div>
                        <h3 className="font-bold text-gray-800 text-base leading-snug">
                          {p.roadmapTitle}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {p.completedSteps.length}/{p.totalSteps} steps done
                        </p>
                      </div>
                    </div>
                    {isComplete && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        ✓ Done
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        isComplete ? 'bg-green-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-4">{pct}% complete</p>

                  <div className="flex gap-2">
                    <Link
                      to={`/roadmap/${p.roadmapId}`}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition-colors"
                    >
                      {isComplete ? 'Review' : 'Continue →'}
                    </Link>
                    <button
                      onClick={() => handleDelete(p.roadmapId)}
                      className="w-10 h-10 rounded-xl border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400 flex items-center justify-center transition-all"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/resources"
            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-indigo-100 transition-colors">
              📚
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Learning Resources</h3>
              <p className="text-gray-400 text-sm">Videos, articles, checklists</p>
            </div>
            <span className="ml-auto text-gray-300 group-hover:text-indigo-500 transition-colors">→</span>
          </Link>

          <Link
            to="/mentors"
            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-purple-100 transition-colors">
              👨‍🏫
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Find a Mentor</h3>
              <p className="text-gray-400 text-sm">Get expert guidance</p>
            </div>
            <span className="ml-auto text-gray-300 group-hover:text-purple-500 transition-colors">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
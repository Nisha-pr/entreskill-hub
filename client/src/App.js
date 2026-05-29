import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/dashboard/UserDashboard'
import Dashboard from './pages/dashboard/Dashboard'
import SkillAssessment from './pages/skills/SkillAssessment'
import BusinessIdeas from './pages/ideas/BusinessIdeas'
import RoadmapDetail from './pages/roadmap/RoadmapDetail'
import MentorDirectory from './pages/mentors/MentorDirectory'
import Resources from './pages/resources/Resources'
import AdminDashboard from './pages/admin/AdminDashboard'
import MentorDashboard from './pages/mentor/MentorDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/skills" element={<SkillAssessment />} />
            <Route path="/ideas" element={<BusinessIdeas />} />
            <Route path="/roadmap/:id" element={<RoadmapDetail />} />
            <Route path="/mentors" element={<MentorDirectory />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

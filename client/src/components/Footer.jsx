import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-3">EntreSkill Hub</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering individuals to convert their skills into sustainable micro-businesses.
              Your journey from skill to startup starts here.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/skills" className="hover:text-white transition-colors">Skill Assessment</Link></li>
              <li><Link to="/ideas" className="hover:text-white transition-colors">Business Ideas</Link></li>
              <li><Link to="/mentors" className="hover:text-white transition-colors">Find Mentors</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 support@entreskill.com</li>
              <li>📍 Lucknow, India</li>
              <li>🕐 Mon-Sat, 9am-6pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2026 EntreSkill Hub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
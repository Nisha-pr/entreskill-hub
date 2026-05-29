import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const roadmaps = {
  1: {
    title: 'Boutique / Tailoring Shop',
    emoji: '👗',
    steps: [
      { id: 1, title: 'Validate Your Idea', desc: 'Check demand in your area. Ask 10-15 people whether they would use stitching services.' },
      { id: 2, title: 'Create Skills & Tools List', desc: 'Sewing machine, scissors, measuring tape, fabric. Basic stitching skills are required.' },
      { id: 3, title: 'Legal Registration', desc: 'GST registration (if turnover > 20L). Obtain a local municipal license.' },
      { id: 4, title: 'Estimate Costs', desc: 'Sewing machine: ₹8,000-15,000. Fabric stock: ₹3,000-5,000. Marketing: ₹1,000-2,000.' },
      { id: 5, title: 'Start Marketing', desc: 'Create WhatsApp status and Instagram page. Offer discounts to your first 10 customers.' },
    ]
  },
  2: {
    title: 'Home Tiffin Service',
    emoji: '🍱',
    steps: [
      { id: 1, title: 'Market Research', desc: 'Identify nearby offices, hostels, and PGs. Plan a monthly subscription model.' },
      { id: 2, title: 'Plan Your Menu', desc: 'Create a weekly rotating menu. Focus on hygiene and packaging.' },
      { id: 3, title: 'Obtain FSSAI License', desc: 'Basic FSSAI registration is mandatory for food businesses. Apply online.' },
      { id: 4, title: 'Set Pricing', desc: 'Monthly: ₹1,500-2,500 per customer. Daily tiffin: ₹80-150 per meal.' },
      { id: 5, title: 'Set Up Delivery', desc: 'Deliver yourself or hire a local delivery person. You can also list on Swiggy/Zomato.' },
    ]
  },
}

const defaultRoadmap = {
  title: 'Business Roadmap',
  emoji: '🚀',
  steps: [
    { id: 1, title: 'Validate Your Idea', desc: 'Check market demand and identify target customers.' },
    { id: 2, title: 'List Skills & Resources', desc: 'Identify required tools, skills, and training.' },
    { id: 3, title: 'Complete Legal Requirements', desc: 'Obtain necessary registrations, licenses, and permits.' },
    { id: 4, title: 'Create Budget Plan', desc: 'Estimate startup costs and decide funding sources.' },
    { id: 5, title: 'Start Marketing', desc: 'Use social media, word of mouth, and local promotions to attract customers.' },
  ]
}

const RoadmapDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [completed, setCompleted] = useState([])

  const roadmap = roadmaps[id] || defaultRoadmap

  const toggleStep = (stepId) => {
    setCompleted(
      completed.includes(stepId)
        ? completed.filter(s => s !== stepId)
        : [...completed, stepId]
    )
  }

  const progress = Math.round((completed.length / roadmap.steps.length) * 100)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate('/ideas')}
        className="text-indigo-600 hover:underline mb-6 block"
      >
        ← Back to Ideas
      </button>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{roadmap.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{roadmap.title}</h1>
          <p className="text-gray-500">Step-by-step business roadmap</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-3 mb-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mb-8">
        {progress}% complete — {completed.length}/{roadmap.steps.length} steps completed
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {roadmap.steps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              completed.includes(step.id)
                ? 'bg-green-50 border-green-400'
                : 'bg-white border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  completed.includes(step.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                {completed.includes(step.id) ? '✓' : index + 1}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {progress === 100 && (
        <div className="mt-8 bg-green-50 border-2 border-green-400 rounded-2xl p-6 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <h3 className="text-xl font-bold text-green-700 mb-1">
            Roadmap Complete!
          </h3>
          <p className="text-green-600 text-sm">
            Congratulations! You have completed all steps. It is now time to launch your business!
          </p>
        </div>
      )}
    </div>
  )
}

export default RoadmapDetail
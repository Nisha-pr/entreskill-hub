import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const skillsList = [
  'Tailoring', 'Cooking', 'Handicrafts', 'Digital Marketing',
  'Photography', 'Repair Services', 'Teaching', 'Beautician',
  'Farming', 'Coding', 'Content Writing', 'Yoga/Fitness'
]

const interestsList = [
  'Fashion', 'Food', 'Technology', 'Education', 'Health',
  'Art & Craft', 'Agriculture', 'Beauty', 'Home Services', 'Media'
]

const SkillAssessment = () => {
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedInterests, setSelectedInterests] = useState([])
  const navigate = useNavigate()

  const toggle = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleSubmit = () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill!')
      return
    }
    localStorage.setItem('userSkills', JSON.stringify(selectedSkills))
    localStorage.setItem('userInterests', JSON.stringify(selectedInterests))
    navigate('/ideas')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Skill Assessment</h1>
      <p className="text-gray-500 mb-8">Select your skills and interests</p>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skillsList.map(skill => (
            <button
              key={skill}
              onClick={() => toggle(skill, selectedSkills, setSelectedSkills)}
              className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
                selectedSkills.includes(skill)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Interests</h2>
        <div className="flex flex-wrap gap-3">
          {interestsList.map(interest => (
            <button
              key={interest}
              onClick={() => toggle(interest, selectedInterests, setSelectedInterests)}
              className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
                selectedInterests.includes(interest)
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700"
      >
        View Business Ideas →
      </button>
    </div>
  )
}

export default SkillAssessment
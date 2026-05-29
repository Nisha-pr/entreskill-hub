import React, { useState } from 'react'

const cities = [
  { name: 'Delhi', mentors: 12, entrepreneurs: 340, lat: 28.6, lng: 77.2 },
  { name: 'Mumbai', mentors: 18, entrepreneurs: 520, lat: 19.0, lng: 72.8 },
  { name: 'Bangalore', mentors: 15, entrepreneurs: 410, lat: 12.9, lng: 77.5 },
  { name: 'Lucknow', mentors: 8, entrepreneurs: 210, lat: 26.8, lng: 80.9 },
  { name: 'Jaipur', mentors: 6, entrepreneurs: 180, lat: 26.9, lng: 75.7 },
  { name: 'Ahmedabad', mentors: 9, entrepreneurs: 260, lat: 23.0, lng: 72.5 },
  { name: 'Hyderabad', mentors: 11, entrepreneurs: 300, lat: 17.3, lng: 78.4 },
  { name: 'Chennai', mentors: 7, entrepreneurs: 190, lat: 13.0, lng: 80.2 },
]

const LocationMap = () => {
  const [selectedCity, setSelectedCity] = useState(null)
  const [userCity, setUserCity] = useState('')

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          // Find nearest city
          let nearest = cities[0]
          let minDist = Infinity
          cities.forEach(city => {
            const dist = Math.sqrt(
              Math.pow(city.lat - latitude, 2) + Math.pow(city.lng - longitude, 2)
            )
            if (dist < minDist) { minDist = dist; nearest = city }
          })
          setUserCity(nearest.name)
          setSelectedCity(nearest)
        },
        () => alert('Location access denied. Please select manually.')
      )
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Find Entrepreneurs Near You</h2>
          <p className="text-gray-500 text-sm mt-1">Connect with local mentors and entrepreneurs in your city</p>
        </div>
        <button
          onClick={detectLocation}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all text-sm font-medium"
        >
          📍 Detect My Location
        </button>
      </div>

      {userCity && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 text-green-700 text-sm font-medium">
          ✅ Your location detected: <strong>{userCity}</strong> — {cities.find(c => c.name === userCity)?.mentors} mentors available nearby!
        </div>
      )}

      {/* City Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => setSelectedCity(city)}
            className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
              selectedCity?.name === city.name
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <p className="font-semibold text-gray-800">{city.name}</p>
            <p className="text-xs text-indigo-600 mt-1">{city.mentors} mentors</p>
            <p className="text-xs text-gray-400">{city.entrepreneurs} entrepreneurs</p>
          </button>
        ))}
      </div>

      {/* Selected City Detail */}
      {selectedCity && (
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-800 mb-3">
            📍 {selectedCity.name} Community
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-2xl font-bold text-indigo-600">{selectedCity.mentors}</p>
              <p className="text-xs text-gray-500">Active Mentors</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-2xl font-bold text-purple-600">{selectedCity.entrepreneurs}</p>
              <p className="text-xs text-gray-500">Entrepreneurs</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-2xl font-bold text-green-600">
                {Math.floor(selectedCity.entrepreneurs * 0.3)}
              </p>
              <p className="text-xs text-gray-500">Active Startups</p>
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium text-sm transition-colors">
            View {selectedCity.name} Community →
          </button>
        </div>
      )}
    </div>
  )
}

export default LocationMap
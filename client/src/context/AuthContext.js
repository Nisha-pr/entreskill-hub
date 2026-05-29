import React, { createContext, useState, useContext } from 'react'
import { loginAPI, registerAPI } from '../services/api'

// Create authentication context
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Initialize user state from local storage
  const [user, setUser] = useState(
    localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null
  )

  // Login user
  const login = async (email, password) => {
    const { data } = await loginAPI({ email, password })

    localStorage.setItem('userInfo', JSON.stringify(data))
    setUser(data)

    return data
  }

  // Register new user
  const register = async (name, email, password, role) => {
    const { data } = await registerAPI({ name, email, password, role })

    localStorage.setItem('userInfo', JSON.stringify(data))
    setUser(data)

    return data
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext)
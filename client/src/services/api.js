import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Har request mein token automatically add ho
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('userInfo')
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
  }
  return req
})

// Auth APIs
export const registerAPI = (data) => API.post('/auth/register', data)
export const loginAPI = (data) => API.post('/auth/login', data)
export const getProfileAPI = () => API.get('/auth/profile')

// Resource APIs
export const getResourcesAPI = (params) => API.get('/resources', { params })
export const createResourceAPI = (data) => API.post('/resources', data)

// Progress APIs
export const getUserProgressAPI = () => API.get('/progress')
export const saveProgressAPI = (data) => API.post('/progress', data)
export const deleteProgressAPI = (roadmapId) => API.delete(`/progress/${roadmapId}`)
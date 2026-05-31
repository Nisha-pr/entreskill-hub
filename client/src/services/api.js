import axios from 'axios'

const API = axios.create({
  baseURL: 'https://entreskill-hub-api.onrender.com/api'
})

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('userInfo')
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
  }
  return req
})

export const registerAPI = (data) => API.post('/auth/register', data)
export const loginAPI = (data) => API.post('/auth/login', data)
export const getProfileAPI = () => API.get('/auth/profile')
export const getResourcesAPI = (params) => API.get('/resources', { params })
export const createResourceAPI = (data) => API.post('/resources', data)

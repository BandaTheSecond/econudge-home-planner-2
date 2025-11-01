import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5555/api',
})

client.interceptors.request.use((config) => {
  const saved = localStorage.getItem('econudge_auth')
  if (saved) {
    const { token } = JSON.parse(saved)
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client

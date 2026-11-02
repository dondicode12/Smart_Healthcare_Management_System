import axios from 'axios'

// One shared Axios instance. Every page imports this instead of calling axios directly.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
})

// Automatically attach the login token to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Turns an Axios error into a message we can show the user.
export function getErrorMessage(error) {
  return (
    error.response?.data?.error?.message ||
    'Cannot reach the server. Is the backend running?'
  )
}

// If the server says the token is invalid/expired, clear it and show the expired page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogin = error.config?.url?.includes('/auth/login')
    if (error.response?.status === 401 && !isLogin) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/session-expired'
    }
    return Promise.reject(error)
  },
)

export default api

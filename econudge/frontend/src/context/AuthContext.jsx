import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('econudge_auth')
    if (saved) {
      const parsed = JSON.parse(saved)
      setUser(parsed.user)
      setToken(parsed.token)
    }
  }, [])

  const login = (userData, jwt) => {
    setUser(userData)
    setToken(jwt)
    localStorage.setItem('econudge_auth', JSON.stringify({ user: userData, token: jwt }))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('econudge_auth')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}

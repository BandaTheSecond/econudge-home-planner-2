import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await client.post('/auth/login', { email: identifier, password })
      const { user, access_token } = res.data
      login(user, access_token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="card">
        <label>
          Email or Username
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn primary">Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  )
}

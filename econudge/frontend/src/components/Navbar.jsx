import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">EcoNudge</Link>
      </div>
      <div className="nav-right">
        <Link to="/nudges">Nudges</Link>
        <Link to="/planner">Planner</Link>
        <Link to="/rewards">Rewards</Link>
        {user ? (
          <>
            <span className="greet">Hi, {user.username || user.name}</span>
            <button onClick={handleLogout} className="btn-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

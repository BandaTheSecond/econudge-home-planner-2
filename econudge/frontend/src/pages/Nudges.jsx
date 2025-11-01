import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Nudges() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [nudges, setNudges] = useState([])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    async function fetchNudges() {
      const res = await client.get('/nudges/')
      setNudges(res.data)
    }
    fetchNudges()
  }, [user, navigate])

  return (
    <div>
      <h2>Eco Nudges</h2>
      <div className="planner-list">
        {nudges.map(n => (
          <div key={n.id} className="planner-card">
            <div className="card-left">
              <p className="plan-title"><strong>{n.title}</strong></p>
              <p className="muted">{n.description} ({n.difficulty})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

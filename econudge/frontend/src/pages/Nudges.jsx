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
      <ul>
        {nudges.map(n => (
          <li key={n.id}><strong>{n.title}</strong> - {n.description} ({n.difficulty})</li>
        ))}
      </ul>
    </div>
  )
}

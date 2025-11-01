import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Rewards() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    async function fetchRewards() {
      const res = await client.get('/rewards/')
      setRewards(res.data)
    }
    fetchRewards()
  }, [user, navigate])

  async function redeem(id) {
    await client.post(`/rewards/redeem/${id}`)
    alert('Redeemed (demo)')
  }

  return (
    <div>
      <h2>Rewards</h2>
      <ul>
        {rewards.map(r => (
          <li key={r.id}>{r.title} - cost: {r.cost} <button onClick={() => redeem(r.id)}>Redeem</button></li>
        ))}
      </ul>
    </div>
  )
}

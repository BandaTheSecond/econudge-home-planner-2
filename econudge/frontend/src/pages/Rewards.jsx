import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Rewards() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [rewards, setRewards] = useState([])
  const [userPoints, setUserPoints] = useState(0)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    async function fetchRewards() {
      const res = await client.get('/rewards/')
      setRewards(res.data)
      // Assuming user points are available in user context or separate API
      setUserPoints(user.points || 0)
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
      <p className="mb-4">Earn points for eco actions and redeem them here! 🎁</p>

      <div className="card mb-4">
        <h3>Your Points: {userPoints}</h3>
        <p>Keep completing nudges to earn more points!</p>
      </div>

      <div className="rewards-list">
        {rewards.length > 0 ? (
          rewards.map(r => (
            <div key={r.id} className="card">
              <h3>{r.title}</h3>
              <p className="muted">{r.description || 'No description available'}</p>
              <div className="card-inline" style={{justifyContent: 'space-between', marginTop: '12px'}}>
                <span className="muted">Cost: {r.cost} points</span>
                <button
                  className={`btn ${userPoints >= r.cost ? 'primary' : 'ghost'}`}
                  onClick={() => redeem(r.id)}
                  disabled={userPoints < r.cost}
                >
                  Redeem
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center">
            <p>No rewards available at the moment. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}

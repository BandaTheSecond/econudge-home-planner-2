import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts'

export default function Reports() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    async function fetch() {
      const res = await client.get('/reports/progress')
      setProgress(res.data)
    }
    fetch()
  }, [user, navigate])

  const data = progress ? [
    { name: 'Completed', value: progress.completed_nudges },
    { name: 'Remaining', value: Math.max(0, 10 - progress.completed_nudges) }
  ] : []

  return (
    <div>
      <h2>Reports</h2>
      {progress && (
        <div style={{ width: 300, height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Reports() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    async function fetch() {
      const res = await client.get('/reports/planner-summary')
      setProgress(res.data)
    }
    fetch()
  }, [user, navigate])

  const data = progress ? progress.data : []

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>Reports</h2>
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-title">TOTAL TASKS</div>
            <div className="kpi-value">{progress?.total_tasks || 0}</div>
          </div>
          <div className="kpi">
            <div className="kpi-title">COMPLETED</div>
            <div className="kpi-value">{progress?.completed || 0}</div>
          </div>
          <div className="kpi">
            <div className="kpi-title">IN PROGRESS</div>
            <div className="kpi-value">{progress?.in_progress || 0}</div>
          </div>
          <div className="kpi">
            <div className="kpi-title">PENDING</div>
            <div className="kpi-value">{progress?.pending || 0}</div>
          </div>
        </div>
      </div>

      {progress && (
        <div className="chart-card">
          <h3>Planner Summary</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0b76ef" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="activity-table">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {progress?.recent_activities?.length > 0 ? (
              progress.recent_activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.title}</td>
                  <td>{new Date(activity.completed_at).toLocaleDateString()}</td>
                  <td>{activity.points}</td>
                  <td><span className="text-success">Completed</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No recent activities</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

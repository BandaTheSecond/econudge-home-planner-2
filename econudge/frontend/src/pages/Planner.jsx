import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Planner() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [form, setForm] = useState({ title: '', scheduled_for: '', due_date: '' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', scheduled_for: '', due_date: '' })

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchPlans()
  }, [user, navigate])

  async function fetchPlans() {
    const res = await client.get('/planner/')
    setPlans(res.data)
  }

  async function handleCreate(e) {
    e.preventDefault()
    await client.post('/planner/', form)
    fetchPlans()
    setForm({ title: '', scheduled_for: '', due_date: '' })
  }

  async function handleEdit(plan) {
    setEditingId(plan.id)
    setEditForm({
      title: plan.title,
      scheduled_for: plan.scheduled_for,
      due_date: plan.due_date || ''
    })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    await client.put(`/planner/${editingId}`, editForm)
    setEditingId(null)
    setEditForm({ title: '', scheduled_for: '', due_date: '' })
    fetchPlans()
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      await client.delete(`/planner/${id}`)
      fetchPlans()
    }
  }

  async function logProgress(id, status, progress_percentage = null) {
    const data = {}
    if (status) data.status = status
    if (progress_percentage !== null) data.progress_percentage = progress_percentage
    await client.patch(`/planner/${id}/progress`, data)
    fetchPlans()
  }

  function getProgressPercentage(plan) {
    return plan.progress_percentage || 0
  }

  function getStatusColor(status) {
    const colors = {
      'pending': 'text-muted',
      'in_progress': 'text-warning',
      'completed': 'text-success'
    }
    return colors[status] || 'text-muted'
  }

  return (
    <div>
      <h2>Your Planner</h2>
      <div className="card">
        <h3>Add New Plan</h3>
        <form onSubmit={handleCreate}>
          <label>
            Title
            <input
              placeholder="Enter plan title"
              value={form.title}
              onChange={(e)=>setForm({...form, title: e.target.value})}
              required
            />
          </label>
          <label>
            Scheduled Date
            <input
              type="date"
              value={form.scheduled_for}
              onChange={(e)=>setForm({...form, scheduled_for: e.target.value})}
              required
            />
          </label>
          <label>
            Due Date
            <input
              type="date"
              value={form.due_date}
              onChange={(e)=>setForm({...form, due_date: e.target.value})}
            />
          </label>
          <button type="submit" className="btn primary">Add Plan</button>
        </form>
      </div>

      <div className="planner-list">
        {plans.map(p => (
          <div key={p.id} className="planner-card">
            {editingId === p.id ? (
              <div className="card-content">
                <form onSubmit={handleUpdate}>
                  <label>
                    Title
                    <input
                      value={editForm.title}
                      onChange={(e)=>setEditForm({...editForm, title: e.target.value})}
                      required
                    />
                  </label>
                  <label>
                    Scheduled Date
                    <input
                      type="date"
                      value={editForm.scheduled_for}
                      onChange={(e)=>setEditForm({...editForm, scheduled_for: e.target.value})}
                      required
                    />
                  </label>
                  <label>
                    Due Date
                    <input
                      type="date"
                      value={editForm.due_date}
                      onChange={(e)=>setEditForm({...editForm, due_date: e.target.value})}
                    />
                  </label>
                  <div className="card-inline" style={{gap: '8px', marginTop: '12px'}}>
                    <button type="submit" className="btn primary">Update</button>
                    <button type="button" className="btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="card-content">
                  <div className="plan-header">
                    <h4 className="plan-title">{p.title}</h4>
                    <span className={`status-badge ${getStatusColor(p.status)}`}>
                      {p.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="plan-details">
                    <p className="muted">
                      <strong>Scheduled:</strong> {new Date(p.scheduled_for).toLocaleDateString()}
                    </p>
                    {p.due_date && (
                      <p className="muted">
                        <strong>Due:</strong> {new Date(p.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="progress-section">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{width: `${getProgressPercentage(p)}%`}}
                      ></div>
                    </div>
                    <span className="progress-text">{getProgressPercentage(p)}% Complete</span>
                  </div>
                </div>

                <div className="card-actions">
                  <div className="progress-input-section">
                    <label className="progress-label">
                      Progress (%):
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={p.progress_percentage || 0}
                        onChange={(e) => {
                          const percentage = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                          logProgress(p.id, null, percentage)
                        }}
                        className="progress-input"
                      />
                    </label>
                  </div>

                  <div className="status-buttons">
                    <button
                      className="btn small"
                      onClick={() => logProgress(p.id, 'pending')}
                      disabled={p.status === 'pending'}
                    >
                      Pending
                    </button>
                    <button
                      className="btn small primary"
                      onClick={() => logProgress(p.id, 'in_progress')}
                      disabled={p.status === 'in_progress'}
                    >
                      In Progress
                    </button>
                    <button
                      className="btn small success"
                      onClick={() => logProgress(p.id, 'completed')}
                      disabled={p.status === 'completed'}
                    >
                      Complete
                    </button>
                  </div>

                  <div className="action-buttons">
                    <button className="btn small" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn small danger" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

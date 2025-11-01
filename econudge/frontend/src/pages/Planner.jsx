import { useEffect, useState, useContext } from 'react'
import client from '../api/client'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Planner() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [form, setForm] = useState({ title: '', scheduled_for: '' })

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    async function fetchPlans() {
      const res = await client.get('/planner/')
      setPlans(res.data)
    }
    fetchPlans()
  }, [user, navigate])

  async function handleCreate(e) {
    e.preventDefault()
    await client.post('/planner/', form)
    const res = await client.get('/planner/')
    setPlans(res.data)
    setForm({ title: '', scheduled_for: '' })
  }

  return (
    <div>
      <h2>Your Planner</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} required />
        <input type="date" value={form.scheduled_for} onChange={(e)=>setForm({...form, scheduled_for: e.target.value})} required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {plans.map(p => <li key={p.id}>{p.title} - {p.scheduled_for} - {p.status}</li>)}
      </ul>
    </div>
  )
}

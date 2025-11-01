import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Nudges from './pages/Nudges'
import Planner from './pages/Planner'
import Reports from './pages/Reports'
import Rewards from './pages/Rewards'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'nudges', element: <Nudges /> },
      { path: 'planner', element: <Planner /> },
      { path: 'reports', element: <Reports /> },
      { path: 'rewards', element: <Rewards /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

export default router

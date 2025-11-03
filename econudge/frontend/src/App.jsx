import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        <Navbar />
        <div className="app-layout">
          <Sidebar />
          <main>
            <div className="container">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}

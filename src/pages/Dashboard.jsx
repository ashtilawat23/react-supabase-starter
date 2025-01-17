import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export function Dashboard() {
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleSignOut} className="sign-out-btn">
          Sign Out
        </button>
      </div>
      <div className="dashboard-content">
        <p>Welcome, {user.email}!</p>
        <p>You're signed in and ready to go.</p>
      </div>
    </div>
  )
} 
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="header">
      <div className="logo">
        <h2>Your Brand</h2>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {!user && (
            <li>
              <Link to="/signin" className="sign-in-btn">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
} 
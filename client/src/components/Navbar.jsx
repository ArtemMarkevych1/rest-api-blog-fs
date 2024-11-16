import { Link, useNavigate } from 'react-router-dom'

function Navbar({ user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Blog App</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar 
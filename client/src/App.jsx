import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'
import './App.css'
import { useDispatch } from 'react-redux'
import { signInSuccess } from './store/reducers/authReducer'

// Create a wrapper component that uses Redux hooks
function AppContent() {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (storedUser && token) {
      dispatch(signInSuccess(JSON.parse(storedUser)))
    }
  }, [dispatch])

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Main App component that provides the Redux store
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App

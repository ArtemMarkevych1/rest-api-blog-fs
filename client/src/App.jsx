import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'
import './App.css'
import { AuthRoute, PrivateRoute } from './components/ProtectedRoute'

function AppContent() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            } />
            <Route path="/signup" element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App

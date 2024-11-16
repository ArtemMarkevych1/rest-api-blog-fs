import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export function AuthRoute({ children }) {
  const { user } = useSelector(state => state.auth)
  
  if (user) {
    return <Navigate to="/" replace />
  }
  
  return children
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export function PrivateRoute({ children }) {
  const { user } = useSelector(state => state.auth)
  
  if (!user) {
    return <Navigate to="/signin" replace />
  }
  
  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
} 
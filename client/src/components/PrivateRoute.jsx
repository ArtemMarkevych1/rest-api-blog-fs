import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function PrivateRoute({ children }) {
  const { user } = useSelector(state => state.auth)
  const location = useLocation()

  if (!user) {
    // Redirect to signin while saving the attempted url
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute 

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}


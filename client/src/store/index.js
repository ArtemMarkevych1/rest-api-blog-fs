import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import { authService } from '../services/api'
import { signInSuccess } from './reducers/authReducer'

const sagaMiddleware = createSagaMiddleware()

// Initialize store with async function
const initializeStore = async () => {
  let preloadedState = {
    auth: {
      user: null,
      token: null,
      loading: false,
      error: null
    }
  }

  // Try to get current user if token exists
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const userData = await authService.getCurrentUser()
      preloadedState.auth = {
        user: userData,
        token,
        loading: false,
        error: null
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

  sagaMiddleware.run(rootSaga)
  return store
}

export default initializeStore 
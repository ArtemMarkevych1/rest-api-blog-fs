import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import { authService } from '../services/api'

const sagaMiddleware = createSagaMiddleware()

// Initialize auth state from localStorage before creating store
const token = localStorage.getItem('token')
let preloadedState = {
  auth: {
    user: null,
    token: null,
    loading: false,
    error: null
  }
}

// If we have a token, fetch the user data
if (token) {
  try {
    // You might need to adjust this based on your API structure
    const userData = await authService.getCurrentUser()
    preloadedState = {
      auth: {
        user: userData,
        token,
        loading: false,
        error: null
      }
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    // Clear invalid token
    localStorage.removeItem('token')
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

export default store 
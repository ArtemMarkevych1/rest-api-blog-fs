import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// Get initial auth state from localStorage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
      loading: false,
      error: null
    }
  } catch (error) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return {
      user: null,
      token: null,
      loading: false,
      error: null
    }
  }
}

// Create store with preloaded auth state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: getUserFromStorage()
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: import.meta.env.MODE !== 'production',
})

// Run saga middleware once
sagaMiddleware.run(rootSaga)

// Only dispatch initializeAuth if we have a token but no user
const token = localStorage.getItem('token')
if (token && !store.getState().auth.user) {
  store.dispatch({ 
    type: 'auth/initializeAuth', 
    payload: { token } 
  })
}

export default store 
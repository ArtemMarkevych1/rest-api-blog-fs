import { createSlice } from '@reduxjs/toolkit'

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
    localStorage.removeItem('user') // Clear invalid data
    return null
  }
}

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem('token'),
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInRequest: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.error = null
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signOut: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signOut
} = authSlice.actions

export default authSlice.reducer 
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
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
      localStorage.setItem('token', action.payload.token)
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signUpRequest: (state) => {
      state.loading = true
      state.error = null
    },
    signUpSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.error = null
      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('token', action.payload.token)
    },
    signUpFailure: (state, action) => {
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
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signOut
} = authSlice.actions

export default authSlice.reducer 
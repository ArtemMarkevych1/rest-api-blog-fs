import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserProfileRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUserProfileSuccess: (state, action) => {
      state.loading = false
      state.profile = action.payload
      state.error = null
    },
    fetchUserProfileFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure
} = userSlice.actions

export default userSlice.reducer 
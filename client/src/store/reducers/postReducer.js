import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  pagination: {
    total: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
    hasNext: false,
    hasPrev: false
  },
  loading: false,
  error: null
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false
      state.items = action.payload.posts
      state.pagination = action.payload.pagination
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    createPostRequest: (state) => {
      state.loading = true
      state.error = null
    },
    createPostSuccess: (state, action) => {
      state.loading = false
      state.items = [action.payload, ...state.items]
    },
    createPostFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updatePostRequest: (state) => {
      state.loading = true
      state.error = null
    },
    updatePostSuccess: (state, action) => {
      state.loading = false
      const index = state.items.findIndex(post => post._id === action.payload._id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    updatePostFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deletePostRequest: (state) => {
      state.loading = true
      state.error = null
    },
    deletePostSuccess: (state, action) => {
      state.loading = false
      state.items = state.items.filter(post => post._id !== action.payload)
    },
    deletePostFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchUserPostsRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading = false
      state.items = action.payload.posts
      state.pagination = action.payload.pagination
    },
    fetchUserPostsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchUserPostsFailure
} = postSlice.actions

export default postSlice.reducer 
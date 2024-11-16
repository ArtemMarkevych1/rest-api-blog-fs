import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  currentPost: null,
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
      state.posts = action.payload
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
      state.posts.unshift(action.payload)
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
      const index = state.posts.findIndex(post => post._id === action.payload._id)
      if (index !== -1) {
        state.posts[index] = action.payload
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
      state.posts = state.posts.filter(post => post._id !== action.payload)
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
      state.posts = action.payload
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
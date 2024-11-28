import { createSlice } from '@reduxjs/toolkit';

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
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    createPostRequest: (state) => {
      state.loading = true
      state.error = null
    },
    createPostSuccess: (state, action) => {
      state.loading = false
      state.items.unshift(action.payload)
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
      if (action.payload && action.payload._id) {
        const index = state.items.findIndex(post => post._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
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
    },
    toggleLikeRequest: (state) => {
      state.error = null
    },
    toggleLikeSuccess: (state, action) => {
      const { postId, updatedPost } = action.payload
      const postIndex = state.items.findIndex(post => post._id === postId)
      if (postIndex !== -1) {
        state.items[postIndex] = {
          ...state.items[postIndex],
          ...updatedPost
        }
      }
    },
    toggleLikeFailure: (state, action) => {
      state.error = action.payload
    },
    addCommentRequest: (state) => {
      state.error = null
    },
    addCommentSuccess: (state, action) => {
      const { postId, comment } = action.payload
      const postIndex = state.items.findIndex(post => post._id === postId)
      if (postIndex !== -1) {
        state.items[postIndex].comments.push(comment)
      }
    },
    addCommentFailure: (state, action) => {
      state.error = action.payload
    },
    updateCommentRequest: (state) => {
      state.error = null
    },
    updateCommentSuccess: (state, action) => {
      const { postId, commentId, updatedComment } = action.payload
      const postIndex = state.items.findIndex(post => post._id === postId)
      if (postIndex !== -1) {
        const commentIndex = state.items[postIndex].comments.findIndex(comment => comment._id === commentId)
        if (commentIndex !== -1) {
          state.items[postIndex].comments[commentIndex] = updatedComment
        }
      }
    },
    updateCommentFailure: (state, action) => {
      state.error = action.payload
    },
    deleteCommentRequest: (state) => {
      state.error = null
    },
    deleteCommentSuccess: (state, action) => {
      const { postId, commentId } = action.payload
      const postIndex = state.items.findIndex(post => post._id === postId)
      if (postIndex !== -1) {
        state.items[postIndex].comments = state.items[postIndex].comments.filter(comment => comment._id !== commentId)
      }
    },
    deleteCommentFailure: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  setCurrentCategory,
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
  fetchUserPostsFailure,
  toggleLikeRequest,
  toggleLikeSuccess,
  toggleLikeFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  updateCommentRequest,
  updateCommentSuccess,
  updateCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure
} = postSlice.actions

export default postSlice.reducer 
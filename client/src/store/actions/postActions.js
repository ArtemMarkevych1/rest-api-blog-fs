import { 
  fetchPostsRequest,
  createPostRequest,
  deletePostRequest,
  fetchUserPostsRequest,
  toggleLikeRequest
} from '../reducers/postReducer'

// Define action types that match the slice action types
export const POST_ACTIONS = {
  FETCH_POSTS_REQUEST: 'posts/fetchPostsRequest',
  FETCH_POSTS_SUCCESS: 'posts/fetchPostsSuccess',
  FETCH_POSTS_FAILURE: 'posts/fetchPostsFailure',
  CREATE_POST_REQUEST: 'posts/createPostRequest',
  CREATE_POST_SUCCESS: 'posts/createPostSuccess',
  CREATE_POST_FAILURE: 'posts/createPostFailure',
  UPDATE_POST_REQUEST: 'posts/updatePostRequest',
  UPDATE_POST_SUCCESS: 'posts/updatePostSuccess',
  UPDATE_POST_FAILURE: 'posts/updatePostFailure',
  DELETE_POST_REQUEST: 'posts/deletePostRequest',
  DELETE_POST_SUCCESS: 'posts/deletePostSuccess',
  DELETE_POST_FAILURE: 'posts/deletePostFailure',
  FETCH_USER_POSTS_REQUEST: 'posts/fetchUserPostsRequest',
  FETCH_USER_POSTS_SUCCESS: 'posts/fetchUserPostsSuccess',
  FETCH_USER_POSTS_FAILURE: 'posts/fetchUserPostsFailure',
  TOGGLE_LIKE_REQUEST: 'posts/toggleLikeRequest',
  TOGGLE_LIKE_SUCCESS: 'posts/toggleLikeSuccess',
  TOGGLE_LIKE_FAILURE: 'posts/toggleLikeFailure'
}

export const fetchPosts = (queryParams = {}) => {
  return fetchPostsRequest(queryParams)
}

export const createPost = (postData) => {
  return createPostRequest(postData)
}

export const updatePost = (payload) => ({
  type: POST_ACTIONS.UPDATE_POST_REQUEST,
  payload
})

export const deletePost = (postId) => {
  return deletePostRequest(postId)
}

export const fetchUserPosts = (userId) => {
  return fetchUserPostsRequest(userId)
} 

export const toggleLike = (postId, optimisticUpdate) => ({
  type: POST_ACTIONS.TOGGLE_LIKE_REQUEST,
  payload: { postId, optimisticUpdate }
})

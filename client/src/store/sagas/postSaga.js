import { takeLatest, put, call, select } from 'redux-saga/effects'
import { POST_ACTIONS } from '../actions/postActions'
import { postService } from '../../services/api'
import {
  updatePostSuccess,
  updatePostFailure,
  deletePostSuccess,
  deletePostFailure,
  fetchUserPostsSuccess,
  fetchUserPostsFailure,
  fetchPostsRequest,
  toggleLikeSuccess,
  toggleLikeFailure,
  addCommentSuccess,
  addCommentFailure,
  updateCommentSuccess,
  updateCommentFailure,
  deleteCommentSuccess,
  deleteCommentFailure,
} from '../reducers/postReducer'
import { fetchUserProfile } from '../actions/userActions'
// Selector to get current URL params from state
const getCurrentUrlParams = () => {
  const searchParams = new URLSearchParams(window.location.search)
  return {
    category: searchParams.get('category'),
    page: parseInt(searchParams.get('page')) || 1,
    size: parseInt(searchParams.get('size')) || 10
  }
}

function* fetchPostsSaga(action) {
  try {
    const response = yield call(postService.getPosts, action.payload)
    yield put({
      type: POST_ACTIONS.FETCH_POSTS_SUCCESS,
      payload: response
    })
    yield put(fetchUserProfile())
  } catch (error) {
    yield put({
      type: POST_ACTIONS.FETCH_POSTS_FAILURE,
      payload: error.message
    })
  }
}

function* fetchPostById(action) {
  try {
    const response = yield call(postService.getPost, action.payload)
    yield put({
      type: POST_ACTIONS.FETCH_POST_BY_ID_SUCCESS,
      payload: response
    })
  } catch (error) {
    yield put({
      type: POST_ACTIONS.FETCH_POST_BY_ID_FAILURE,
      payload: error.message
    })
  }
}

function* createPostSaga(action) {
  try {
    const response = yield call(postService.createPost, action.payload)
    yield put({
      type: POST_ACTIONS.CREATE_POST_SUCCESS,
      payload: response
    })
    // After successful post creation, fetch posts with current URL params
    const currentParams = yield select(getCurrentUrlParams)
    yield put({
      type: POST_ACTIONS.FETCH_POSTS_REQUEST,
      payload: currentParams
    })

    yield put(fetchUserProfile())
  } catch (error) {
    yield put({
      type: POST_ACTIONS.CREATE_POST_FAILURE,
      payload: error.message
    })
  }
}

function* updatePost(action) {
  try {
    const { id, data } = action.payload
    const response = yield call(postService.updatePost, id, data)
    yield put(updatePostSuccess(response.data))
    yield put(fetchPostsRequest())
    yield put(fetchUserProfile())
  } catch (error) {
    yield put(updatePostFailure(error.message))
  }
}

function* deletePost(action) {
  try {
    yield call(postService.deletePost, action.payload)
    yield put(deletePostSuccess(action.payload))
    yield put(fetchUserProfile())
  } catch (error) {
    yield put(deletePostFailure(error.message))
  }
}

function* fetchUserPosts(action) {
  try {
    const response = yield call(postService.getUserPosts, action.payload)
    yield put(fetchUserPostsSuccess(response.data))
  } catch (error) {
    yield put(fetchUserPostsFailure(error.message))
  }
}

function* toggleLikeSaga(action) {
  try {
    const { postId, optimisticUpdate } = action.payload
    // Optimistically update the post
    yield put(toggleLikeSuccess({ postId, updatedPost: optimisticUpdate }))

    // Call the API to toggle like
    const response = yield call(postService.toggleLike, postId)
    // Update the post with the response from the server
    yield put(toggleLikeSuccess({ postId, updatedPost: response.data }))
  } catch (error) {
    yield put(toggleLikeFailure(error.message))
  }
}

function* addCommentSaga(action) {
  try {
    const { postId, commentData } = action.payload
    yield call(postService.addComment, postId, commentData)
    yield put(addCommentSuccess({ postId, commentData }))
    
    // Dispatch fetchPostById to refresh the post data
    yield put(fetchPostById(postId))
  } catch (error) {
    yield put(addCommentFailure(error.message))
  }
}

function* updateCommentSaga(action) {
  try {
    const { postId, commentId, commentData } = action.payload
    yield call(postService.updateComment, postId, commentId, commentData)
    yield put(updateCommentSuccess({ postId, commentId, commentData }))
    
    // Dispatch fetchPostById to refresh the post data
    yield put(fetchPostById(postId))
  } catch (error) {
    yield put(updateCommentFailure(error.message))
  }
}

function* deleteCommentSaga(action) {
  try {
    const { postId, commentId } = action.payload
    yield call(postService.deleteComment, postId, commentId)
    yield put(deleteCommentSuccess({ postId, commentId }))
    
    // Dispatch fetchPostById to refresh the post data
    yield put(fetchPostById(postId))
  } catch (error) {
    yield put(deleteCommentFailure(error.message))
  }
}

export function* watchPosts() {
  yield takeLatest(POST_ACTIONS.FETCH_POSTS_REQUEST, fetchPostsSaga)
  yield takeLatest(POST_ACTIONS.FETCH_POST_BY_ID_REQUEST, fetchPostById)
  yield takeLatest(POST_ACTIONS.CREATE_POST_REQUEST, createPostSaga)
  yield takeLatest(POST_ACTIONS.UPDATE_POST_REQUEST, updatePost)
  yield takeLatest(POST_ACTIONS.DELETE_POST_REQUEST, deletePost)
  yield takeLatest(POST_ACTIONS.FETCH_USER_POSTS_REQUEST, fetchUserPosts),
  yield takeLatest(POST_ACTIONS.TOGGLE_LIKE_REQUEST, toggleLikeSaga)
  yield takeLatest(POST_ACTIONS.ADD_COMMENT_REQUEST, addCommentSaga)
  yield takeLatest(POST_ACTIONS.UPDATE_COMMENT_REQUEST, updateCommentSaga)
  yield takeLatest(POST_ACTIONS.DELETE_COMMENT_REQUEST, deleteCommentSaga)
} 
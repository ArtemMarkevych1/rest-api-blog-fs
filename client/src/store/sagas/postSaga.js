import { takeLatest, put, call } from 'redux-saga/effects'
import { POST_ACTIONS } from '../actions/postActions'
import { postService } from '../../services/api'
import {
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostSuccess,
  createPostFailure,
  updatePostSuccess,
  updatePostFailure,
  deletePostSuccess,
  deletePostFailure,
  fetchUserPostsSuccess,
  fetchUserPostsFailure,
  fetchPostsRequest
} from '../reducers/postReducer'

function* fetchPostsSaga(action) {
    try {
      const response = yield call(postService.getPosts, action.payload); // Pass query params
      yield put(fetchPostsSuccess({
        posts: response.posts,
        pagination: response.pagination
      }))
    } catch (error) {
      yield put(fetchPostsFailure(error.message));
    }
  }

function* createPost(action) {
    try {
        const response = yield call(postService.createPost, action.payload)
        yield put(createPostSuccess(response.data))
    } catch (error) {
        yield put(createPostFailure(error.message))
    }
}

function* updatePost(action) {
    try {
        const { id, data } = action.payload
        const response = yield call(postService.updatePost, id, data)
        yield put(updatePostSuccess(response.data))
        yield put(fetchPostsRequest())
    } catch (error) {
        yield put(updatePostFailure(error.message))
    }
}

function* deletePost(action) {
    try {
        yield call(postService.deletePost, action.payload)
        yield put(deletePostSuccess(action.payload))
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

export function* watchPosts() {
    yield takeLatest(POST_ACTIONS.FETCH_POSTS_REQUEST, fetchPostsSaga)
    yield takeLatest(POST_ACTIONS.CREATE_POST_REQUEST, createPost)
    yield takeLatest(POST_ACTIONS.UPDATE_POST_REQUEST, updatePost)
    yield takeLatest(POST_ACTIONS.DELETE_POST_REQUEST, deletePost)
    yield takeLatest(POST_ACTIONS.FETCH_USER_POSTS_REQUEST, fetchUserPosts)
} 
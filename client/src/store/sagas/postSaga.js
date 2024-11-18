import { takeLatest, put, call } from 'redux-saga/effects'
import { POST_ACTIONS } from '../actions/postActions'
import { postService } from '../../services/api'
import { 
  fetchPostsSuccess, 
  fetchPostsFailure 
} from '../reducers/postReducer'

function* fetchPostsSaga() {
  try {
    const response = yield call(postService.getPosts)
    yield put(fetchPostsSuccess({
      posts: response.data.posts,
      pagination: response.data.pagination
    }))
  } catch (error) {
    yield put(fetchPostsFailure(error.message))
  }
}

function* createPost(action) {
    try {
        const post = yield call(postService.createPost, action.payload)
        yield put({ type: POST_ACTIONS.CREATE_POST_SUCCESS, payload: post })
    } catch (error) {
        yield put({ type: POST_ACTIONS.CREATE_POST_FAILURE, payload: error.message })
    }
}

function* updatePost(action) {
    try {
        const { postId, postData } = action.payload
        const post = yield call(postService.updatePost, postId, postData)
        yield put({ type: POST_ACTIONS.UPDATE_POST_SUCCESS, payload: post })
    } catch (error) {
        yield put({ type: POST_ACTIONS.UPDATE_POST_FAILURE, payload: error.message })
    }
}

function* deletePost(action) {
    try {
        yield call(postService.deletePost, action.payload)
        yield put({ type: POST_ACTIONS.DELETE_POST_SUCCESS, payload: action.payload })
    } catch (error) {
        yield put({ type: POST_ACTIONS.DELETE_POST_FAILURE, payload: error.message })
    }
}

function* fetchUserPosts(action) {
    try {
        const posts = yield call(postService.getUserPosts, action.payload)
        yield put({ type: POST_ACTIONS.FETCH_USER_POSTS_SUCCESS, payload: posts })
    } catch (error) {
        yield put({ type: POST_ACTIONS.FETCH_USER_POSTS_FAILURE, payload: error.message })
    }
}

export function* watchPosts() {
    yield takeLatest('posts/fetchPostsRequest', fetchPostsSaga)
    yield takeLatest(POST_ACTIONS.CREATE_POST_REQUEST, createPost)
    yield takeLatest(POST_ACTIONS.UPDATE_POST_REQUEST, updatePost)
    yield takeLatest(POST_ACTIONS.DELETE_POST_REQUEST, deletePost)
    yield takeLatest(POST_ACTIONS.FETCH_USER_POSTS_REQUEST, fetchUserPosts)
} 
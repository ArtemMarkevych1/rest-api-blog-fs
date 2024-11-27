import { takeLatest, put, call } from 'redux-saga/effects'
import { USER_ACTIONS } from '../actions/userActions'
import { userService } from '../../services/api'
import { 
  fetchUserProfileSuccess, 
  fetchUserProfileFailure,
  updateUserSuccess,
  updateUserFailure,
  fetchUserProfileRequest
} from '../reducers/userReducer'

function* fetchUserProfileSaga() {
  try {
    const response = yield call(userService.getCurrentUser)
    yield put(fetchUserProfileSuccess(response.data))
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message))
  }
}

function* updateUserSaga(action) {
  try {
    const response = yield call(userService.updateUser, action.payload)
    yield put(updateUserSuccess(response.data))
    yield put(fetchUserProfileRequest())
  } catch (error) {
    yield put(updateUserFailure(error.message))
  }
}

function* getUserByIdSaga(action) {
  try {
    const response = yield call(userService.getUserById, action.payload)
    yield put(fetchUserProfileSuccess(response.data))
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message))
  }
}

export function* watchUser() {
  yield takeLatest(USER_ACTIONS.FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga)
  yield takeLatest(USER_ACTIONS.UPDATE_USER_REQUEST, updateUserSaga)
  yield takeLatest(USER_ACTIONS.GET_USER_BY_ID_REQUEST, getUserByIdSaga)
}

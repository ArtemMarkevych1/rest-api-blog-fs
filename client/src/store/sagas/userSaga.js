import { takeLatest, put, call } from 'redux-saga/effects'
import { USER_ACTIONS } from '../actions/userActions'
import { authService } from '../../services/api'
import { 
  fetchUserProfileSuccess, 
  fetchUserProfileFailure 
} from '../reducers/userReducer'

function* fetchUserProfileSaga() {
  try {
    const response = yield call(authService.getCurrentUser)
    yield put(fetchUserProfileSuccess(response.data))
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message))
  }
}

export function* watchUser() {
  yield takeLatest(USER_ACTIONS.FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga)
}

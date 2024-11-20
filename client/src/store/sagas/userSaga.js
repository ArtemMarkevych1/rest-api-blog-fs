import { takeLatest, put, call } from 'redux-saga/effects'
import { userService } from '../../services/api'
import { fetchUserProfileFailure, fetchUserProfileSuccess } from '../reducers/userReducer'
import { USER_ACTIONS } from '../actions/userActions'
function* fetchUserProfileSaga() {
    try {
        const response = yield call(userService.getUserProfile)
        yield put(fetchUserProfileSuccess(response.data))
    } catch (error) {
        yield put(fetchUserProfileFailure(error.message))
    }
}

export function* watchUserSaga() {
    yield takeLatest(USER_ACTIONS.FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga)
}

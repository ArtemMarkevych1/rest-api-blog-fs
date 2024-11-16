import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_ACTIONS } from '../actions/authActions'
import { authService } from '../../services/api'
import { 
  signInSuccess, 
  signInFailure,
  signUpSuccess,
  signUpFailure 
} from '../reducers/authReducer'

function* signInSaga(action) {
  try {
    const response = yield call(authService.signIn, action.payload)
    localStorage.setItem('token', response.token)
    const userData = yield call(authService.getCurrentUser)
    yield put(signInSuccess({ ...userData, token: response.token }))
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

function* signUpSaga(action) {
  try {
    const response = yield call(authService.signUp, action.payload)
    localStorage.setItem('token', response.token)
    const userData = yield call(authService.getCurrentUser)
    yield put(signUpSuccess({ ...userData, token: response.token }))
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

export function* watchAuth() {
  yield takeLatest(AUTH_ACTIONS.SIGN_IN_REQUEST, signInSaga)
  yield takeLatest(AUTH_ACTIONS.SIGN_UP_REQUEST, signUpSaga)
} 
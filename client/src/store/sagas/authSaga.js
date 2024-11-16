import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_ACTIONS } from '../actions/authActions'
import { authService } from '../../services/api'

function* signInSaga(action) {
  try {
    const { credentials, callback } = action.payload
    const response = yield call(authService.signIn, credentials)
    
    // Store the token in localStorage
    localStorage.setItem('token', response.token)
    
    // Dispatch success action with user data
    yield put({ 
      type: AUTH_ACTIONS.SIGN_IN_SUCCESS, 
      payload: response.user 
    })
    
    // Call the callback (navigation)
    if (callback) callback()
  } catch (error) {
    yield put({ 
      type: AUTH_ACTIONS.SIGN_IN_FAILURE, 
      payload: error.message 
    })
  }
}

export function* watchAuth() {
  yield takeLatest(AUTH_ACTIONS.SIGN_IN_REQUEST, signInSaga)
} 
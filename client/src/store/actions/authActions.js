import { 
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signOut
} from '../reducers/authReducer'

export const AUTH_ACTIONS = {
  SIGN_IN_REQUEST: 'auth/signInRequest',
  SIGN_IN_SUCCESS: 'auth/signInSuccess',
  SIGN_IN_FAILURE: 'auth/signInFailure',
  SIGN_UP_REQUEST: 'auth/signUpRequest',
  SIGN_UP_SUCCESS: 'auth/signUpSuccess',
  SIGN_UP_FAILURE: 'auth/signUpFailure',
  SIGN_OUT: 'auth/signOut'
}

export const signIn = (credentials) => {
  return signInRequest(credentials)
}

export const signUp = (userData) => {
  return signUpRequest(userData)
}

export { signOut } 
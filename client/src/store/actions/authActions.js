export const AUTH_ACTIONS = {
  SIGN_IN_REQUEST: 'auth/signInRequest',
  SIGN_IN_SUCCESS: 'auth/signInSuccess',
  SIGN_IN_FAILURE: 'auth/signInFailure',
  SIGN_OUT: 'auth/signOut'
}

export const signIn = (credentials, callback) => ({
  type: AUTH_ACTIONS.SIGN_IN_REQUEST,
  payload: { credentials, callback }
})

export const signOut = () => ({
  type: AUTH_ACTIONS.SIGN_OUT
}) 
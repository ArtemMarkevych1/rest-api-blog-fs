import { fetchUserProfileRequest } from '../reducers/userReducer'

export const USER_ACTIONS = {
    FETCH_USER_PROFILE_REQUEST: 'user/fetchUserProfileRequest',
    FETCH_USER_PROFILE_SUCCESS: 'user/fetchUserProfileSuccess',
    FETCH_USER_PROFILE_FAILURE: 'user/fetchUserProfileFailure'
}

export const fetchUserProfile = () => ({
    type: USER_ACTIONS.FETCH_USER_PROFILE_REQUEST
})

export const fetchUserProfileSuccess = (data) => ({
    type: USER_ACTIONS.FETCH_USER_PROFILE_SUCCESS,
    payload: data
})

export const fetchUserProfileFailure = (error) => ({
    type: USER_ACTIONS.FETCH_USER_PROFILE_FAILURE,
    payload: error
})

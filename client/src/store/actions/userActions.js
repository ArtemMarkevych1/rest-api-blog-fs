export const USER_ACTIONS = {
    FETCH_USER_PROFILE_REQUEST: 'user/fetchUserProfileRequest',
    FETCH_USER_PROFILE_SUCCESS: 'user/fetchUserProfileSuccess',
    FETCH_USER_PROFILE_FAILURE: 'user/fetchUserProfileFailure',
    UPDATE_USER_REQUEST: 'user/updateUserRequest',
    UPDATE_USER_SUCCESS: 'user/updateUserSuccess',
    UPDATE_USER_FAILURE: 'user/updateUserFailure'
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

export const updateUser = (data) => ({
    type: USER_ACTIONS.UPDATE_USER_REQUEST,
    payload: data
})

export const updateUserSuccess = (data) => ({
    type: USER_ACTIONS.UPDATE_USER_SUCCESS,
    payload: data
})

export const updateUserFailure = (error) => ({
    type: USER_ACTIONS.UPDATE_USER_FAILURE,
    payload: error
})

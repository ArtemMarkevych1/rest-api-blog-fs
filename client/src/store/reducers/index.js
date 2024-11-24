import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import postReducer from './postReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  user: userReducer,
})

export default rootReducer 
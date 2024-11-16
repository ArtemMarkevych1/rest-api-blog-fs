import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import postReducer from './postReducer'
// import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
//   ui: uiReducer
})

export default rootReducer 
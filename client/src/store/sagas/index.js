import { all } from 'redux-saga/effects'
import { watchAuth } from './authSaga'
import { watchPosts } from './postSaga'

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPosts()
  ])
} 
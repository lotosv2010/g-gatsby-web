import { delay, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import { LOADARTICLES } from "../const/article.conts"
import { loadArticlesSuccess } from "../actions/article.action"

function * loadArticles ({payload}: any) {
  const { data } = yield axios.get('/articles', {
    params: payload
  })
  yield put(loadArticlesSuccess(data.articles))
}

export default function *counterSaga() {
  // 接受action
  yield takeEvery(LOADARTICLES, loadArticles)
}
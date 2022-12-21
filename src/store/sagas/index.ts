import { all } from "redux-saga/effects";
import authSaga from "./auth.saga"
import articleSaga from "./article.saga"

export default function * rootSaga () {
  yield all([authSaga(), articleSaga()])
}
import { delay, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import { loginSuccess, loginFailed, loadUserSuccess } from "../actions/auth.action"
import { LOGIN, LOADUSER } from "../const/auth.const"

function * login({payload}: any) {
  try {
    // yield delay(2000) // 延迟2秒，delay会返回一个promise,执行器会等待promise完成后继续执行
    const { data } = yield axios.post('/users/login', payload)
    localStorage.setItem('token', data.user.token)
    yield put(loginSuccess(data.user)) // put 作用是告诉middleware派发一个动作
  } catch (ex: any) {
    const errors = ex.response.data.errors
    const message = []
    for (const attr in errors) {
      for (let i = 0; i < errors[attr].length; i++) {
        const error = errors[attr][i];
        message.push(`${attr} ${error}`)
      }
    }
    yield put(loginFailed(message))
  }
}

function * loaduser ({payload}: any) {
  const { data } = yield axios.get('/user', {
    headers: {
      Authorization: `Token ${payload}`
    }
  })
  yield put(loadUserSuccess(data.user))
}

export default function *counterSaga() {
  // 接受action
  yield takeEvery(LOGIN, login)
  yield takeEvery(LOADUSER, loaduser)
}
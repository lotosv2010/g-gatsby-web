import { legacy_createStore as createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import combinedReducers from "./reducers/root.reducer"
import rootSaga from "./sagas"

// TODO: SAGA
const sagaMiddleware = createSagaMiddleware()

// store
const store = applyMiddleware(sagaMiddleware)(createStore)(combinedReducers)

// TODO: SAGA
sagaMiddleware.run(rootSaga)

export default store
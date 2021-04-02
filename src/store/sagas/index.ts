import { call, put, takeEvery, all } from "redux-saga/effects";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* helloSaga() {
  console.log("Hello Sagas!");
}

function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "counter/increment" });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}

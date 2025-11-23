import { all } from "redux-saga/effects";
import { studentSaga } from "./studentsSaga";
import { classSaga } from "./classesSaga";

export function* rootSaga() {
  yield all([studentSaga(), classSaga()]);
}

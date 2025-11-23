import { all } from "redux-saga/effects";
import { studentSaga } from "./studentsSaga";

export function* rootSaga() {
  yield all([studentSaga()]);
}

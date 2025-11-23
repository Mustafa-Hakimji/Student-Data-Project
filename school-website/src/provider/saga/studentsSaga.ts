import { call, put, takeLatest } from "redux-saga/effects";
import {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
} from "../slices/studentSlice";
import { api } from "../../utils/api/apiInstanse";
import { API_URL } from "../../utils/api/apiUrls";

function* fetchStudentsWorker(): any {
  try {
    const response = yield call(() => api.get(API_URL.students));
    yield put(getStudentsSuccess(response.data.data));
  } catch (error: any) {
    yield put(getStudentsFailure(error.message || "Failed to load students"));
  }
}

export function* studentSaga() {
  yield takeLatest(getStudentsRequest.type, fetchStudentsWorker);
}

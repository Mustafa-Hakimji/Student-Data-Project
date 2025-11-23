import { call, put, takeLatest } from "redux-saga/effects";
import {
  getClassesFailure,
  getClassesRequest,
  getClassesSuccess,
} from "../slices/classesSlice";
import { api } from "../../utils/api/apiInstanse";
import { API_URL } from "../../utils/api/apiUrls";

function* fetchClassesWorker(): any {
  try {
    const response = yield call(() => api.get(API_URL.classes));
    yield put(getClassesSuccess(response.data.data));
  } catch (error: any) {
    yield put(getClassesFailure(error.message || "Failed to load classes"));
  }
}

export function* classSaga() {
  yield takeLatest(getClassesRequest.type, fetchClassesWorker);
}

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import userReducer from "../slices/userSlice";
import studentReducer from "../slices/studentSlice";
import classReducer from "../slices/classesSlice";
import { rootSaga } from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentReducer,
    classes: classReducer,
  },
  middleware: (getDefault) =>
    getDefault({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

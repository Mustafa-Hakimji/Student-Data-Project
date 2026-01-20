import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../utils/constants/localStorage";

interface StudentState {
  students: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    getStudentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;

      localStorage.setItem(
        storageKeys.students,
        JSON.stringify(action.payload)
      );
    },
    getStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setLocalStudent: (state, action) => {
      state.students = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  setLocalStudent,
} = studentSlice.actions;

export default studentSlice.reducer;

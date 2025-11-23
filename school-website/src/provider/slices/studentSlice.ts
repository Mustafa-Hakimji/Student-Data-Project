import { createSlice } from "@reduxjs/toolkit";

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

      console.log("SLOICE LOG STUDENTS --> ", action.payload);
      state.students = action.payload;
    },
    getStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getStudentsRequest, getStudentsSuccess, getStudentsFailure } =
  studentSlice.actions;

export default studentSlice.reducer;

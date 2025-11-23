import { createSlice } from "@reduxjs/toolkit";

interface ClassState {
  classes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
};

export const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    getClassesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClassesSuccess: (state, action) => {
      state.loading = false;
      state.classes = action.payload;
    },
    getClassesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getClassesRequest, getClassesSuccess, getClassesFailure } =
  classSlice.actions;

export default classSlice.reducer;

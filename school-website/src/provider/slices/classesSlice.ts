import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../utils/constants/localStorage";

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
      localStorage.setItem(storageKeys.classes, JSON.stringify(action.payload));
    },
    getClassesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLocalClasses: (state, action) => {
      state.classes = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getClassesRequest,
  getClassesSuccess,
  getClassesFailure,
  setLocalClasses,
} = classSlice.actions;

export default classSlice.reducer;

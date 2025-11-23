import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  entity: string;
  password: string;
  salary: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

interface InitialStateType {
  user: UserState | null;
  isLoggedIn: boolean;
}

const initialState: InitialStateType = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

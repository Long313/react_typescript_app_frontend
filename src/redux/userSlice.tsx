import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AllUserState = {
  allUser: null | any;
  isFetching: boolean;
  error: boolean;
};

type UserState = {
  users: AllUserState;
  message: string;
};

const initialState: UserState = {
  users: {
    allUser: null,
    isFetching: false,
    error: false,
  },
  message: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action: PayloadAction<any>) => {
      state.users.isFetching = false;
      state.users.allUser = action.payload;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.message = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.message = action.payload;
    },
  },
});

export const {
  getUserStart,
  getUserFailed,
  getUserSuccess,
  deleteUserStart,
  deleteUserFailed,
  deleteUserSuccess,
} = userSlice.actions;

export type UserSliceState = ReturnType<typeof userSlice.reducer>;

export default userSlice.reducer;

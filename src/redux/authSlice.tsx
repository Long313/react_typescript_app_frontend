import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoginState = {
  currentUser: null | any;
  isFetching: boolean;
  error: boolean;
};

type RegisterState = {
  isFetching: boolean;
  error: boolean;
  success: boolean;
};
type LogoutState = {
  isFetching: boolean;
  error: boolean;
  currentUser: any;
};

type UserState = {
  login: LoginState;
  register: RegisterState;
  logout: LogoutState;
};

const initialState: UserState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
    success: false,
  },
  logout: {
    isFetching: false,
    error: false,
    currentUser: true,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state, action: PayloadAction<any>) => {
      state.logout.isFetching = false;
      state.logout.currentUser = null;
      state.logout.error = false;
    },
    logoutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} = authSlice.actions;

export type AuthSliceState = ReturnType<typeof authSlice.reducer>;

export default authSlice.reducer;

import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import * as AcccountService from "../services/index";
import { toast } from "react-toastify";
export const loginUser = async (
  user: any,
  dispatch: (arg0: {
    payload: any;
    type: "auth/loginStart" | "auth/loginSuccess" | "auth/loginFailed";
  }) => void,
  navigate: any
) => {
  dispatch(loginStart());
  try {
    const res = await AcccountService.login(user);
    dispatch(loginSuccess(res.data));
    toast.success("Wellcome!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    localStorage.setItem("loggedInUser", JSON.stringify(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
    toast.error("Login failed. Try again !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const registerUser = async (
  user: any,
  dispatch: (arg0: {
    payload: any;
    type: "auth/registerStart" | "auth/registerSuccess" | "auth/registerFailed";
  }) => void,
  navigate: any
) => {
  dispatch(registerStart());
  try {
    const res = await AcccountService.register(user);
    dispatch(registerSuccess(res.data));
    toast.success("You have successfully registered!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
    toast.error("Register error. Please try again!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

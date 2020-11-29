import axiosInstance from "../utils/axiosInstance";
import * as actionTypes from "./actionTypes";

export const setAuthState = (authState) => {
  return {
    type: "AUTH_STATE",
    payload: authState,
  };
};

export const setUserData = (userData) => {
  return {
    type: "SET_USER_DATA",
    payload: userData,
  };
};

export const loginUser = (userEmail, userPwd) => {
  return async (dispatch) => {
    axiosInstance
      .post("/login", { email: userEmail, pwd: userPwd })
      .then((response) => {
        dispatch({
          type: actionTypes.USER_LOGGED_IN,
          payload: response.data,
        });
      })
      .catch((error) => console.error("Error connecting to server " + error));
  };
};

export const authWithGoogle = () => {
  return async (dispatch) => {
    axiosInstance
      .get("/auth/goolgle")
      .then((response) => {
        dispatch({
          type: actionTypes.USER_LOGGED_IN,
          payload: response.data,
        });
      })
      .catch((error) => console.error("Error connecting to server " + error));
  };
};

export const authWithApple = () => {
  return async (dispatch) => {
    axiosInstance
      .get("/auth/apple")
      .then((response) => {
        dispatch({
          type: actionTypes.USER_LOGGED_IN,
          payload: response.data,
        });
      })
      .catch((error) => console.error("Error connecting to server " + error));
  };
};

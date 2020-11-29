import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const userDataReducer = (userData = null, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return action.payload;
    case "AUTH_STATE":
      if (!action.payload) return {};
    default:
      return userData;
  }
};

const authCheckReducer = (isAuthenticated = false, action) => {
  switch (action.type) {
    case "AUTH_STATE":
      return action.payload;
    default:
      return isAuthenticated;
  }
};

export default combineReducers({
  isAuthenticated: authCheckReducer,
  userData: userDataReducer,
});

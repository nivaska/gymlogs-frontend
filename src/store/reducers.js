import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const userDataReducer = (userData = null, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return action.payload;
    case actionTypes.USER_LOGGED_OUT:
      return {};
    default:
      return userData;
  }
};

const authCheckReducer = (isAuthenticated = false, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return true;
    case actionTypes.USER_LOGGED_OUT:
      return false;
    default:
      return isAuthenticated;
  }
};

export default combineReducers({
  isAuthenticated: authCheckReducer,
  userData: userDataReducer,
});

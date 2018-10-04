import { combineReducers } from "redux";
import unsplashReducer from "./unsplashReducer";
import authReducer from "./authReducer";

export default combineReducers({
  unsplash: unsplashReducer,
  auth: authReducer
});

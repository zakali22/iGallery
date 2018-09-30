import { combineReducers } from "redux";
import unsplashReducer from "./unsplashReducer.js";

export default combineReducers({
  unsplash: unsplashReducer
});

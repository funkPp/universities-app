import dataReducer from "./data";
import { combineReducers } from "redux";
// import formReducer from "./form";

export default combineReducers({
  data: dataReducer,
  // form: formReducer
});

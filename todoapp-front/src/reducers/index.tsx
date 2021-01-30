import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { LOGOUT_SUCCESS } from "../actions/types";
import auth from "./auth";
import todos from "./todos";

/* 
  Parent reducer to put child reducers together
  Reducers specify how state changes according to actions sent to store.
*/
const appReducer = combineReducers({
  form: formReducer,
  todos,
  auth,
});

// Handle objects being shown for the wrong account if logged out and signed into another.
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

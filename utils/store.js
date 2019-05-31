import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "../reducers/user-reducer.js";

const rootReducer = combineReducers({
  user,
  form: formReducer
});

export const store = createStore(rootReducer);

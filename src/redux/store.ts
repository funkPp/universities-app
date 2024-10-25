import { createStore } from "redux";
//import {thunk} from "redux-thunk";

import rootReducer from "./reducers/";

export default createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

//export default createStore(rootReducer, applyMiddleware(thunk));

import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { appReducer, destinationReducer, sourceRedcuer } from "./reducers/";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  app: appReducer,
  source: sourceRedcuer,
  destination: destinationReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

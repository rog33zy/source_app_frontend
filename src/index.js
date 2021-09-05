import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import axios from "axios";

import "./index.css";
import App from "./App";
import {
  authReducer,
  initializeLoanEntriesReducer,
  downloadCSVFileReducer,
} from "./store/reducers";
import reportWebVitals from "./reportWebVitals";

axios.defaults.withCredentials = true;

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  loanEntries: initializeLoanEntriesReducer,
  downloadCSVFile: downloadCSVFileReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

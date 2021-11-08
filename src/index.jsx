import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import history from "./History";
import { Router } from "react-router-dom";
import store from "./redux/store";
import "./index.css";
import App from "./App";
window.global = window;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

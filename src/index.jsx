import React from "react";
import ReactDOM from "react-dom";
import history from "./History";
import { Router } from "react-router-dom";
import "./index.css";
import App from "./App";
window.global = window;
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

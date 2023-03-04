import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "frontend/components";

import store from "store/store";

import "frontend/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

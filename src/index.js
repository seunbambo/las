import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Routing } from "./route";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../src/Reducers/rootReducer";
import storeSynchronize from "redux-localstore";
const store = createStore(rootReducer);
storeSynchronize(store);

console.log = console.warn = console.error = () => {};
ReactDOM.render(
  <Provider store={store}>{Routing}</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

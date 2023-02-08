import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/scss/main.scss";
import "./styles/scss/tailwind.scss";

import { Provider } from "react-redux";
import store from "./store";
import "./firebaseInit";
import LocalServiceWorkerRegister from "./sw-register";
import "./helper/backend-events";
//require('dotenv').config();
LocalServiceWorkerRegister();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/scss/main.scss";
import "./styles/scss/tailwind.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import store from "./store";
import "./firebaseInit";
import LocalServiceWorkerRegister from "./sw-register";
import "./helper/backend-events";
import ScrollToTop from "front-end/common/ScrollToTop";
//require('dotenv').config();
LocalServiceWorkerRegister();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

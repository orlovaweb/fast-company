import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "./store/createStore";
import history from "./utils/history";
// import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
reportWebVitals();

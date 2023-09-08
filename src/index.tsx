import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./config/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./providers/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundry";

export const store = configureStore("");
ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <React.StrictMode>
            <App />
            <ToastContainer />
          </React.StrictMode>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

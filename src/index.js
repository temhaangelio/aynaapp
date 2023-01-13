import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const AlertTemplate = ({ style, options, message, close }) => (
  <div
    className="d-flex flex-row bg-dark p-3 m-3"
    style={{ borderRadius: 10, zIndex: 1000 }}>
    <span
      style={{ paddingRight: 10, marginTop: 3 }}
      className="material-symbols-outlined">
      info
    </span>
    <span>{message}</span>
  </div>
);

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);

reportWebVitals();

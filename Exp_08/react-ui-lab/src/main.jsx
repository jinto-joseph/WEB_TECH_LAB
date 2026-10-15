import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  window.__REACT_APP_MOUNTED__ = true;
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
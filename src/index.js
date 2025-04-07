import React from "react";
import { createRoot } from "react-dom/client";
import App from "./main-component/App";
import "./index.css";
import "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from "./reportWebVitals";

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();

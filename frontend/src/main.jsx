import React from "react";
// Core React library for building UI components

import ReactDOM from "react-dom/client";
// ReactDOM is used to render React components into the DOM (browser)

import App from "./App.jsx";
// Main App component where your entire app's structure begins

import "./index.css";
// Global CSS styles applied throughout the app

// Mount the React app into the root element in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode runs additional checks and warnings in development mode */}
    <App />
  </React.StrictMode>
);

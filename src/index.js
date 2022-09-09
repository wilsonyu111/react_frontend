import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutePages from "./components/RouterPages";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
root.render(<RoutePages />);

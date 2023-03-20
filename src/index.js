import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./style/css/index.css";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
//import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

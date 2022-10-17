import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./LoginPage";
import App from "./App";
import Portal from "./UserPortal";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";

function PageRouter() {
  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <nav className="navBar">
            <Link to="/" className="homePage">
              Home
            </Link>
            <Link to="/login" className="loginPage">
              login
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<App state={true} />} />
            <Route path="/dashboard" element={<Portal state={true} />} />
            <Route path="/login" element={<Login state={true} />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
}

export default PageRouter;

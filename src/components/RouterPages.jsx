import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./LoginPage";
import App from "./App";
import Portal from "./UserPortal";
import WaitPge from "./WaitingPage";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";

function PageRouter() {
  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <nav className="navBar">
            <h1 className="heading">Maria Sensor</h1>
            <Link to="/" className="homePage">
              <h3 className="homeBtn">Home</h3>
            </Link>
            <Link to="/login" className="loginPage">
              <h3 className="loginBtn">login</h3>
            </Link>
          </nav>
          <div className="divider">""</div>

          <Routes>
            <Route path="/" element={<App state={true} />} />
            <Route path="/dashboard" element={<Portal state={true} />} />
            <Route path="/login" element={<Login state={true} />} />
            <Route path="/waitPage" element={<WaitPge state={true} />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
}

export default PageRouter;

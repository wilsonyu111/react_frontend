import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./LoginPage";
import App from "./App";

function pageRouter() {
  return (
    <>
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
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default pageRouter;

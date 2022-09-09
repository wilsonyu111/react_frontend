import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./LoginPage";
import App from "./App";

function pageRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default pageRouter;

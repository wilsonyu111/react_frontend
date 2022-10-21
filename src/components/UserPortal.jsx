// import { useState } from "react";
import { React, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Listsettings from "./listSetting";

let rendered = false;
let initialRequest = -1;

function extractSessionCookie() {
  let token = "";
  let cookieList = document.cookie.split(";");
  if (cookieList !== undefined) {
    cookieList.forEach((coookie) => {
      if (coookie.indexOf("sessionID=") > -1) {
        token = coookie.substring(coookie.indexOf("sessionID=") + 10);
        return;
      }
    });
  }
  return token;
}

function User() {
  let sessionToken = extractSessionCookie(); //commented out for testing logged in
  const location = useLocation();

  if (sessionToken === "") {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Listsettings dataMap={location.state.dataMap} />
    </>
  );
}

export default User;

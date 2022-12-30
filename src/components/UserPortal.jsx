// import { useState } from "react";
import { React, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Listsettings from "./listSetting";
import { extractSessionCookie } from "./cookieFunctions";

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

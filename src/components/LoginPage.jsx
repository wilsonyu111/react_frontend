import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Message from "./message";
import { extractSessionCookie } from "./cookieFunctions";

// function for checking if the session token exist
// if it exist the user has logged in
// redirect user to dashboard page

function Login() {
  console.log("login page");

  const loginMessage = "logging in ...";
  const [loginState, updateLoginState] = useState(<LoginComp />);
  const [sessionToken, updateSessionToken] = useState(extractSessionCookie());

  if (sessionToken !== "") {
    return <Navigate replace to="/" />;
  }

  // this function checks to see if the user has entered the corerct password
  // when the server returns 200 and token
  // if the user has entered the password correctly
  // it will navigate the use to the dashboard
  function triedLogin(customMsg = "") {
    if (customMsg === "") {
      return <></>;
    }
    return (
      <>
        <Message msg={customMsg} />
      </>
    );
  }

  function LoginComp(props) {
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");

    function updateName(event) {
      setusername(event.target.value);
    }

    function updatePass(event) {
      setPassword(event.target.value);
    }

    function sendCredential() {
      const request = new XMLHttpRequest();
      console.log("sending logging request");
      request.addEventListener("readystatechange", () => {
        // in async request, ready state 4 is when the request is fully done
        // look at xml readystatechange for what each code means
        if (request.readyState === 4) {
          if (request.status === 401 || request.status === 400) {
            updateLoginState(
              <LoginComp loginMsg={"wrong username/password"} />
            );
          } else if (request.status === 200) {
            updateSessionToken(extractSessionCookie());
            updateLoginState(<LoginComp loginMsg={"login sucessful"} />);
          } else {
            updateLoginState(
              <LoginComp loginMsg={"login error, please try again later "} />
            );
          }
        }
      });

      const jsonData = {
        username: username,
        password: password,
      };

      request.open("POST", "/login", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(jsonData));
      updateLoginState(<Message msg={loginMessage} />);
    }

    return (
      <div className="loginDiv">
        {triedLogin(props.loginMsg)}

        <form className="loginBox">
          <label>
            <div className="usernameSec">
              <input
                type="text"
                name="username"
                className="username"
                value={username}
                onChange={updateName}
                placeholder="username"
              />
            </div>
          </label>
          <label>
            <div className="passwordSec">
              <input
                type="password"
                name="password"
                className="password"
                placeholder="password"
                value={password}
                onChange={updatePass}
              />
            </div>
          </label>
        </form>
        <button onClick={sendCredential} className="loginButton">
          {" "}
          login{" "}
        </button>
      </div>
    );
  }

  return loginState;
}
export default Login;

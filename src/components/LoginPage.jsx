import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Message from "./message";

// function for checking if the session token exist
// if it exist the user has logged in
// redirect user to dashboard page
let wrongPass = false;
let loggedIn = false;
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

function Login() {
  console.log("login page");

  const loginMessage = "logging in ...";
  const [loginState, updateLoginState] = useState(<LoginComp />);
  let sessionToken = extractSessionCookie();

  if (sessionToken !== "") {
    return <Navigate replace to="/" />;
  }

  // this function checks to see if the user has entered the corerct password
  // when the server returns 200 and token
  // if the user has entered the password correctly
  // it will navigate the use to the dashboard
  function triedLogin() {
    if (wrongPass === true) {
      return <Message msg={"incorrect username or password"} />;
    } else if (loggedIn) {
      return <Message msg={"log in successful!"} />;
    }
    return <></>;
  }

  function LoginComp() {
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    function updateName(event) {
      setusername(event.target.value);
    }

    function updatePass(event) {
      setPassword(event.target.value);
    }

    function sendCredential() {
      updateLoginState(<Message msg={loginMessage} />);

      const startInterval = setInterval(function () {
        if (initialRequest === 4) {
          sessionToken = extractSessionCookie();
          updateLoginState(<LoginComp />);

          initialRequest = -1;
          clearInterval(startInterval);
        }
      }, 500);

      const request = new XMLHttpRequest();
      console.log("sending logging request");
      request.addEventListener("readystatechange", () => {
        // in async request, ready state 4 is when the request is fully done
        // look at xml readystatechange for what each code means
        if (request.readyState === 4) {
          if (request.status === 401 || request.status === 400) {
            wrongPass = true;
          } else if (request.status === 500) {
            console.log("server error, please try again later");
          } else if (request.status === 200) {
            loggedIn = true;
          } else {
            console.log("status code: " + request.status);
          }

          initialRequest = request.readyState;
        }
      });

      const jsonData = {
        username: username,
        password: password,
      };

      request.open("POST", "/login", true);
      request.setRequestHeader("Content-Type", "application/json");
      console.log(JSON.stringify(jsonData));
      request.send(JSON.stringify(jsonData));
      initialRequest = request.readyState;
    }

    return (
      <div className="loginDiv">
        <h1 className="heading">Login Page</h1>
        {triedLogin()}

        <form className="loginBox">
          <label>
            login:{" "}
            <input
              type="text"
              name="username"
              className="username"
              value={username}
              onChange={updateName}
            />{" "}
          </label>
          <label>
            password:{" "}
            <input
              type="password"
              name="password"
              className="password"
              value={password}
              onChange={updatePass}
            />{" "}
          </label>
        </form>
        <button onClick={sendCredential}> login </button>
      </div>
    );
  }

  return loginState;
}
export default Login;

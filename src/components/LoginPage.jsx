import React from "react";
import { useState } from "react";

function Login() {
  let wrongPass = false;
  let loggedIn = false;
  let initialRequest = -1;
  const loginMessage = "logging in ...";
  const [loginState, updateLoginState] = useState(<LoginComp />);

  function Message(props) {
    return <div>{props.message}</div>;
  }

  function triedLogin() {
    if (wrongPass === true) {
      return <h2>"invalid username or password"</h2>;
    } else if (loggedIn) {
      return <h2>"log in successful!"</h2>;
    }
    return <h2></h2>;
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
      updateLoginState(<Message name={loginMessage} />);

      const startInterval = setInterval(function () {
        if (initialRequest === 4) {
          console.log("waiting for login update");
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
          } else {
            loggedIn = true;
          }

          initialRequest = request.readyState;
        }
      });
      const jsonData = {
        username: username,
        password: password,
      };
      request.open("POST", "http://192.168.1.236:5000/login", true);
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

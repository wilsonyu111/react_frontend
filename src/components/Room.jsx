import { React, useState } from "react";
import Box from "./Box";
import Message from "./message";
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function Room(props) {
  let clicked = false;
  let dataMap = new Map();
  const navigate = useNavigate();
  const [buttonClicked, updateClicked] = useState(clicked);

  function updatePageValue() {
    const request = new XMLHttpRequest();
    console.log("sending request");
    request.addEventListener("readystatechange", () => {
      // in async request, ready state 4 is when the request is fully done
      // look at xml readystatechange for what each code means
      if (request.readyState === 4) {
        const data = request.responseText;
        dataMap = new Map(Object.entries(JSON.parse(data)));
        navigate("/dashboard", { state: { dataMap: dataMap } });
      }
    });

    request.open("POST", "http://192.168.1.236:5000/testSensorConfig", true);
    const jsonBody = JSON.stringify({ MAC_ADDRESS: props.sensorID });
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonBody);
    updateClicked(true);
    return dataMap;
  }

  function loadingMessage() {
    if (buttonClicked) {
      return <Message key="loadingMsg" msg={"loading data..."} />;
    }
    return <></>;
  }

  return (
    <div className="room">
      <button className="configPage" onClick={updatePageValue}>
        {" "}
        config
      </button>
      <h2>room {props.roomId}</h2>
      {loadingMessage()}
      <Box img="/img/temp.png" name="temperature" data={props.temp} />
      <Box img="/img/water-drop.png" name="hudmidity" data={props.hud} />
      <Box img="/img/future.png" name="last active" data={props.lastActive} />
      <Box
        img="/img/light-bulb.png"
        name="light status"
        data={props.lightStatus}
      />
    </div>
  );
}
export default Room;

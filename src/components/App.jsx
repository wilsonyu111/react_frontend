import React, { useState } from "react";
import Room from "./Room";
import Message from "./message";

let rendered = false;
let initialRequest = -1;
let storedData = [];

function createRoom(info, keyValue) {
  if (info.size === 0) {
    return <Message key={keyValue} msg={"loading data..."} />;
  } else {
    const [temperature, hudmidity, lastActive, lightStatus, location, macadd] =
      Object.values(info);

    return (
      <Room
        key={keyValue}
        roomId={location}
        temp={temperature}
        hud={hudmidity}
        lastActive={lastActive}
        lightStatus={lightStatus}
        sensorID={macadd}
      />
    );
  }
}

function createRoomHelper(dataList) {
  const compList = [];
  if (dataList.length === 0) {
    compList.push(createRoom(new Map(), 0));
  } else {
    dataList.forEach((items, index) => {
      compList.push(createRoom(items, index));
    });
  }
  return compList;
}

function App() {
  const [roomData, updateRoomVal] = useState(storedData); // for storing map object
  const startInterval = setInterval(function () {
    // console.log(rendered, initialRequest);
    if (!rendered && initialRequest === -1) {
      updatePageValue();
    } else if (rendered && initialRequest === 4) {
      clearInterval(startInterval);
    }
  }, 1000);

  function updatePageValue() {
    const request = new XMLHttpRequest();
    console.log("sending request");
    const dataList = [];
    request.addEventListener("readystatechange", () => {
      // in async request, ready state 4 is when the request is fully done
      // look at xml readystatechange for what each code means
      if (request.readyState === 4) {
        const data = request.responseText;
        const dataMap = new Map(Object.entries(JSON.parse(data)));
        dataMap.forEach((value, key) => {
          value.mac_address = key;
          dataList.push(value);
        });
        updateRoomVal(dataList);
        storedData = dataList;
        rendered = true;
        initialRequest = request.readyState;
      }
    });
    request.open("GET", "/getData", true);
    request.send();
    initialRequest = request.readyState;
    return dataList;
  }

  return (
    <div className="info">
      <button className="refreshBtn" onClick={updatePageValue}>
        {" "}
        refresh
      </button>
      {createRoomHelper(roomData)}
    </div>
  );
  //  send get request to flask
  // get json, parse json into hashmap
  // loop through hashmap
  // for each loop to create room
}
export default App;

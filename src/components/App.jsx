import React, { useState } from "react";
import Room from "./Room";

let rendered = false;
let initialRequest = -1;

function createRoom(info, keyValue) {
  if (info.size === 0) {
    return (
      <h1 key={keyValue} className="loading_data">
        {" "}
        loading data...{" "}
      </h1>
    );
  } else {
    const [temperature, hudmidity, lastActive, location] = Object.values(info);

    return (
      <Room
        key={location}
        roomId={location}
        temp={temperature}
        hud={hudmidity}
        last_active={lastActive}
      />
    );
  }
}

function createRoomHelper(dataList) {
  let compList = [];
  if (dataList.length === 0) {
    compList.push(createRoom(new Map(), 0));
  } else {
    dataList.forEach((item, index) => {
      compList.push(createRoom(item, index));
    });
  }
  return compList;
}

function App() {
  const [roomData, updateRoomVal] = useState([]);

  const startInterval = setInterval(function () {
    console.log(rendered, initialRequest);
    if (!rendered && initialRequest === -1) {
      updatePageValue();
    } else if (rendered && initialRequest === 4) {
      clearInterval(startInterval);
    }
  }, 1000);

  function updatePageValue() {
    const request = new XMLHttpRequest();
    console.log("sending request");
    let dataList = [];
    request.addEventListener("readystatechange", () => {
      // in async request, ready state 4 is when the request is fully done
      // look at xml readystatechange for what each code means
      if (request.readyState === 4) {
        const data = request.responseText;
        const dataMap = new Map(Object.entries(JSON.parse(data)));
        dataMap.forEach((value, key) => {
          dataList.push(value);
        });
        updateRoomVal(dataList);
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
      <h1 className="heading">Petaluma</h1>
      <button onClick={updatePageValue}> refresh</button>
      {createRoomHelper(roomData)}
    </div>
  );
  //  send get request to flask
  // get json, parse json into hashmap
  // loop through hashmap
  // for each loop to create room
}
export default App;

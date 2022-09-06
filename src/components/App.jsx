import React, { useState, useEffect } from "react";
import Room from "./Room";
import info from "../info";

function createRoom(info) {
  if (info.size === 0) {
    return <h1 className="loading_data"> loading data... </h1>;
  } else {
    return (
      <Room
        key={info.id}
        roomId={info.id}
        temp={info.temp}
        hub={info.hub}
        last_active={info.last_active}
      />
    );
  }
}

function createRoomHelper(dataList) {
  let compList = [];
  if (dataList.length === 0) {
    compList.push(createRoom(new Map()));
  } else {
    dataList.forEach((item, index) => {
      compList.push(createRoom(item));
    });
  }
  return compList;
}

function App() {
  const [roomData, updateRoomVal] = useState([]);
  console.log("running");

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log("use effect running");
  //   updatePageValue();
  // });
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
        console.log(dataList);
        updateRoomVal(dataList);
      }
    });
    request.open("GET", "http://192.168.1.236:5000/getData", true);
    request.send();
    return dataList;
  }

  return (
    <div className="info">
      <h1 className="heading">Petaluma</h1>
      {createRoomHelper(roomData)}
      <h2 onClick={updatePageValue}> refresh </h2>
    </div>
  );
  //  send get request to flask
  // get json, parse json into hashmap
  // loop through hashmap
  // for each loop to create room
}
export default App;

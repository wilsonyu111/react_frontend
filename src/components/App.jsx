import React, { useState } from "react";
import Room from "./Room";
import Message from "./message";

let rendered = false;
let initialRequest = -1;
function LoadingMessage() {
  return <Message key="loading" msg={"loading data..."} />;
}

function createRoom(info, keyValue) {
  if (info.size === 0) {
    return <Message key="noData" msg={"server has no data, try again later"} />;
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
  const [displaydata, updateDisplay] = useState(<LoadingMessage />);
  const startInterval = setInterval(function () {
    if (!rendered && initialRequest === -1) {
      updatePageValue();
    } else if (rendered && initialRequest === 4) {
      clearInterval(startInterval);
    }
  }, 1000);

  function updatePageValue() {
    updateDisplay(<LoadingMessage />);
    const request = new XMLHttpRequest();
    console.log("sending request");
    const dataList = [];
    request.addEventListener("readystatechange", () => {
      // in async request, ready state 4 is when the request is fully done
      // look at xml readystatechange for what each code means
      if (request.readyState === 4) {
        console.log(request.status);
        if (request.status === 200) {
          const data = request.responseText;
          const dataMap = new Map(Object.entries(JSON.parse(data)));
          dataMap.forEach((value, key) => {
            value.mac_address = key;
            dataList.push(value);
          });
          updateDisplay(createRoomHelper(dataList));
        } else {
          updateDisplay(
            <Message
              key="errorLoading"
              msg={"unable to fetch data, refresh or try again later"}
            />
          );
        }

        rendered = true;
        initialRequest = request.readyState;
      }
    });
    request.open("GET", "/getData", true);
    // request.open("GET", "/getData", true);
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
      {displaydata}
    </div>
  );
}
export default App;

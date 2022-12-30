import React from "react";
import { useState } from "react";
import { extractSessionCookie } from "./cookieFunctions";
import { useNavigate } from "react-router-dom";

function EditWindow(props) {
  const [sleepTimer, setSleepTimer] = useState("");
  const [destPort, setDestPort] = useState("");
  const [locationName, setLocationName] = useState("");
  const [installedLightSensor, setInstalledLightSensor] = useState("");
  const navigate = useNavigate();

  function updateSleepTimer(event) {
    setSleepTimer(event.target.value);
  }

  function updateDestPort(event) {
    setDestPort(event.target.value);
  }
  function updateLocationName(event) {
    setLocationName(event.target.value);
  }

  function updateInstalledLight(event) {
    setInstalledLightSensor(event.target.value);
  }

  function submitChanges() {
    const request = new XMLHttpRequest();
    const jsonData = {
      MAC_ADDRESS: props.dataMap.get("sensor_id"),
      action: "change_stat",
      sleep_timer: sleepTimer,
      dest_port: destPort,
      location_name: locationName,
      installed_light: installedLightSensor,
    };
    request.addEventListener("readystatechange", () => {
      // in async request, ready state 4 is when the request is fully done
      // look at xml readystatechange for what each code means
      if (request.readyState === 4) {
        let msg = "";
        if (request.status === 200) {
          msg = "change sucessful, redirecting to main page";
        } else {
          msg = "change failed, redirecting to main page...";
        }

        navigate("/waitPage", {
          state: {
            message: msg,
            newKey: request.status,
            newPage: "/",
          },
        });
      }
    });

    request.open("POST", "/checkAction", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(jsonData));
  }

  return (
    <>
      <form className="editWindow">
        <label>
          <div className="sleepTimerDiv">
            <input
              type="text"
              name="sleepTimer"
              className="sleepTimerIn"
              value={sleepTimer}
              onChange={updateSleepTimer}
              placeholder={"sleep timer: " + props.dataMap.get("sleep_timer")}
            />
          </div>
        </label>
        <label>
          <div className="destPortDiv">
            <input
              type="text"
              name="destination port: "
              className="destPortIn"
              value={destPort}
              onChange={updateDestPort}
              placeholder={"dest port: " + props.dataMap.get("dest_port")}
            />
          </div>
        </label>

        <label>
          <div className="locationNameDiv">
            <input
              type="text"
              name="location name: "
              className="locationNameIn"
              value={locationName}
              onChange={updateLocationName}
              placeholder={"location: " + props.dataMap.get("location_name")}
            />
          </div>
        </label>

        <label>
          <div className="installedLightDiv">
            <input
              type="text"
              name="installed Light?: "
              className="installedLightSensorIn"
              value={installedLightSensor}
              onChange={updateInstalledLight}
              placeholder={
                "installed light: " + props.dataMap.get("installed_light")
              }
            />
          </div>
        </label>
      </form>

      <button className="submitButton" onClick={submitChanges}>
        {" "}
        submit
      </button>
    </>
  );
}

export default EditWindow;

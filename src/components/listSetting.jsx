import React from "react";
import Message from "./message";
import { useState } from "react";
import EditWindow from "./EditWindow";

function Listsettings(props) {
  const [infoWindow, updateInfoWindow] = useState(makeCompList());

  function makeCompList() {
    if (props.dataMap.size !== 0) {
      const compList = [];
      compList.push(
        <button key={"editButton"} className="editButton" onClick={editMode}>
          {" "}
          edit
        </button>
      );
      props.dataMap.forEach((value, key) => {
        compList.push(<Message key={key} msg={key + ":" + value} />);
      });

      return compList;
    }

    return <Message key={"noData"} msg={"loading data..."} />;
  }

  function cancelEdit() {
    updateInfoWindow(makeCompList());
  }

  function editMode() {
    updateInfoWindow(
      <div>
        <EditWindow dataMap={props.dataMap} />
        <button className="cancelButton" onClick={cancelEdit}>
          {" "}
          cancel
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="window">{infoWindow}</div>
    </>
  );
}

export default Listsettings;

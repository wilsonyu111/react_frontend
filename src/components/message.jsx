import React from "react";

function Msg(props) {
  return (
    <div className="messageBox">
      <h2>{props.msg}</h2>
    </div>
  );
}

export default Msg;

import React from "react";

function Data(props) {
  return(
    <div>
        <p className="info">{props.name}</p>
        <p className="info">{props.data}</p>
    </div>
  );
}

export default Data;
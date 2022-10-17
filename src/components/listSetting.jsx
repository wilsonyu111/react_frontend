import React from "react";
import Message from "./message";

function Listsettings(props) {
  function makeCompList() {
    if (props.dataMap.size !== 0) {
      const compList = [];
      props.dataMap.forEach((value, key) => {
        compList.push(<Message key={key} msg={key + ":" + value} />);
      });

      return compList;
    }

    return <Message key={"noData"} msg={"loading data..."} />;
  }

  return <>{makeCompList()}</>;
}

export default Listsettings;

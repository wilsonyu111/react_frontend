import React from "react";
import Box from "./Box";
 
function Room(props) {
 return (
   <div className="room">
    <h2>room {props.roomId}</h2>
     <Box 
        img = "/img/temp.png"
        name = "temperature"
        data = {props.temp}
     />
     <Box
        img = "/img/water-drop.png"
        name = "hudmidity"
        data = {props.hud}
     />
      <Box
        img = "/img/future.png"
        name = "last active"
        data = {props.last_active}
     />
   </div> );}
export default Room;
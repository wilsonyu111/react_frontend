import React from "react";
import Box from "./Box";
 
function Room(props) {
 return (
   <div className="room">
    <h2>room{props.location}</h2>
     <Box 
        img = "/img/temp.png"
        name = "temp"
        data = {props.temperature}
     />
     <Box 
        img = "/img/water-drop.png"
        name = "hub"
        data = {props.hudmidity}
     />
      <Box 
        img = "/img/future.png"
        name = "hub"
        data = {props.last}
     />
   </div> );}
export default Room;
import React from "react";
import Icon from "./Icon";
import Data from "./Data";
 
function Box(props) {
 return (
   <div className="box">
    <Icon img = {props.img}></Icon>
    <Data 
      name = {props.name}
      data = {props.data}
    />
   </div> );}
export default Box;
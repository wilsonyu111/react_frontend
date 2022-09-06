import React from "react";

function Icon(props) {
    return <img
    className="icon-img"
    src={process.env.PUBLIC_URL + props.img}
    alt="icon_img" />;
   }

   
export default Icon;
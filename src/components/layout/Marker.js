import React from "react";
import defaultIco from "../assets/logo.png";

const Marker = (props) => {
  const { color, name, id, url } = props;
  console.log(color);
  let displayColor = color;
  switch(color){
    case "eager":
      displayColor = "yellow";
      break;
    case "available":
      displayColor = "green";
      break;
    case "unavailable":
      displayColor = "red";
      break;
    case "anonymous":
      displayColor = "gray";
      break;
    case "dnd":
      displayColor = "purple";
      break;
  }
  
  return (
    <div>
      <div
        className="pin bounce"
        style={{
          backgroundColor: displayColor,
          cursor: "pointer",
        }}
        title={name}
      >
        <img src={url == "" ? defaultIco : url} className="marker-img"></img>
      </div>

      <div className="pulse" />
    </div>
  );
};

export default Marker;

import React from "react";
import defaultIco from "../assets/logo.png";

const Marker = props => {
  const { color, name, id, url } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{
          backgroundColor: color,
          cursor: "pointer",
          borderStyle: "dotted"
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

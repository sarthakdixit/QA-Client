import React from "react";
import { Requirements } from "react-loader-ui";

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        display: "block",
        height: "100vh",
        width: "100%",
        position: "sticky",
        zIndex: 10,
      }}
    >
      <Requirements name="flipbox" color1="black" />
    </div>
  );
};

export default Spinner;

import React from "react";
import "./loaderStyles.css";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
      }}
    >
      <span className="loader"></span>{" "}
    </div>
  );
};

export default Loader;

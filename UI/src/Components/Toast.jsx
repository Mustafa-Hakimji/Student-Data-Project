import React, { useState } from "react";
import { useContextHook } from "../Providers/ContextProvider";

const Toast = () => {
  const { toastVisible, toastMsg, setToastVisible, toastColor } =
    useContextHook();

  const styles = {
    container: {
      position: "absolute",
      width: "100%",
      top: 20,
      right: 0,
      left: 0,
      backgroundColor: toastColor ? toastColor : "none",
    },
  };

  setTimeout(() => setToastVisible(false), 5000);

  if (!toastVisible) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h5
        style={{
          textAlign: "center",
          wordSpacing: "2px",
          letterSpacing: "2px",
          color: toastColor ? "white" : "black",
          margin: 10,
        }}
      >
        {toastMsg}
      </h5>
    </div>
  );
};

export default Toast;

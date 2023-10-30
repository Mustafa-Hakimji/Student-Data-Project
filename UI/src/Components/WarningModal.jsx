import React from "react";

const WarningModal = ({ message, setState, method, showToast }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      height: 300,
      width: "100%",
      flexDirection: "column",
      position: "absolute",
      top: "20%",
      backgroundColor: "#DEFDFF",
      borderRadius: 20,
    },
    subContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 30,
    },
  };

  return (
    <>
      <div style={styles.container}>
        <h2>{message}</h2>
        <div style={styles.subContainer}>
          <button
            onClick={() => setState(false)}
            className="btn btn-outline-info"
          >
            No
          </button>

          <button
            onClick={() => {
              method();
              showToast("Student delted successfully", "info");
              setState(false);
            }}
            className="btn btn-outline-danger"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
};

export default WarningModal;

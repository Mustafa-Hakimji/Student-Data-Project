import React, { useEffect, useState } from "react";
import { useContextHook } from "../../Providers/ContextProvider";
import { useNavigate } from "react-router-dom";

const DisplayTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const { isLogin } = useContextHook();
  const navigation = useNavigate();

  const styles = {
    mainContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignSelf: "center",
      width: "100%",
      padding: 100,
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      margin: 10,
      border: "1px solid black",
      borderRadius: 20,
      backgroundColor: "#42CFDA",
    },
    btn: {
      alignSelf: "center",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginTop: 20,
    },
  };

  const getTeachers = async () => {
    const response = await fetch("http://localhost:4000/get-all-teachers");
    const data = await response.json();
    if (data.status === 200) {
      setTeachers(data.data);
    } else {
      setTeachers(undefined);
    }
  };
  useEffect(() => {
    getTeachers();
  }, []);

  const deleteTeacher = async (email) => {
    try {
      const res = await fetch("http://localhost:4000/delete-teacher", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log("Delete Console", res.status);
      if (res.status === 200) {
        getTeachers();
      }
    } catch (error) {
      console.log("Issue getting teacher--> ", error);
    }
  };

  if (!isLogin) {
    navigation("/login");
  }
  return (
    <>
      <div style={styles.mainContainer}>
        {teachers.length > 0 &&
          teachers.map((item, index) => {
            if (item.designation.toLowerCase() === "teacher") {
              return (
                <div style={styles.cardContainer} key={index}>
                  <h5>
                    {item.fName} {item.lName}
                  </h5>
                  <h5>{item.designation}</h5>
                  <h5>{item.phone}</h5>
                  <button
                    onClick={() => deleteTeacher(item.email)}
                    style={styles.btn}
                    className="btn btn-outline-danger"
                  >
                    delete
                  </button>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default DisplayTeachers;

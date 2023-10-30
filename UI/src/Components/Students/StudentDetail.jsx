import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import WarningModal from "../WarningModal";
import Toast from "../Toast";
import { useContextHook } from "../../Providers/ContextProvider";

const StudentDetail = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState(null);
  const [student, setStudent] = useState({
    name: "",
    surname: "",
  });
  const { showToast } = useContextHook();

  let name, value;

  const handleInput = (event) => {
    name = event.target.name;
    value = event.target.value;

    setStudent({ ...student, [name]: value });
  };

  const getStudents = async (name, surname, section) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/get-all-students");
      const data = await res.json();

      if (data.status === 200) {
        if (section === "all") {
          setStudents(data.data);
          setLoading(false);
          return;
        }
        const filteredStudents = data.data.filter((item) => {
          if (name && surname && section) {
            console.log("Filter method 1");
            return (
              item.name.toLowerCase() === name.toLowerCase() &&
              item.surname.toLowerCase() === surname.toLowerCase() &&
              item.section === section
            );
          } else if (name && surname) {
            console.log("Filter method 2");
            return (
              item.name.toLowerCase() === name.toLowerCase() &&
              item.surname.toLowerCase() === surname.toLowerCase()
            );
          } else if (name && section) {
            console.log("Filter method 3");
            return (
              item.name.toLowerCase() === name.toLowerCase() &&
              item.section === section
            );
          } else if (name) {
            console.log("Filter method 4");
            return item.name.toLowerCase() === name.toLowerCase();
          } else if (section) {
            console.log("Filter method 5");
            return item.section === section;
          } else if (surname) {
            console.log("Filter method 6");
            return item.surname.toLowerCase() === surname.toLowerCase();
          }
        });
        setStudents(filteredStudents);
        setLoading(false);
      } else {
        setStudents(undefined);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error white getting Students --> ", error);
      setLoading(false);
    }
  };

  const searchStudents = () => {
    console.log("search students function called");
    if (!student.name && !student.surname && !section) {
      alert("Please select atleast one to search ");
      return;
    } else {
      getStudents(student.name, student.surname, section);
    }
  };

  const deleteStudent = (name, surname, section) => {
    setLoading(true);
    fetch(`http://localhost:4000/delete-student`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        section,
      }),
    })
      .then((res) => {
        console.log("Delete student API--> ", res);
        getStudents(name, surname, section);
      })
      .catch((err) => console.log("unable to delete student --> ", err))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loader />;
  }

  const styles = {
    btn: {
      height: 20,
      width: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    mainContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    filterContainer: {
      display: "flex",
      position: "absolute",
      left: 0,
      height: "80vh",
      width: "30%",
      justifyContent: "flex-start",
    },
    input: {
      border: "none",
      borderBottom: "2px solid black",
      margin: 10,
      padding: 10,
      width: "80%",
    },
  };

  const handleSelectChange = (event) => {
    setSection(event.target.value);
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.filterContainer} className="container mt-5">
        <div>
          <div className="signup-form">
            <h2>Filters</h2>

            <div>
              <input
                style={styles.input}
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={student.name}
                onChange={handleInput}
                placeholder="Enter Name"
              />
            </div>

            <div>
              <input
                style={styles.input}
                type="text"
                name="surname"
                id="surname"
                autoComplete="off"
                value={student.surname}
                onChange={handleInput}
                placeholder="Enter Surname"
              />
            </div>

            <div>
              <select
                style={{
                  padding: 7,
                  width: "80%",
                  borderRadius: 10,
                  margin: 10,
                }}
                defaultValue={section}
                onChange={handleSelectChange}
              >
                <option disabled>Choose</option>
                <option value={"nursary"}>Nursary</option>
                <option value={"lkg"}>L.K.G.</option>
                <option value={"ukg"}>U.K.G.</option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
                <option value={"6"}>6</option>
                <option value={"7"}>7</option>
                <option value={"8"}>8</option>
                <option value={"9"}>9</option>
                <option value={"10"}>10</option>
                <option value={"11"}>11</option>
                <option value={"12"}>12</option>
              </select>
            </div>

            <div>
              <button
                className="btn btn-outline-info"
                onClick={() => searchStudents()}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* students list table */}

      <div
        style={{
          padding: 20,
          margin: 20,
          position: "absolute",
          left: "20%",
          width: "70%",
        }}
      >
        <Toast />
        {students.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Class</th>
                <th scope="col">Father</th>
                <th scope="col">Mother</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {students.map((item, index) => {
              // console.log("MAP LOOP--> ", item.name);

              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {item.name} {item.surname}
                    </td>
                    <td>{item.section}</td>
                    <td>{item.father}</td>
                    <td>{item.mother}</td>
                    <td>
                      <button
                        style={styles.btn}
                        onClick={() => {
                          deleteStudent(item.name, item.surname, item.section);
                          showToast("Student Deleted successfully", "info");
                        }}
                        className="btn btn-outline-danger"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        ) : (
          <h3>No Student Found by name in data.</h3>
        )}

        <Toast />
      </div>
    </div>
  );
};

export default StudentDetail;

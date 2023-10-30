import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DeleteStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    surname: "",
    section: "",
  });

  let name, value;

  const handleInput = (event) => {
    name = event.target.name;
    value = event.target.value;

    setStudent({ ...student, [name]: value });
  };

  const studentDetails = {
    name: student.name,
    surname: student.surname,
    section: student.section,
  };

  return (
    <>
      <div className="container mt-5">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">
              Enter Student details you want to delete.
            </h2>
            <h2 className="form-title">
              {!student.name
                ? "Please enter name"
                : !student.surname
                ? "Please enter surname"
                : !student.section
                ? "Please enter Class"
                : "Now you may proceed"}
            </h2>
            <form method="POST" className="register-form" id="register-from">
              <div className="form-group">
                <label className="label" htmlFor="name">
                  <i className="zmdi zmdi-account "></i>
                </label>
                <input
                  className="input-data"
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={student.name}
                  onChange={handleInput}
                  placeholder="Enter Name"
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="surname">
                  <i className="zmdi zmdi-account "></i>
                </label>
                <input
                  className="input-data"
                  type="text"
                  name="surname"
                  id="surname"
                  autoComplete="off"
                  value={student.surname}
                  onChange={handleInput}
                  placeholder="Enter Surname"
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="section">
                  <i className="zmdi zmdi-font "></i>
                </label>
                <input
                  className="input-data"
                  type="text"
                  name="section"
                  id="section"
                  autoComplete="off"
                  value={student.section}
                  onChange={handleInput}
                  placeholder="Enter Class"
                />
              </div>

              <div className="form-group">
                <Link to={"/delete-detail"} state={studentDetails}>
                  <input
                    className=" form-submit"
                    type="submit"
                    name="signup"
                    id="signup"
                    value={"Search Student"}
                    disabled={
                      !student.name || !student.section || !student.surname
                    }
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteStudent;

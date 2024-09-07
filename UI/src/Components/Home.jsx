import React from "react";
import "./Styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useContextHook } from "../Providers/ContextProvider";

const Home = () => {
  const buttonStyles = {
    height: "150px",
  };
  const { userData, schoolName, isLogin } = useContextHook();
  const navigate = useNavigate();

  return (
    <>
      <div className="pt-5 my-5">
        <div className="home-div my-5">
          <p>
            {isLogin
              ? `Welcome ${userData.fName}, to My School Student Data management App.`
              : "Please Login first."}
          </p>
          <h1>{schoolName}</h1>
          <h2>Where you can manage your Data of Students Easily and fast.</h2>
        </div>

        <Link to={"/class-list"}>
          <button
            style={buttonStyles}
            type="button"
            className="btn btn-outline-success"
          >
            View Students
          </button>
        </Link>
        <button
          style={buttonStyles}
          type="button"
          className="btn btn-outline-warning"
        >
          View Fees
        </button>
        <Link to={`/add-student`}>
          <button
            style={buttonStyles}
            type="button"
            className="btn btn-outline-info"
          >
            Add Student
          </button>
        </Link>

        {userData?.designation === "Admin" && (
          <Link to={`/delete-detail`}>
            <button
              style={buttonStyles}
              type="button"
              className="btn btn-outline-danger"
            >
              Delete Student
            </button>
          </Link>
        )}
      </div>
      <div className="container my-5">
        <Link to={`/teachers`}>
          <button style={buttonStyles} type="button" className="btn btn-info">
            Teacher's
          </button>
        </Link>
        <button style={buttonStyles} type="button" className="btn btn-info">
          Admission Enquiry
        </button>
      </div>
    </>
  );
};

export default Home;

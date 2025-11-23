import React from "react";
import {
  ADD_STUDENT,
  DELETE_STUDENT,
  PROMOTE_STUDENTS,
  UPDATE_STUDENT,
  VIEW_EDIT,
} from "../../../utils/constants/screenText";
import { useNavigate } from "react-router-dom";
import { pages } from "../../../utils/constants/navigation";

const ManageStudents = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div className="container">
      <div className="mt-3">
        <h3>
          Use the options below to manage all your students easily and
          efficiently.
        </h3>
      </div>

      <div>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.viewEditStudent);
          }}
        >
          {VIEW_EDIT}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          // onClick={() => {
          //   handleNavigation(pages.admin.manageStudents);
          // }}
        >
          {ADD_STUDENT}
        </button>
        <button
          className="feature-buttons btn btn-outline-danger m-2"
          // onClick={() => {
          //   handleNavigation(pages.admin.manageStudents);
          // }}
        >
          {DELETE_STUDENT}
        </button>
        <button
          className="feature-buttons btn btn-outline-warning m-2"
          // onClick={() => {
          //   handleNavigation(pages.admin.manageStudents);
          // }}
        >
          {UPDATE_STUDENT}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          // onClick={() => {
          //   handleNavigation(pages.admin.manageStudents);
          // }}
        >
          {PROMOTE_STUDENTS}
        </button>
      </div>
    </div>
  );
};

export default ManageStudents;

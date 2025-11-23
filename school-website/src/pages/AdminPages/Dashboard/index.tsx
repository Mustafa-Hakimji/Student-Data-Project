import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../provider/hooks";
import "./styles.css";
import { pages } from "../../../utils/constants/navigation";
import {
  MANAGE_ATTENDENCE,
  MANAGE_CLASSES,
  MANAGE_FEES,
  MANAGE_PERSONAL,
  MANAGE_REPORTS,
  MANAGE_STUDENTS,
  WELCOME_DEC,
} from "../../../utils/constants/screenText";
import { useEffect } from "react";
import { getStudentsRequest } from "../../../provider/slices/studentSlice";
import FullScreenLoader from "../../../components/Loader";
import { getClassesRequest } from "../../../provider/slices/classesSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user);
  const students = useAppSelector((state) => state.students);
  const user = data.user;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(getStudentsRequest());
    dispatch(getClassesRequest());
  }, []);

  return (
    <div className="p-5">
      <div>
        <h1>Welcome {user?.fullName} to the School Management Portal.</h1>
        <p className="mt-3">{WELCOME_DEC}</p>
      </div>
      <div>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.manageStudents);
          }}
        >
          {MANAGE_STUDENTS}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.manageAttendence);
          }}
        >
          {MANAGE_ATTENDENCE}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.manageClasses);
          }}
        >
          {MANAGE_CLASSES}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.manageReports);
          }}
        >
          {MANAGE_REPORTS}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.manageFees);
          }}
        >
          {MANAGE_FEES}
        </button>
        <button
          className="feature-buttons btn btn-outline-primary m-2"
          onClick={() => {
            handleNavigation(pages.admin.manageClasses);
          }}
        >
          {MANAGE_PERSONAL}
        </button>
      </div>
      <FullScreenLoader show={students.loading} />
    </div>
  );
};

export default Dashboard;

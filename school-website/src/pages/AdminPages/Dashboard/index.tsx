import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../provider/hooks";
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
import OptionButton from "../../../components/OptionButton";
import { ButtonTypes } from "../../../components/OptionButton/types";
import FullScreenLoader from "../../../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();

  const data = useAppSelector((state) => state.user);
  const students = useAppSelector((state) => state.students);
  const user = data.user;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-5">
      <div>
        <h1>Welcome {user?.fullName} to the School Management Portal.</h1>
        <p className="mt-3">{WELCOME_DEC}</p>
      </div>
      <div>
        <OptionButton
          onClick={() => {
            handleNavigation(pages.admin.manageStudents);
          }}
          title={MANAGE_STUDENTS}
          buttonType={ButtonTypes.primary}
        />
        <OptionButton
          onClick={() => {
            handleNavigation(pages.admin.manageAttendence);
          }}
          title={MANAGE_ATTENDENCE}
        />

        <OptionButton
          onClick={() => {
            handleNavigation(pages.admin.manageClasses);
          }}
          title={MANAGE_CLASSES}
        />

        <OptionButton
          onClick={() => {
            handleNavigation(pages.admin.manageReports);
          }}
          title={MANAGE_REPORTS}
        />

        <OptionButton
          onClick={() => {
            handleNavigation(pages.admin.manageFees);
          }}
          title={MANAGE_FEES}
        />

        <OptionButton
          onClick={() => {
            handleNavigation(pages.admin.manageClasses);
          }}
          title={MANAGE_PERSONAL}
        />
      </div>
      <FullScreenLoader show={students.loading} />
    </div>
  );
};

export default Dashboard;

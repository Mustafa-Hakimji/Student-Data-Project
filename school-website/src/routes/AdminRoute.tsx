import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/AdminPages/Dashboard";
import ManageStudents from "../pages/AdminPages/Students";
import { pages } from "../utils/constants/navigation";
import ViewAndEditStudents from "../pages/AdminPages/Students/screens/ViewAndEditStudents";
import AddStudent from "../pages/AdminPages/Students/screens/AddStudents";
import DeleteStudent from "../pages/AdminPages/Students/screens/DeleteStudent";
import UpdateStudent from "../pages/AdminPages/Students/screens/UpdateStudent";
import PromoteStudents from "../pages/AdminPages/Students/screens/PromoteStudent";
import AttenceScreen from "../pages/AdminPages/Attendence";
import ClassesScreen from "../pages/AdminPages/Classes";
import TakeAttendence from "../pages/AdminPages/Attendence/screens/Take";
import ViewAttendence from "../pages/AdminPages/Attendence/screens/View";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path={pages.admin.manageStudents} element={<ManageStudents />} />
      <Route path={pages.admin.addStudent} element={<AddStudent />} />
      <Route
        path={pages.admin.viewEditStudent}
        element={<ViewAndEditStudents />}
      />
      <Route path={pages.admin.deleteStudent} element={<DeleteStudent />} />
      <Route path={pages.admin.updateStudent} element={<UpdateStudent />} />
      <Route path={pages.admin.promoteStudents} element={<PromoteStudents />} />
      <Route path={pages.admin.manageAttendence} element={<AttenceScreen />} />
      <Route path={pages.admin.manageClasses} element={<ClassesScreen />} />
      <Route path={pages.admin.takeAttendence} element={<TakeAttendence />} />
      <Route path={pages.admin.viewAttendence} element={<ViewAttendence />} />
    </Routes>
  );
};

export default AdminRoutes;

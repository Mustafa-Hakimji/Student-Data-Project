import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/AdminPages/Dashboard";
import ManageStudents from "../pages/AdminPages/Students";
import { pages } from "../utils/constants/navigation";
import ViewAndEditStudents from "../pages/AdminPages/Students/screens/ViewAndEdit";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path={pages.admin.manageStudents} element={<ManageStudents />} />
      <Route
        path={pages.admin.viewEditStudent}
        element={<ViewAndEditStudents />}
      />
    </Routes>
  );
};

export default AdminRoutes;

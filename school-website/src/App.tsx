import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./routes";
import { storageKeys } from "./utils/constants/localStorage";
import { useAppDispatch, useAppSelector } from "./provider/hooks";
import {
  getStudentsRequest,
  setLocalStudent,
} from "./provider/slices/studentSlice";
import {
  getClassesRequest,
  setLocalClasses,
} from "./provider/slices/classesSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.isLoggedIn);

  const getStudentsAndClassData = () => {
    const localStudentData = localStorage.getItem(storageKeys.students);
    const studentsData = JSON.parse(localStudentData || "[]");
    const localClassData = localStorage.getItem(storageKeys.classes);
    const classesData = JSON.parse(localClassData || "[]");

    if (studentsData.length <= 0) {
      dispatch(getStudentsRequest());
    } else {
      dispatch(setLocalStudent(studentsData));
    }

    if (classesData.length <= 0) {
      dispatch(getClassesRequest());
    } else {
      dispatch(setLocalClasses(classesData));
    }
  };

  useEffect(() => {
    if (isLogin) {
      getStudentsAndClassData();
    }
  }, [isLogin]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Error from "./Components/404Error";
import ClassList from "./Components/Students/ClassList";
import AddStudent from "./Components/Students/AddStudent";
import DisplayStudents from "./Components/Students/DisplayStudents";
import DisplayTeachers from "./Components/Teachers/DisplayTeachers";
import ContextProvider, { useContextHook } from "./Providers/ContextProvider";
import DeleteStudent from "./Components/Students/DeleteStudent";
import StudentDetail from "./Components/Students/StudentDetail";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" handle element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error />} />

          <Route path="/class-list" element={<ClassList />} />
          <Route path="/student-list/:standard" element={<DisplayStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/delete-student" element={<DeleteStudent />} />

          <Route path="/delete-detail" element={<StudentDetail />} />

          <Route path="/teachers" element={<DisplayTeachers />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;

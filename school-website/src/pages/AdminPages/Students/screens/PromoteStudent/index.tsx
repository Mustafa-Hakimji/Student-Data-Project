import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../provider/hooks";
import ClassesDropdown from "../../../../../components/ClassesDropdown";
import "./styles.css";
import transferImage from "../../../../../assets/images/transfer-1.png";
import StudentListTable from "../../components/StudentListTable";
import { api } from "../../../../../utils/api/apiInstanse";
import { API_STATUS } from "../../../../../utils/api/apiConstants";
import { API_URL } from "../../../../../utils/api/apiUrls";
import { showToast } from "../../../../../utils/customFunctions/toast";
import { getStudentsRequest } from "../../../../../provider/slices/studentSlice";
import FullScreenLoader from "../../../../../components/Loader";

const PromoteStudents = () => {
  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.classes.classes);
  const students = useAppSelector((state) => state.students.students);

  const [fromClass, setFromClass] = useState("");
  const [toClass, setToClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const updateSelectedStudents = (adhaar: string) => {
    if (selectedStudents.includes(adhaar)) {
      setSelectedStudents((prev) => prev.filter((item) => item !== adhaar));
      return;
    }

    setSelectedStudents((prev) => [...prev, adhaar]);
  };

  const selectAllStudent = () => {
    const allStudent = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if (student.class === fromClass) {
        allStudent.push(student.adhaar);
      }
    }
    setSelectedStudents(allStudent);
  };

  const promoteStudents = async () => {
    // API call to promote students
    try {
      if (!fromClass || !toClass) {
        showToast({ text: "Please select both from and to class." });
        return;
      }

      if (fromClass === toClass) {
        showToast({ text: "From and To class cannot be the same." });
        return;
      }

      if (selectedStudents.length <= 0) {
        showToast({ text: "Please select students to promote." });
        return;
      }

      setLoading(true);
      const response = await api.post(API_URL.promoteStudent, {
        newClassId: toClass,
        adhaar: selectedStudents,
      });
      console.log("Promote students response --> ", response);
      if (response.status === 200) {
        showToast({ text: "Students promoted successfully" });
        dispatch(getStudentsRequest());
        setSelectedStudents([]);
      }
    } catch (error) {
      console.log("Promote students error --> ", error);
      showToast({ text: "Error promoting students. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-2">Promote Student's to next class.</h1>
      <h3 className="m-4">
        Please select the class from which you want to promote students
      </h3>
      <div className="classes-select-container p-4">
        <div className="dropdown-container">
          <ClassesDropdown
            classes={classes}
            setSelectedClass={setFromClass}
            selectedClass={fromClass}
            title="From Class"
            updateAction={() => setSelectedStudents([])}
          />
        </div>

        <div>
          <img className="transfer-image" src={transferImage} alt="Transfer" />
        </div>

        <div className="dropdown-container">
          <ClassesDropdown
            classes={classes}
            setSelectedClass={setToClass}
            selectedClass={toClass}
            title={"To Class"}
          />
        </div>
      </div>
      {fromClass && (
        <div>
          <div className="d-flex justify-content-between align-items-center mx-4">
            <button
              className="btn btn-primary mx-4 mb-2"
              onClick={selectAllStudent}
            >
              Selecte All
            </button>

            <button
              className="btn btn-outline-success mx-4 mb-2"
              onClick={promoteStudents}
            >
              Promote {selectedStudents.length} Students
            </button>
          </div>
          <StudentListTable
            data={students.filter((student) => student.class === fromClass)}
            classes={classes}
            selectedStudents={selectedStudents}
            updateSelectedStudent={updateSelectedStudents}
          />
        </div>
      )}
      <FullScreenLoader show={loading} />
    </div>
  );
};

export default PromoteStudents;

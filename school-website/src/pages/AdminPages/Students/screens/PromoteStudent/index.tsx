import { useState } from "react";
import { useAppSelector } from "../../../../../provider/hooks";
import ClassesDropdown from "../../../../../components/ClassesDropdown";
import "./styles.css";
import transferImage from "../../../../../assets/images/transfer-1.png";
import StudentListTable from "../../components/StudentListTable";

const PromoteStudents = () => {
  const classes = useAppSelector((state) => state.classes.classes);
  const students = useAppSelector((state) => state.students.students);

  const [fromClass, setFromClass] = useState("");
  const [toClass, setToClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const updateSelectedStudents = (adhaar: string) => {
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

  console.log({ fromClass });

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
          <button
            className="btn btn-primary mx-4 mb-2"
            onClick={selectAllStudent}
          >
            Selecte All
          </button>
          <StudentListTable
            data={students.filter((student) => student.class === fromClass)}
            classes={classes}
            selectedStudents={selectedStudents}
            updateSelectedStudent={updateSelectedStudents}
          />
        </div>
      )}
    </div>
  );
};

export default PromoteStudents;

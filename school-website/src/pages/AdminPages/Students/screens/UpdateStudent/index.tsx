import ViewAndEditStudents from "../ViewAndEditStudents";
import { ActionsTypes } from "../../types";
import { useState } from "react";
import UpdateForm from "./components/updateForm";
import { useAppSelector } from "../../../../../provider/hooks";
import FullScreenLoader from "../../../../../components/Loader";
import { showToast } from "../../../../../utils/customFunctions/toast";

const UpdateStudent = () => {
  const students = useAppSelector((state) => state.students.students);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateSelectedStudent = (adhaar: string) => {
    setSelectedStudents([adhaar]);
  };

  const handleButtonClick = () => {
    if (selectedStudents.length <= 0) {
      showToast({ text: "Please select student to update." });
      return;
    }
    setShowUpdateForm(true);
  };

  const getSelectedStudent = () => {
    const filteredData = students.filter(
      (student) => student.adhaar === selectedStudents[0]
    );
    return filteredData[0];
  };

  const removeSelected = () => {
    setSelectedStudents([]);
  };

  return (
    <>
      <ViewAndEditStudents
        actionType={ActionsTypes.update}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
        updateSelectedStudent={updateSelectedStudent}
        handleButtonClick={handleButtonClick}
      />
      {showUpdateForm && (
        <UpdateForm
          onClose={() => setShowUpdateForm(false)}
          studentData={getSelectedStudent}
          loading={loading}
          setLoading={setLoading}
          clearSelectedStudent={removeSelected}
        />
      )}
      {loading && <FullScreenLoader show={loading} />}
    </>
  );
};

export default UpdateStudent;

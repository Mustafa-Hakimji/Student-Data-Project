import ViewAndEditStudents from "../ViewAndEditStudents";
import { ActionsTypes } from "../../types";
import { useState } from "react";

const UpdateStudent = () => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  return (
    <ViewAndEditStudents
      actionType={ActionsTypes.update}
      selectedStudents={selectedStudents}
      setSelectedStudents={setSelectedStudents}
    />
  );
};

export default UpdateStudent;

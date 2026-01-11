import { useState } from "react";
import { ActionsTypes } from "../../types";
import ViewAndEditStudents from "../ViewAndEditStudents";
import { API_URL } from "../../../../../utils/api/apiUrls";
import { api } from "../../../../../utils/api/apiInstanse";
import { showToast } from "../../../../../utils/customFunctions/toast";
import { useAppDispatch } from "../../../../../provider/hooks";
import { getStudentsRequest } from "../../../../../provider/slices/studentSlice";

const DeleteStudent = () => {
  const dispatch = useAppDispatch();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const updateSelectedStuidents = (item: string) => {
    if (selectedStudents.includes(item)) {
      setSelectedStudents(selectedStudents.filter((adhaar) => adhaar !== item));
    } else {
      setSelectedStudents((prev) => [...prev, item]);
    }
  };

  const handleDeleteAcion = async () => {
    try {
      const data = {
        adhaar: selectedStudents,
      };
      setLoading(true);
      const response = await api.delete(API_URL.students, {
        data,
      });
      if (response.data.status === "success") {
        showToast({ text: response.data.message });
        setSelectedStudents([]);
      }
      dispatch(getStudentsRequest());
    } catch (error) {
      console.log("ERROR handleDeleteAcion --> ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    if (selectedStudents.length <= 0) {
      showToast({ text: "Please select students to delete." });
      return;
    } else {
      handleDeleteAcion();
    }
  };
  return (
    <ViewAndEditStudents
      actionType={ActionsTypes.delete}
      selectedStudents={selectedStudents}
      setSelectedStudents={setSelectedStudents}
      updateSelectedStudent={updateSelectedStuidents}
      handleButtonClick={handleDeleteClick}
      loading={loading}
    />
  );
};

export default DeleteStudent;

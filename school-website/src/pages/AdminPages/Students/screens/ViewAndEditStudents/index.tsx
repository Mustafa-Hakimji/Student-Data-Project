import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../../../../provider/hooks";
import { useState, type ChangeEvent } from "react";
import {
  filterOptions,
  type SelectedFilterType,
  type StudentFilterType,
} from "./types";
import { showToast } from "../../../../../utils/customFunctions/toast";
import { api } from "../../../../../utils/api/apiInstanse";
import { API_URL } from "../../../../../utils/api/apiUrls";
import { getStudentsRequest } from "../../../../../provider/slices/studentSlice";
import FullScreenLoader from "../../../../../components/Loader";
import StudentListTable from "../../components/StudentListTable";

const ViewAndEditStudents = ({ isDelete = false }) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.students);
  const { classes } = useAppSelector((state) => state.classes);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<StudentFilterType | any>({
    standard: "",
    firstName: "",
    lastName: "",
    roll: "",
    adhaar: "",
    father: "",
    mother: "",
    sssm: "",
    pendingFees: "",
  });

  const updateSelectedStuidents = (item: string) => {
    if (selectedStudents.includes(item)) {
      setSelectedStudents(selectedStudents.filter((adhaar) => adhaar !== item));
    } else {
      setSelectedStudents((prev) => [...prev, item]);
    }
  };

  const updateFilterValue = (val: string, key: string) => {
    const newData = { ...filters, [key]: val };
    setFilters(newData);
  };
  const [seletedFilter, setSelectedFilter] = useState<SelectedFilterType>({
    value: "",
    title: "",
  });

  const handleFilterSerach = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFilters((prev: any) => {
      return {
        ...prev,
        [seletedFilter?.title]: e.target.value,
      };
    });
  };

  const filteredData = () => {
    const {
      standard,
      firstName,
      lastName,
      roll,
      adhaar,
      father,
      mother,
      sssm,
      pendingFees,
    } = filters;

    let finalData = [...students];

    if (standard) {
      finalData = students?.filter((item) =>
        item?.class?.toLowerCase()?.includes(standard?.toLowerCase())
      );
    }

    if (firstName) {
      finalData = students?.filter((item) =>
        item?.firstName?.toLowerCase()?.includes(firstName?.toLowerCase())
      );
    }
    if (lastName) {
      finalData = students?.filter((item) =>
        item?.lastName?.toLowerCase()?.includes(lastName?.toLowerCase())
      );
    }
    if (roll) {
      finalData = students?.filter((item) =>
        item?.rollNumber?.toString()?.includes(roll)
      );
    }
    if (adhaar) {
      finalData = students?.filter((item) =>
        item?.adhaar?.toString()?.includes(adhaar)
      );
    }
    if (father) {
      finalData = students?.filter((item) =>
        item?.fathersName?.toLowerCase()?.includes(father?.toLowerCase())
      );
    }
    if (mother) {
      finalData = students?.filter((item) =>
        item?.mothersName?.toLowerCase()?.includes(mother?.toLowerCase())
      );
    }
    if (sssm) {
      finalData = students?.filter((item) =>
        item?.sssm?.toString()?.includes(Number(sssm))
      );
    }
    if (pendingFees) {
      finalData = students?.filter((item) =>
        item?.pendingFees?.toString()?.includes(Number(pendingFees))
      );
    }

    return finalData;
  };

  const selectedFilter = `${
    seletedFilter?.title ? filters[seletedFilter?.title] : ""
  }`;

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
    <div className="view-contaiuner">
      <div className="input-group mb-3 search-dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {seletedFilter?.value || "Please select"}
        </button>
        <ul className="dropdown-menu">
          {filterOptions.map((item, index) => {
            return (
              <li
                key={item.title}
                className="dropdown-item"
                onClick={() => {
                  setSelectedFilter(filterOptions[index]);
                }}
              >
                {item?.value}
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          onChange={(e) => handleFilterSerach(e)}
          value={selectedFilter}
        />
      </div>
      <div className="delete-multiple">
        <h4 className="">Results: {filteredData().length}</h4>
        {isDelete && (
          <button
            className="btn btn-outline-danger"
            onClick={handleDeleteClick}
          >
            Delete{` ${selectedStudents?.length} students`}
          </button>
        )}
      </div>
      <StudentListTable
        data={filteredData()}
        classes={classes}
        setFilters={updateFilterValue}
        selectedStudents={selectedStudents}
        setSelectedStudents={updateSelectedStuidents}
      />

      <FullScreenLoader show={loading} />
    </div>
  );
};

export default ViewAndEditStudents;

import "./styles.css";
import { useAppSelector } from "../../../../../provider/hooks";
import { useState, type ChangeEvent } from "react";
import {
  filterOptions,
  type SelectedFilterType,
  type StudentFilterType,
} from "./types";
import FullScreenLoader from "../../../../../components/Loader";
import StudentListTable from "../../components/StudentListTable";
import ActionWiseButton from "./components/actionWiseButton";
import type { StudentTableProps } from "../../types";

const ViewAndEditStudents = ({
  actionType,
  selectedStudents,
  updateSelectedStudent = () => {},
  handleButtonClick = () => {},
  loading,
}: StudentTableProps) => {
  const students = useAppSelector((state) => state.students.students);
  const { classes } = useAppSelector((state) => state.classes);

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
        <ActionWiseButton
          actionType={actionType}
          handleClick={handleButtonClick}
          selectedStudents={selectedStudents}
        />
      </div>
      <StudentListTable
        data={filteredData()}
        classes={classes}
        setFilters={updateFilterValue}
        selectedStudents={selectedStudents}
        updateSelectedStudent={updateSelectedStudent}
      />

      {loading && <FullScreenLoader show={loading} />}
    </div>
  );
};

export default ViewAndEditStudents;

import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../../../../provider/hooks";
import { getClassById } from "../../../../../utils/customFunctions/commonFunctions";
import { useState } from "react";
import {
  filterOptions,
  type SelectedFilterType,
  type StudentFilterType,
} from "./types";
import Modal from "../../../../../components/Modal";
import ConfirmAlert from "../../../../../components/AlertMessage";
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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<StudentFilterType>({
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

  const handleFilterSerach = (e: any) => {
    e.preventDefault();

    setFilters((prev) => {
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

  const handleSelect = (item: string) => {
    if (selectedStudents.includes(item)) {
      setSelectedStudents(selectedStudents.filter((adhaar) => adhaar !== item));
    } else {
      setSelectedStudents((prev) => [...prev, item]);
    }
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
      setShowDeleteAlert(false);
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    if (selectedStudents.length <= 0) {
      showToast({ text: "Please select students to delete." });
      return;
    }

    setShowDeleteAlert(true);
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
      />
      {/* <table className="table table-light table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Class
                </button>
                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    onClick={() => {
                      setFilters((prev) => {
                        return {
                          ...prev,
                          standard: "",
                        };
                      });
                    }}
                  >
                    All
                  </li>
                  {classes.map((item, index) => {
                    return (
                      <li
                        className="dropdown-item"
                        key={index}
                        onClick={() => {
                          setFilters((prev) => {
                            return {
                              ...prev,
                              standard: item?._id?.toLowerCase(),
                            };
                          });
                        }}
                      >
                        {item?.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </th>
            <th scope="col">Roll No.</th>
            <th scope="col">Adhaar</th>
            <th scope="col">SSSM</th>
            <th scope="col">Mother</th>
            <th scope="col">Father</th>
            <th scope="col">Father Phone</th>
            <th scope="col">Pending Fees</th>
          </tr>
        </thead>

        <tbody>
          {filteredData()?.length > 0 &&
            filteredData()?.map((item, index) => {
              return (
                <tr onClick={() => handleSelect(item?.adhaar)} key={index}>
                  <td>
                    {index + 1}{" "}
                    {selectedStudents.includes(item?.adhaar) ? "✅" : ""}
                  </td>
                  <td>{item?.firstName}</td>
                  <td>{item?.lastName}</td>
                  <td>{getClassById(item?.class, classes)?.name}</td>
                  <td>{item?.rollNumber}</td>
                  <td>{item?.adhaar}</td>
                  <td>{item?.sssm}</td>
                  <td>{item?.mothersName}</td>
                  <td>{item?.fathersName}</td>
                  <td>{item?.mobileNumberFather}</td>
                  <td>{item?.pendingFees}</td>
                </tr>
              );
            })}
        </tbody>
      </table> */}
      {filteredData().length <= 0 && (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <h3>No data found.</h3>
        </div>
      )}

      {showDeleteAlert && (
        <Modal open={showDeleteAlert} setOpen={setShowDeleteAlert}>
          <ConfirmAlert
            message="Are you sure you want to delete students?"
            title="Delete Alert"
            onCancel={() => {
              setShowDeleteAlert(false);
            }}
            onConfirm={handleDeleteAcion}
          />
        </Modal>
      )}
      <FullScreenLoader show={loading} />
    </div>
  );
};

export default ViewAndEditStudents;

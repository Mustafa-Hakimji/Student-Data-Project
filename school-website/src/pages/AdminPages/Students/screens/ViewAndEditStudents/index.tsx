import "./styles.css";
import { useAppSelector } from "../../../../../provider/hooks";
import { getClassById } from "../../../../../utils/customFunctions/commonFunctions";
import { useState } from "react";
import { filterOptions } from "./types";
const ViewAndEditStudents = () => {
  const students = useAppSelector((state) => state.students.students);
  const { classes } = useAppSelector((state) => state.classes);

  const [filters, setFilters] = useState({
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
  const [seletedFilter, setSelectedFilter] = useState({ value: "", title: "" });

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
          value={`${filters[seletedFilter?.title] || ""}`}
        />
      </div>
      <table className="table table-dark table-hover">
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
                <tr key={index}>
                  <td>{index + 1}</td>
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
      </table>
      {filteredData().length <= 0 && (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <h3>No data found as per your search.</h3>
        </div>
      )}
    </div>
  );
};

export default ViewAndEditStudents;

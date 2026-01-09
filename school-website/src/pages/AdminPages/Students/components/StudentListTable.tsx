import type { StudentType, StudentTableProps } from "../types";
import { getClassById } from "../../../../utils/customFunctions/commonFunctions";

const StudentListTable = ({
  data,
  setFilters,
  classes,
  selectedStudents,
  setSelectedStudents,
}: StudentTableProps) => {
  return (
    <table className="table table-light table-hover">
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
                    setFilters("", "standard");
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
                        setFilters(item?._id?.toLowerCase(), "standard");
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
        {data?.length > 0 &&
          data?.map((item: StudentType, index) => {
            return (
              <tr onClick={() => setSelectedStudents(item?.adhaar)} key={index}>
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
    </table>
  );
};

export default StudentListTable;

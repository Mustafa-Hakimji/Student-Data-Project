import "./styles.css";
import { useAppSelector } from "../../../../../provider/hooks";
import { getClassById } from "../../../../../utils/customFunctions/commonFunctions";
const ViewAndEditStudents = () => {
  const students = useAppSelector((state) => state.students.students);
  const { classes } = useAppSelector((state) => state.classes);

  return (
    <div className="view-contaiuner">
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
                  {classes.map((item) => {
                    return (
                      <li>
                        <a className="dropdown-item" href="#">
                          {item?.name}
                        </a>
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
          {students?.map((item, index) => {
            return (
              <tr>
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
    </div>
  );
};

export default ViewAndEditStudents;

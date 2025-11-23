import React from "react";
import "./styles.css";
import { useAppSelector } from "../../../../../provider/hooks";
const ViewAndEditStudents = () => {
  const students = useAppSelector((state) => state.students.students);

  console.log({ students });
  return (
    <div className="view-contaiuner">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Class</th>
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
                <td>{item?.class}</td>
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

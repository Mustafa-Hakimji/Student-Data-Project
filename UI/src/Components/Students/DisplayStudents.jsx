import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useContextHook } from "../../Providers/ContextProvider";

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { standard } = useParams();
  const { searchText, setIsSearch, isLogin } = useContextHook();
  const navigate = useNavigate();

  const getStudents = async (section) => {
    setIsSearch(true);
    try {
      const res = await fetch("http://localhost:4000/get-all-students");
      const data = await res.json();

      if (data.status === 200) {
        if (section === "all") {
          setStudents(data.data);
          setLoading(false);
          return;
        }
        const filteredStudents = data.data.filter(
          (item) => item.section === section
        );
        setStudents(filteredStudents);
        setLoading(false);
      } else {
        setStudents(undefined);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error white getting Students --> ", error);
      setLoading(false);
    }
  };

  console.log("Display students --> ", isLogin);

  useEffect(() => {
    getStudents(standard);
    return () => setIsSearch(false);
  }, []);

  if (!isLogin) {
    navigate("/login");
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: 20, margin: 20 }}>
      {students.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Father</th>
              <th scope="col">Mother</th>
              <th scope="col">Contact</th>
              <th scope="col">Adhaar</th>
              <th scope="col">SSSM ID</th>
              <th scope="col">Bank</th>
              <th scope="col">IFSC</th>
            </tr>
          </thead>
          {students.map((item, index) => {
            // console.log("MAP LOOP--> ", item.name);
            if (!searchText) {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {item.name} {item.surname}
                    </td>
                    <td>{item.section}</td>
                    <td>{item.father}</td>
                    <td>{item.mother}</td>
                    <td>{item.phone}</td>
                    <td>{item.adhaar}</td>
                    <td>{item.sssm}</td>
                    <td>{item.bank}</td>
                    <td>{item.ifsc}</td>
                  </tr>
                </tbody>
              );
            } else if (
              item.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {item.name} {item.surname}
                    </td>
                    <td>{item.section}</td>
                    <td>{item.father}</td>
                    <td>{item.mother}</td>
                    <td>{item.phone}</td>
                    <td>{item.adhaar}</td>
                    <td>{item.sssm}</td>
                    <td>{item.bank}</td>
                    <td>{item.ifsc}</td>
                  </tr>
                </tbody>
              );
            }
          })}
        </table>
      ) : (
        <h1>No Student in class {standard} registered.</h1>
      )}
    </div>
  );
};

export default DisplayStudents;

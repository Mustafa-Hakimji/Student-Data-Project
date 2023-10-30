import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  // const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    surname: "",
    section: "",
    father: "",
    mother: "",
    adhaar: "",
    phone: "",
    sssm: "",
    bank: "",
    ifsc: "",
  });

  let name, value;

  const handleInput = (event) => {
    name = event.target.name;
    value = event.target.value;

    setStudent({ ...student, [name]: value });
  };

  const PostData = async (event) => {
    event.preventDefault();
    const {
      name,
      surname,
      section,
      father,
      mother,
      adhaar,
      phone,
      sssm,
      bank,
      ifsc,
    } = student;

    if (
      !name ||
      !surname ||
      !section ||
      !father ||
      !mother ||
      !adhaar ||
      !phone ||
      !sssm ||
      !bank ||
      !ifsc
    ) {
      alert("All fields required !!");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/add-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          section,
          father,
          mother,
          adhaar,
          phone,
          sssm,
          bank,
          ifsc,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        window.alert("User already exist!!");
        console.log("Student already exist!!");
      } else {
        window.alert("Student Added successfully.");
        console.log("Student Added successfully.");
        setStudent({
          name: "",
          surname: "",
          section: "",
          father: "",
          mother: "",
          adhaar: "",
          phone: "",
          sssm: "",
          bank: "",
          ifsc: "",
        });
        //   navigate("/login");
      }
    } catch (error) {
      console.log("Error adding student--> ", error);
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Add New Teacher</h2>
              <form method="POST" className="register-form" id="register-from">
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    <i className="zmdi zmdi-account "></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={student.name}
                    onChange={handleInput}
                    placeholder="Enter Name"
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="surname">
                    <i className="zmdi zmdi-account "></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="surname"
                    id="surname"
                    autoComplete="off"
                    value={student.surname}
                    onChange={handleInput}
                    placeholder="Enter Surname"
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="section">
                    <i className="zmdi zmdi-font "></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="section"
                    id="section"
                    autoComplete="off"
                    value={student.section}
                    onChange={handleInput}
                    placeholder="Enter Class"
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="father">
                    <i className="zmdi zmdi-account "></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="father"
                    id="father"
                    autoComplete="off"
                    value={student.father}
                    onChange={handleInput}
                    placeholder="Enter Father name "
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="mother">
                    <i className="zmdi zmdi-account "></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="mother"
                    id="mother"
                    autoComplete="off"
                    value={student.mother}
                    onChange={handleInput}
                    placeholder="Enter Mother name"
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="adhaar">
                    <i className="zmdi zmdi-card"></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="adhaar"
                    id="adhaar"
                    autoComplete="off"
                    value={student.adhaar}
                    onChange={handleInput}
                    placeholder="Enter Adhaar number"
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="phone">
                    <i className="zmdi zmdi-phone "></i>
                  </label>
                  <input
                    className="input-data"
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={student.phone}
                    onChange={handleInput}
                    placeholder="Enter Contact number"
                  />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="sssm">
                    <i className="zmdi zmdi-key "></i>
                  </label>
                  <input
                    className="input-data"
                    type="number"
                    name="sssm"
                    id="sssm"
                    autoComplete="off"
                    value={student.sssm}
                    onChange={handleInput}
                    placeholder="Enter SSSM Id"
                  />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="bank">
                    <i className="zmdi zmdi-lock "></i>
                  </label>
                  <input
                    className="input-data"
                    type="password"
                    name="bank"
                    id="bank"
                    autoComplete="off"
                    value={student.bank}
                    onChange={handleInput}
                    placeholder="Enter Bank Account number"
                  />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="ifsc">
                    <i className="zmdi zmdi-key "></i>
                  </label>
                  <input
                    className="input-data"
                    type="text"
                    name="ifsc"
                    id="ifsc"
                    autoComplete="off"
                    value={student.ifsc}
                    onChange={handleInput}
                    placeholder="Enter IFSC code"
                  />
                </div>
                <div className="form-group">
                  <input
                    className=" form-submit"
                    type="submit"
                    name="signup"
                    id="signup"
                    value={"Register"}
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>

            {/* <div className="signup-image">
              <figure>
                <img
                  src={signupPic}
                  height={"300px"}
                  width={"300px"}
                  alt="registrationPic"
                />
              </figure>
              <Link to="/login" className="signup-page-link ">
                Already registered ? / (Login)
              </Link>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddStudent;

import React, { useState, useEffect } from "react";
import loginPic from "../images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:4000/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("User Login Successfully");
      console.log("User Login Successfully");
      navigate("/");
    }
  };

  return (
    <>
      <section className="login">
        <div className="container mt-5">
          <div className="login-content">
            <div className="login-form">
              <h2 className="form-title">Login</h2>
              <hr />
              <form method="POST" className="register-form" id="register-from">
                <div className="form-group">
                  <label className="label" htmlFor="email">
                    <i className="zmdi zmdi-email "></i>
                  </label>
                  <input
                    className="input-data"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="password">
                    <i className="zmdi zmdi-key "></i>
                  </label>
                  <input
                    className="input-data"
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    placeholder="Enter Your Password"
                  />
                </div>

                <div className="form-group">
                  <input
                    className=" form-submit"
                    type="submit"
                    name="login"
                    id="login"
                    value={"Log In"}
                    onClick={loginUser}
                  />
                </div>
              </form>
              <div className="login-images">
                <figure>
                  <img
                    src={loginPic}
                    height={"200px"}
                    width={"200px"}
                    alt="registrationPic"
                  />
                </figure>
                <Link to="/signup" className="signup-page-link ">
                  Create an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

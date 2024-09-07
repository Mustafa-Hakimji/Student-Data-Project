import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextHook } from "../Providers/ContextProvider";

const Navbar = () => {
  const {
    isSearch,
    setSearchText,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
  } = useContextHook();

  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("login", JSON.stringify(false));
    const loginStatus = localStorage.getItem("login");
    const formattedLoginStatus = JSON.parse(loginStatus);
    setIsLogin(formattedLoginStatus);

    localStorage.setItem("user", JSON.stringify({}));
    const user = localStorage.getItem("user");
    const formattedUser = JSON.parse(user);
    setUserData(formattedUser);

    navigation("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="navbar-brand" href="#">
          SCHOOL NAME
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link to={"/"} className="nav-link">
            Home <span className="sr-only">(current)</span>
          </Link>

          <ul className="navbar-nav ml-auto">
            {isSearch && (
              <li className="nav-item">
                <input
                  className="form-control mr-sm-2 col-sm"
                  type="Searh by name"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </li>
            )}
            <li className="nav-item">
              <Link
                to={isLogin ? "/about" : "/login"}
                className="nav-link"
                href="#"
              >
                About
              </Link>
            </li>

            {userData?.designation === "Admin" && (
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link" href="#">
                  Register
                </Link>
              </li>
            )}

            {isLogin && (
              <li className="nav-item">
                <Link
                  onClick={() => {
                    handleLogout();
                  }}
                  className="nav-link"
                >
                  Logout
                </Link>
              </li>
            )}

            {!isLogin && (
              <li className="nav-item">
                <Link
                  onClick={() => {
                    handleLogout();
                  }}
                  to={"/login"}
                  className="nav-link"
                  href="#"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

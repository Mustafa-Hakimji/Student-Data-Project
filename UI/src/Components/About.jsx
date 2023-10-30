import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="" alt="mustafa" />
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>Mustafa Hakimji.</h5>
                <h5>Student.</h5>
                <p className="profile-rating mt-3 mb-5">
                  Technology: <span>REACT & NODE</span>{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* left side  */}

            <div className="col-md-4">
              <div className="profile-working">
                <p>Details.</p>
                <br />
              </div>
            </div>

            {/* right side toggle */}

            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab">
                <div
                  className="tab-pane fader show active"
                  id="home"
                  role="tabpanel"
                  area-aria-labelledby="home-tab"
                >
                  <div className="row">
                    <p>
                      <a
                        className="btn btn-primary"
                        data-toggle="collapse"
                        href="#multiCollapseExample1"
                        role="button"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1"
                      >
                        About Us.
                      </a>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-toggle="collapse"
                        data-target="#multiCollapseExample2"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample2"
                      >
                        Contact Us.
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-toggle="collapse"
                        data-target=".multi-collapse"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1 multiCollapseExample2"
                      >
                        Both Together.
                      </button>
                    </p>
                    <div className="row">
                      <div className="col">
                        <div
                          className="collapse multi-collapse"
                          id="multiCollapseExample1"
                        >
                          <div className="card card-body">
                            This project is a dummy project. Where a user can
                            register himself and then can login with the
                            registered email and password. If the login is
                            successfull then he will be routed to the home page
                            automatically.
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className="collapse multi-collapse"
                          id="multiCollapseExample2"
                        >
                          <div className="card card-body">8305240890</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;

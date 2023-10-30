import React from "react";
import { Link } from "react-router-dom";

const ClassList = () => {
  return (
    <>
      <div className="container text-center my-5">
        <h3>Please select Class for which you want to view Students detail.</h3>
      </div>
      <div>
        <Link to={`/student-list/nursary`}>
          <button type="button" className="btn btn-outline-primary">
            Nursary
          </button>
        </Link>

        <Link to={`/student-list/lkg`}>
          <button type="button" className="btn btn-outline-primary">
            L.K.G.
          </button>
        </Link>

        <Link to={`/student-list/ukg`}>
          <button type="button" className="btn btn-outline-primary">
            U.K.G.
          </button>
        </Link>

        <Link to={`/student-list/1`}>
          <button type="button" className="btn btn-outline-primary">
            Class 1{" "}
          </button>
        </Link>

        <Link to={`/student-list/2`}>
          <button type="button" className="btn btn-outline-primary">
            Class 2
          </button>
        </Link>

        <Link to={`/student-list/3`}>
          <button type="button" className="btn btn-outline-primary">
            Class 3
          </button>
        </Link>

        <Link to={`/student-list/4`}>
          <button type="button" className="btn btn-outline-primary">
            Class 4
          </button>
        </Link>

        <Link to={`/student-list/5`}>
          <button type="button" className="btn btn-outline-primary">
            Class 5
          </button>
        </Link>
      </div>

      <div className="my-5">
        <Link to={`/student-list/6`}>
          <button type="button" className="btn btn-outline-primary">
            Class 6{" "}
          </button>
        </Link>

        <Link to={`/student-list/7`}>
          <button type="button" className="btn btn-outline-primary">
            Class 7
          </button>
        </Link>

        <Link to={`/student-list/8`}>
          <button type="button" className="btn btn-outline-primary">
            Class 8
          </button>
        </Link>

        <Link to={`/student-list/9`}>
          <button type="button" className="btn btn-outline-primary">
            Class 9
          </button>
        </Link>

        <Link to={`/student-list/10`}>
          <button type="button" className="btn btn-outline-primary">
            Class 10
          </button>
        </Link>
      </div>

      <div className="my-5">
        <Link to={`/student-list/11`}>
          <button type="button" className="btn btn-outline-primary">
            Class 11{" "}
          </button>
        </Link>

        <Link to={`/student-list/12`}>
          <button type="button" className="btn btn-outline-primary">
            Class 12
          </button>
        </Link>
      </div>

      <div className="my-5">
        <Link to={`/student-list/all`}>
          <button type="button" className="btn btn-outline-primary">
            All
          </button>
        </Link>
      </div>
    </>
  );
};

export default ClassList;

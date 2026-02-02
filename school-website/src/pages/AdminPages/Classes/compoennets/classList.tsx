import React from "react";

const ClassList = ({ classes, openId, setOpenId }) => {
  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="container py-3">
      <div className="row g-4">
        {classes.map((cls) => (
          <div className="col-lg-4 col-md-6" key={cls._id}>
            <div
              className={`modern-card ${openId === cls._id ? "active" : ""}`}
            >
              {/* Header */}
              <div
                className="modern-card-header"
                onClick={() => toggle(cls._id)}
              >
                <div>
                  <h6 className="mb-0 fw-semibold">
                    {cls.name}
                    {cls.section && (
                      <span className="text-muted ms-1">({cls.section})</span>
                    )}
                  </h6>
                  <small className="text-muted">
                    {cls.subjects?.length || 0} Subjects
                  </small>
                </div>

                <div className="arrow">{openId === cls._id ? "−" : "+"}</div>
              </div>

              {/* Body */}
              <div
                className={`modern-collapse ${
                  openId === cls._id ? "show" : ""
                }`}
              >
                <div className="modern-card-body">
                  {cls.subjects?.length ? (
                    <div className="subject-chips">
                      {cls.subjects.map((sub, i) => (
                        <span className="subject-chip" key={i}>
                          {sub}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">No subjects assigned</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;

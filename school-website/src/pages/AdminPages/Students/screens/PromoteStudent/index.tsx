import React, { useState } from "react";

const PromoteStudents = () => {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div>
      <h1 className="text-center mt-2">Promote Student's to next class.</h1>
      <h3>Please select class</h3>
    </div>
  );
};

export default PromoteStudents;

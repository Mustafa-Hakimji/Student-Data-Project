import React from "react";
import type { ClassesType } from "../pages/AdminPages/Students/types";

interface ClassDropdownProps {
  classes: ClassesType[];
  setSelectedClass: (arg: string) => void;
  selectedClass: string;
  title: string;
}

const ClassesDropdown = ({
  classes,
  setSelectedClass,
  selectedClass,
  title,
}: ClassDropdownProps) => {
  return (
    <div className="input-group mb-3">
      <label className="input-group-text">{title}</label>
      <select
        className="form-select"
        id="inputGroupSelect01"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">Select Class</option>
        {classes?.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassesDropdown;

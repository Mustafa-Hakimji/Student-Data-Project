import type { ClassesType } from "../../pages/AdminPages/Students/types";
import ClassesDropdown from "../ClassesDropdown";
import DatePicker from "../DatePicker";

interface DateRangeSelectorProps {
  fromDate: string;
  toDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
  classes: ClassesType[];
  selectedClass: string;
  setSelectedClass: (arg: string) => void;
  title: string;
}

const DateRangeSelector = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  classes,
  selectedClass,
  setSelectedClass,
  title,
}: DateRangeSelectorProps) => {
  return (
    <div className="d-flex gap-3 align-items-end mx-4">
      <ClassesDropdown
        classes={classes}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        title={title}
      />
      <DatePicker
        title="From"
        value={fromDate}
        onChange={setFromDate}
        max={toDate || undefined}
      />

      <DatePicker
        title="To"
        value={toDate}
        onChange={setToDate}
        min={fromDate || undefined}
      />
    </div>
  );
};

export default DateRangeSelector;

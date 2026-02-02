import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../provider/hooks";
import DateRangeSelector from "../../../../../components/DateRangeSelector";
import type { StudentType } from "../../../Students/types";
import "./styles.css";
import { capitaliseFirst } from "../../../../../utils/customFunctions/commonFunctions";

const ViewAttendence = () => {
  const students = useAppSelector((state) => state.students.students);
  const classes = useAppSelector((state) => state.classes.classes);

  const [datesInRange, setDatesInRange] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const getDatesInRange = (start: string, end: string) => {
    const dates = [];
    let current = moment(start, "YYYY-MM-DD");
    const last = moment(end, "YYYY-MM-DD");

    while (current.isSameOrBefore(last)) {
      dates.push(current.format("YYYY-MM-DD"));
      current.add(1, "day");
    }

    return dates;
  };

  const normalizeAttendance = (attendance: any[] = []) => {
    const map: Record<string, string> = {};

    attendance.forEach((a) => {
      if (!a?.date) return;
      const dateOnly = a.date.split("|")[0]; // YYYY-MM-DD
      map[dateOnly] = a.status;
    });

    return map;
  };

  const buildAttendanceRow = (student: any, datesInRange: string[]) => {
    const attendanceMap = normalizeAttendance(student.attendance);

    return datesInRange.map((date) => ({
      date,
      status: attendanceMap[date] || "-",
    }));
  };

  useEffect(() => {
    if (fromDate && toDate) {
      setDatesInRange(getDatesInRange(fromDate, toDate));
    }
  }, [fromDate, toDate, selectedClass]);

  return (
    <div>
      <DateRangeSelector
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        classes={classes}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        title={"Select Class"}
      />
      <div className="attendance-table-wrapper">
        {fromDate && toDate && selectedClass && (
          <table className="table table-striped table-bordered attendance-table">
            <thead>
              <tr>
                <th>Student</th>
                {datesInRange.map((date) => (
                  <th key={date}>{moment(date).format("DD MMM")}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students
                .filter((stu: StudentType) => stu.class === selectedClass)
                .map((student) => {
                  const row = buildAttendanceRow(student, datesInRange);

                  return (
                    <tr key={student.adhaar}>
                      <td>{student.firstName}</td>
                      {row.map((cell) => {
                        const statusClass =
                          cell.status === "present"
                            ? "text-success fw-bold"
                            : cell.status === "absent"
                            ? "text-danger fw-bold"
                            : "text-muted";

                        return (
                          <td key={cell.date} className={statusClass}>
                            {capitaliseFirst(cell.status)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewAttendence;

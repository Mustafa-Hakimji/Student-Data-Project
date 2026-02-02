import { useEffect, useState } from "react";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../../provider/hooks";
import ClassesDropdown from "../../../../components/ClassesDropdown";
import CustomDropdown from "../../../../components/CustomDropdown";
import { api } from "../../../../utils/api/apiInstanse";
import { API_URL } from "../../../../utils/api/apiUrls";
import FullScreenLoader from "../../../../components/Loader";
import { showToast } from "../../../../utils/customFunctions/toast";
import { getStudentsRequest } from "../../../../provider/slices/studentSlice";
import DatePicker from "../../../../components/DatePicker";

const AttendenceTable = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.students);
  const classes = useAppSelector((state) => state.classes.classes);

  const [selectedClass, setSelectedClass] = useState("");
  const [studentsData, setStudentsData] = useState(students);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [localAttendanceData, setLocalAttendanceData] = useState<any>({});

  const showTableData = selectedClass && selectedDate;

  const getFormattedDate = () => {
    if (!selectedDate) return null;

    const mDate = moment(selectedDate, "YYYY-MM-DD");

    return {
      date: mDate.format("YYYY-MM-DD"),
      day: mDate.format("dddd"),
      month: mDate.format("MMMM"),
      display: mDate.format("DD MMM YYYY"),
    };
  };

  const markAbsentPresent = async (adhaar: string, status: string) => {
    const date = `${getFormattedDate()?.date}|${getFormattedDate()?.day}|${
      getFormattedDate()?.month
    }`;

    const isToday = moment().format("YYYY-MM-DD") === getFormattedDate()?.date;

    if (!isToday) {
      showToast({ text: "You can only mark attendence for today." });
      return;
    }

    const isSameAdhaar = localAttendanceData[adhaar];
    const isSameDtate = localAttendanceData[adhaar]?.date === date;
    const isSameStatus = localAttendanceData[adhaar]?.status === status;

    if (isSameAdhaar && isSameDtate && isSameStatus) {
      showToast({ text: `Student is already marked as ${status}` });
      return;
    }

    if (isSameAdhaar && isSameDtate) {
      setLocalAttendanceData((prevData: any) => ({
        ...prevData,
        [adhaar]: { ...prevData[adhaar], status },
      }));
      return;
    }

    setLocalAttendanceData((prevData: any) => ({
      ...prevData,
      [adhaar]: { date, status },
    }));
  };

  const isMissingStudentAttendance = () => {
    for (const student of studentsData) {
      if (!localAttendanceData[student.adhaar]) {
        return true;
      }
    }
    return false;
  };

  const getremainingStudentsToMarkAttendance = () => {
    const remainingStudents = [];
    for (const student of studentsData) {
      if (!localAttendanceData[student.adhaar]) {
        remainingStudents.push(student);
      }
    }
    return remainingStudents.length;
  };

  const getAttendanceStatus = (attendance = [], curDate: string) => {
    const record: any = attendance.find((a: any) => a.date === curDate);
    return record ? record?.status : false;
  };

  const submitAttendence = async () => {
    try {
      // API call to mark student absent
      setLoading(true);
      const records = [];

      if (isMissingStudentAttendance()) {
        showToast({ text: "Please mark attendence for all students." });
        return;
      }

      for (const key of Object.keys(localAttendanceData)) {
        records.push({
          adhaar: key,
          date: localAttendanceData[key].date,
          status: localAttendanceData[key].status,
        });
      }

      const response = await api.post(API_URL.attendenceBulk, {
        records: records,
      });

      if (response.data?.status === "success") {
        dispatch(getStudentsRequest());

        setLocalAttendanceData({});
        showToast({ text: "Attendance marked successfully." });
      } else {
        showToast({ text: "Error marking attendance. Please try again." });
        console.log("Attendance marking error:", response.data);
      }
    } catch (error) {
      showToast({ text: "Error marking attendance. Please try again." });
      console.log("Attendance marked:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChamge = () => {
    for (const key of Object.keys(localAttendanceData)) {
      if (localAttendanceData[key]) {
        alert("This change has removed your previous attendence data.");
        setLocalAttendanceData({});
        break;
      }
    }
  };

  useEffect(() => {
    setStudentsData(
      students.filter((student) => student.class === selectedClass)
    );
  }, [selectedClass, students]);
  return (
    <>
      <div className="mt-4 mx-4 mb-2">
        <div className="row g-3">
          <div className="col-md-6">
            <ClassesDropdown
              classes={classes}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              title="Select Class"
              updateAction={handleDateChamge}
            />
          </div>

          <div className="col-md-6">
            <DatePicker
              title="Select Date"
              value={selectedDate}
              onChange={setSelectedDate}
              max={moment().format("YYYY-MM-DD")}
            />
          </div>
        </div>
      </div>
      {showTableData && (
        <h4 className="mx-4">
          Remaining Students to mark attendence:{" "}
          {getremainingStudentsToMarkAttendance()}
        </h4>
      )}

      <div className="col-8">
        {showTableData && (
          <table className="table table-striped mt-4 mx-4">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Date</th>
                <th scope="col">Day</th>
                <th scope="col">Present</th>
                <th scope="col">Absent</th>
              </tr>
            </thead>
            <tbody>
              {studentsData?.map((student, index) => {
                const date = `${getFormattedDate()?.date}|${
                  getFormattedDate()?.day
                }|${getFormattedDate()?.month}`;

                const attendanceStatus = localAttendanceData[student.adhaar];

                const existingAttendanceStatus = getAttendanceStatus(
                  student.attendance,
                  date
                );

                let isPresent = attendanceStatus?.status === "present";
                let isAbsent = attendanceStatus?.status === "absent";

                if (existingAttendanceStatus) {
                  isPresent = existingAttendanceStatus === "present";
                  isAbsent = existingAttendanceStatus === "absent";
                }

                const presentClass = isPresent
                  ? "btn-success"
                  : "btn-outline-success";

                const absentClass = isAbsent
                  ? "btn-danger"
                  : "btn-outline-danger";

                return (
                  <tr key={index}>
                    <th scope="row">{student?.firstName}</th>
                    <th scope="row">{student.lastName}</th>
                    <th scope="row">{`${getFormattedDate()?.date}`}</th>
                    <th scope="row">{`${getFormattedDate()?.day}`}</th>
                    <th scope="row">
                      <button
                        className={`btn ${presentClass}`}
                        onClick={() =>
                          markAbsentPresent(student.adhaar, "present")
                        }
                      >
                        Present
                      </button>
                    </th>
                    <th scope="row">
                      <button
                        className={`btn ${absentClass}`}
                        onClick={() =>
                          markAbsentPresent(student.adhaar, "absent")
                        }
                      >
                        Absent
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {showTableData && (
          <button
            className="btn btn-primary mx-4 mb-2"
            onClick={submitAttendence}
          >
            Submit Attendence
          </button>
        )}
      </div>
      {loading && <FullScreenLoader show={loading} />}
    </>
  );
};

export default AttendenceTable;

const express = require("express");

const {
  getAllStudents,
  getStudentByName,
  addStudent,
  deleteStudent,
  updateStudent,
  promoteStudentsToNextClass,
  updateAttendance,
  updateBulkAttendance,
} = require("../controller/studentController");
const router = express.Router();

router.get("/", getAllStudents);

router.get("/names/:name", getStudentByName);

router.post("/", addStudent);

router.delete("/", deleteStudent);

router.patch("/", updateStudent);

router.post("/promote", promoteStudentsToNextClass);
router.post("/attendence", updateAttendance);
router.post("/attendence/bulk", updateBulkAttendance);

module.exports = router;

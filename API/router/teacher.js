const express = require("express");

const {
  getAllTeachers,
  getTeacherByName,
  addNewTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controller/teacherController");

const router = express.Router();

router.get("/", getAllTeachers);

router.get("/:name", getTeacherByName);

router.post("/", addNewTeacher);

router.delete("/", deleteTeacher);

router.patch("/", updateTeacher);

module.exports = router;

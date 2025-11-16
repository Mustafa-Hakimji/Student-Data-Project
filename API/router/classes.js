const express = require("express");
const router = express.Router();
const {
  addStudentToClass,
  createClass,
  deleteClass,
  getAllClasses,
  getClassById,
  updateClass,
} = require("../controller/classController");

router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.post("/", createClass);
router.patch("/:id", updateClass);
router.delete("/:id", deleteClass);

// Add student to class
router.post("/add-student", addStudentToClass);

module.exports = router;

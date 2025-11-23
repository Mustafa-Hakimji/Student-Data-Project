const express = require("express");
const {
  getAllSubjects,
  addSubject,
  deleteSubject,
  updateSubject,
} = require("../controller/subjectController");
const router = express.Router();

router.get("/", getAllSubjects);

router.post("/", addSubject);

router.delete("/", deleteSubject);

router.patch("/:name", updateSubject);

module.exports = router;

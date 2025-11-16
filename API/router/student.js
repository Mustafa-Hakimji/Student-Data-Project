const express = require("express");
const Student = require("../model/students");
const {
  getNotFound,
  getCommonError,
  getDataFound,
  getAddMessage,
} = require("../utils/functions/commonFunctions");
const { addNewData, deleteData } = require("../utils/crudOperations");
const {
  FIELDS_REQUIRED,
  USER_EXIST,
  USER_DELETED,
  USER_NOT_FOUND,
  ADHAAR_REQUIRED,
  STUDENT_UPDATED,
} = require("../utils/constants/appConstants");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Student.find();

    if (!data || data?.length <= 0) {
      return res
        .status(404)
        .json({ status: "failure", message: getNotFound("Students") });
    }

    return res.status(200).json({
      status: "success",
      message: getDataFound("Students"),
      results: data.length,
      data,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failure", message: getCommonError("getting student") });
  }
});

router.get("/names/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const isNumber = !isNaN(name);

    const student = await Student.findOne({
      $or: [
        { firstName: new RegExp(`^${name}$`, "i") },
        { lastName: new RegExp(`^${name}$`, "i") },
      ],
    });

    if (!student) {
      return res.status(404).json({
        status: "failure",
        message: `Student not found with name ${name}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Student found successfully with name ${name}`,
      data: student,
    });
  } catch (error) {
    console.error("Error getting student by name:", error);
    return res.status(500).json({
      status: "failure",
      message: `An error occurred while getting the student.`,
      error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudent = await addNewData({
      model: Student,
      data: req.body,
      dupField: ["adhaar"],
    });

    if (newStudent?.isFieldMissing) {
      return res
        .status(400)
        .json({ status: "failure", message: FIELDS_REQUIRED });
    }

    if (newStudent?.isDuplicate) {
      return res.status(409).json({ status: "failure", message: USER_EXIST });
    }

    if (!newStudent || !newStudent?.result) {
      return res
        .status(400)
        .json({ status: "failure", message: getCommonError("Adding student") });
    }

    return res.status(200).json({
      status: "success",
      message: getAddMessage("Student"),
      data: newStudent?.data,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(400).json({
      status: "failure",
      message: getCommonError("Adding student"),
      error,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { adhaar } = req.body;

    if (adhaar?.length <= 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Adhaar is required" });
    }

    const result = await deleteData({
      field: "adhaar",
      model: Student,
      value: adhaar,
    });

    if (result?.length > 0) {
      return res
        .status(200)
        .json({ status: "success", message: USER_DELETED, data: result });
    }

    return res.status(404).json({ status: "error", message: USER_NOT_FOUND });
  } catch (error) {
    console.error("Delete route error:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { adhaar } = req.body;

    if (!adhaar) {
      return res.status(400).json({
        status: "failure",
        message: ADHAAR_REQUIRED,
      });
    }
    const updatedStudent = await Student.findOneAndUpdate(
      { adhaar },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ status: "failure", message: USER_NOT_FOUND });
    }

    return res.status(200).json({
      status: "success",
      message: STUDENT_UPDATED,
      data: updatedStudent,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failure", message: getCommonError("updating teacher") });
  }
});

module.exports = router;

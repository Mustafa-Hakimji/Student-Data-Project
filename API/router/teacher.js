const express = require("express");

const Teacher = require("../model/teachers");
const {
  getNotFound,
  getCommonError,
  getAddMessage,
  getDataFound,
} = require("../utils/functions/commonFunctions");
const {
  FIELDS_REQUIRED,
  USER_EXIST,
  USER_DELETED,
  USER_NOT_FOUND,
} = require("../utils/constants/appConstants");
const { addNewData, deleteData } = require("../utils/crudOperations");

const router = express.Router();

router.get("/", (req, res) => res.send("Teachers route is working"));

router.get("/all", async (req, res) => {
  try {
    const data = await Teacher.find();

    if (!data || data?.length <= 0) {
      return res
        .status(404)
        .json({ status: "failuer", message: getNotFound("Teachers") });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: getDataFound("Teachers"),
        results: data.length,
        data,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failuer", message: getCommonError("getting teacher") });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const teacher = Teacher.findOne({ fullName: name });
    if (!teacher)
      return res.status(404).json({
        status: "failuer",
        message: `Teacher not found with name ${name}`,
      });
  } catch (error) {
    return res.status(400).json({
      status: "failuer",
      message: `Some exeption occured in getting teacher.`,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTeacher = await addNewData({
      model: Teacher,
      data: req.body,
      dupField: ["email", "phone"],
    });

    if (newTeacher?.isFieldMissing) {
      return res
        .status(400)
        .json({ status: "failure", message: FIELDS_REQUIRED });
    }

    if (newTeacher?.isDuplicate) {
      return res.status(409).json({ status: "failure", message: USER_EXIST });
    }

    if (!newTeacher || !newTeacher?.result) {
      return res
        .status(400)
        .json({ status: "failure", message: getCommonError("Adding teacher") });
    }

    return res.status(200).json({
      status: "success",
      message: getAddMessage("Teacher"),
      data: newTeacher?.data,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failure", message: getCommonError("Adding teacher") });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }

    const result = await deleteData({
      field: "email",
      model: Teacher,
      value: email,
    });

    if (result) {
      return res.status(200).json({ status: "success", message: USER_DELETED });
    }

    return res.status(404).json({ status: "error", message: USER_NOT_FOUND });
  } catch (error) {
    console.error("Delete route error:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

module.exports = router;

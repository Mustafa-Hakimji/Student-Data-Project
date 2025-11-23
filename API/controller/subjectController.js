const Subject = require("../model/subjects");
const { deleteData } = require("../utils/crudOperations");
const { getCommonError } = require("../utils/functions/commonFunctions");

const getAllSubjects = async (req, res) => {
  try {
    const data = await Subject.find();

    if (!data) {
      return res
        .status(404)
        .json({ status: "failure", message: "Subject not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "Subjects found successfully.",
      data,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const addSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ status: "failure", message: "Subject nae is required." });
    }

    const isSubExist = await Subject.find({ name });

    if (isSubExist) {
      return res
        .status(400)
        .json({ status: "failure", message: "Subject already exist." });
    }

    const newSubject = await Subject.create(req.body);

    return res.status(200).json({
      status: "success",
      message: "Subject added successfully.",
      subject: newSubject,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ status: "error", message: "Name is required" });
    }

    const result = await deleteData({
      field: "name",
      model: Subject,
      value: name,
    });

    if (result?.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Subject deleted Successfully.",
        data: result,
      });
    }

    return res
      .status(404)
      .json({ status: "error", message: "Subject not found." });
  } catch (error) {
    console.error("Delete route error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    if (!req.params?.name) {
      return res.status(400).json({
        status: "failure",
        message: "Subject name is required.",
      });
    }
    const upodatedSubject = await Subject.findOneAndUpdate(
      { name: req.params?.name },
      req.body,
      {
        new: true,
      }
    );

    if (!upodatedSubject) {
      return res
        .status(404)
        .json({ status: "failure", message: "Subject not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "Subject upodated successfully.",
      data: upodatedSubject,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: getCommonError("updating subject"),
      error: error.message,
    });
  }
};

module.exports = { getAllSubjects, addSubject, deleteSubject, updateSubject };

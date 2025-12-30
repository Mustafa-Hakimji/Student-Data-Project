const Class = require("../model/class.js");
const Student = require("../model/students.js");

// CREATE CLASS
const createClass = async (req, res) => {
  try {
    const isClassExist = await Class.find({ name: req.body.name });
    if (isClassExist?.length > 0) {
      return res.status(400).json({
        status: "failure",
        message: "Class already exist.",
        class: isClassExist,
      });
    }

    const newClass = await Class.create(req.body);

    res.status(200).json({
      status: "success",
      data: newClass,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET ALL CLASSES
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("students");

    res.status(200).json({
      status: "success",
      results: classes.length,
      data: classes,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

// GET SINGLE CLASS
const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate("students");

    if (!classData) return res.status(404).json({ message: "Class not found" });

    res.status(200).json({
      status: "success",
      data: classData,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

// UPDATE CLASS
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedClass,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// DELETE CLASS
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ status: "success", message: "Class deleted successfully." });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

// ADD STUDENT TO CLASS
const addStudentToClass = async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    // Update student document
    await Student.findByIdAndUpdate(studentId, {
      class: classId,
    });

    // Push student into class
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { students: studentId } }, // prevents duplicates
      { new: true }
    ).populate("students");

    res.status(200).json({
      status: "success",
      data: updatedClass,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  addStudentToClass,
};

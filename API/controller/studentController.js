const Student = require("../model/students");
const Class = require("../model/class");
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

const getAllStudents = async (req, res) => {
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
    return res.status(400).json({
      status: "failure",
      message: getCommonError("getting student"),
      error: error.message,
    });
  }
};

const getStudentByName = async (req, res) => {
  try {
    const name = req.params.name;

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
      error: error.message,
    });
  }
};

const addStudent = async (req, res) => {
  try {
    const classId = req.body.className;

    // Checking if class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(400).json({
        status: "failure",
        message: "Class does not exist. Provide valid class ID.",
      });
    }

    // Creating new student
    const newStudent = await addNewData({
      model: Student,
      data: req.body,
      dupField: ["adhaar"],
    });

    console.log({ newStudent });
    // If fields are missing
    if (newStudent?.isFieldMissing) {
      return res
        .status(400)
        .json({ status: "failure", message: FIELDS_REQUIRED });
    }

    // If duplicate entry
    if (newStudent?.isDuplicate) {
      return res.status(409).json({ status: "failure", message: USER_EXIST });
    }

    // If addition failed
    if (!newStudent || !newStudent?.result) {
      return res
        .status(400)
        .json({ status: "failure", message: getCommonError("Adding student") });
    }

    // Adding student to the class's student list
    const studentId = newStudent.data._id;
    await Class.findByIdAndUpdate(
      req.body.class,
      { $addToSet: { students: studentId } },
      { new: true }
    );

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
      error: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
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
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

const updateStudent = async (req, res) => {
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
    return res.status(400).json({
      status: "failure",
      message: getCommonError("updating teacher"),
      error: error.message,
    });
  }
};

const promoteStudentsToNextClass = async (req, res) => {
  try {
    const { adhaar, newClassId } = req.body;

    if (!adhaar || adhaar.length === 0) {
      return res.status(400).json({
        status: "failure",
        message: "Adhaar list required",
      });
    }

    if (!newClassId) {
      return res.status(400).json({
        status: "failure",
        message: "New class ID required",
      });
    }

    // Fetch students being promoted
    const students = await Student.find({ adhaar: { $in: adhaar } });

    if (!students.length) {
      return res.status(404).json({
        status: "failure",
        message: "No matching students found",
      });
    }

    // Ensure all students belong to the same current class
    const oldClassId = students[0].class.toString();
    const differentClass = students.some(
      (s) => s.class.toString() !== oldClassId
    );
    if (differentClass) {
      return res.status(400).json({
        status: "failure",
        message: "All students must belong to the same current class",
      });
    }

    const studentIds = students.map((s) => s._id);

    // Remove students from old class
    await Class.findByIdAndUpdate(oldClassId, {
      $pull: { students: { $in: studentIds } },
    });

    // Update students' class
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { class: newClassId }
    );

    // Add students to new class
    await Class.findByIdAndUpdate(newClassId, {
      $addToSet: { students: { $each: studentIds } },
    });

    res.status(200).json({
      status: "success",
      message: "Students promoted successfully",
      movedStudents: studentIds.length,
    });
  } catch (error) {
    console.error("Error promoting students:", error);
    res.status(400).json({
      status: "failure",
      message: "Error promoting students",
      error: error.message,
    });
  }
};

module.exports = {
  getStudentByName,
  getAllStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  promoteStudentsToNextClass,
};

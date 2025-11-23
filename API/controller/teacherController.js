const Teacher = require("../model/teachers");
const {
  FIELDS_REQUIRED,
  USER_EXIST,
  USER_DELETED,
  USER_NOT_FOUND,
  EMAIL_REQUIRED,
  TEACHER_UPDATED,
} = require("../utils/constants/appConstants");
const { addNewData, deleteData } = require("../utils/crudOperations");
const {
  getNotFound,
  getDataFound,
  getCommonError,
  getAddMessage,
} = require("../utils/functions/commonFunctions");

const getAllTeachers = async (req, res) => {
  try {
    const data = await Teacher.find();

    if (!data || data?.length <= 0) {
      return res
        .status(404)
        .json({ status: "failure", message: getNotFound("Teachers") });
    }

    return res.status(200).json({
      status: "success",
      message: getDataFound("Teachers"),
      results: data.length,
      data,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failure", message: getCommonError("getting teacher") });
  }
};

const getTeacherByName = async (req, res) => {
  try {
    const name = req.params.name;

    const teacher = await Teacher.findOne({
      fullName: new RegExp(`^${name}$`, "i"),
    });

    if (!teacher) {
      return res.status(404).json({
        status: "failure",
        message: `Teacher not found with name ${name}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Teacher found successfully with name ${name}`,
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: `An error occurred while getting the teacher.`,
      error: error.message,
    });
  }
};

const addNewTeacher = async (req, res) => {
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
    return res.status(400).json({
      status: "failure",
      message: getCommonError("Adding teacher"),
      error: error.message,
    });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { email } = req.body;

    if (email.length <= 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }

    const result = await deleteData({
      field: "email",
      model: Teacher,
      value: email,
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

const updateTeacher = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "failure",
        message: EMAIL_REQUIRED,
      });
    }
    const updatedTeacher = await Teacher.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (!updatedTeacher) {
      return res
        .status(404)
        .json({ status: "failure", message: USER_NOT_FOUND });
    }

    return res.status(200).json({
      status: "success",
      message: TEACHER_UPDATED,
      data: updatedTeacher,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: getCommonError("updating teacher"),
      error: error.message,
    });
  }
};

const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({
        status: "failure",
        message: `No teacher found with email ${email}`,
      });
    }

    // Validate password
    const isMatch = teacher?.password === password;
    if (!isMatch) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTeachers,
  deleteTeacher,
  getTeacherByName,
  addNewTeacher,
  updateTeacher,
  teacherLogin,
};

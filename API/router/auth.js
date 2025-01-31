const express = require("express");
const { entities } = require("../utils/constants/appConstants");
const User = require("../model/users");
const app = express();

const router = express.Router();

router.post("/register/:entity", async (req, res) => {
  try {
    const {
      fName,
      lName,
      email,
      phone,
      entity,
      password,
      cpassword,
      studentId,
      canEdit,
      studentRelation,
    } = req.body;

    const isUserExist = await User.find({ phone });
    if (isUserExist) {
      res.status(204).json({ status: "fail", message: "User already exist." });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
});

module.exports = router;

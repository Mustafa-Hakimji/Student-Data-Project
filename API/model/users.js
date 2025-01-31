const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fName: {
    type: String,
    require: [true, "A user must have a first name"],
    trim: true,
  },
  lName: {
    type: String,
    require: [true, "A user must have a last name"],
    trim: true,
  },
  email: {
    type: String,
    require: false,
    trim: true,
  },
  phone: {
    type: String,
    require: [true, "A user must have a mobile number"],
    trim: true,
  },
  entity: {
    type: String,
    require: [true, "A user must have a identity"],
    trim: true,
  },
  password: {
    type: String,
    require: [true, "A user must have a password"],
    trim: true,
  },
  cpassword: {
    type: String,
    require: [true, "A user must have a confirm password"],
    trim: true,
  },
  studentId: {
    type: String,
    required: false,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
  studentRelation: {
    type: String,
    required: false,
    trim: true,
  },
});

const User = mongoose.model("users", usersSchema);

module.exports = User;

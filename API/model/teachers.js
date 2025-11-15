const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "A teacher must have a full name"],
    trim: true,
  },

  email: {
    type: String,
    require: false,
    trim: true,
  },
  phone: {
    type: String,
    require: [true, "A teacher must have a mobile number"],
    trim: true,
  },
  entity: {
    type: String,
    require: [true, "A teacher must have a identity"],
    trim: true,
  },
  password: {
    type: String,
    require: [true, "A teacher must have a password"],
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, "A teacher must have a salary."],
  },
  createdBy: {
    type: String,
    require: false,
    trim: true,
  },
  createdAt: {
    type: String,
    require: false,
    trim: true,
  },
  updatedBy: {
    type: String,
    require: false,
    trim: true,
  },
  updatedAt: {
    type: String,
    require: false,
    trim: true,
  },
});

const Teacher = mongoose.model("users", teacherSchema);

module.exports = Teacher;

const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "A student must have a first name"],
    trim: true,
  },
  middleName: {
    type: String,
    require: false,
  },
  lastName: {
    type: String,
    require: [true, "A student must have a last name"],
    trim: true,
  },
  rollNumber: {
    type: Number,
    require: [true, "A student must have a roll number"],
    unique: true,
  },
  adhaar: {
    type: Number,
    require: [true, "A student must have adhaar card number"],
    unique: true,
  },
  sssm: {
    type: Number,
    require: false,
    unique: true,
  },
  attendance: {
    type: [String],
  },
  class: {
    type: String,
    require: [true, "A student must have a class assigned."],
  },
  stream: {
    type: String,
    default: "none",
    require: false,
  },
  feesAmount: {
    type: Number,
    require: [true, "A student must have fees as per his class"],
  },
  pendingFees: {
    type: Number,
    default: 0,
  },
  fathersName: {
    type: String,
    require: [true, "A student must have a last name"],
    trim: true,
  },
  mothersName: {
    type: String,
    require: [true, "A student must have a last name"],
    trim: true,
  },
  mobileNumberFather: {
    type: Number,
    require: [true, "A student must have his/her father mobile number"],
  },
  mobileNumberMother: {
    type: Number,
    require: false,
  },
  bankAccountNumber: {
    type: Number,
    require: [true, "A student must have an bank account number"],
  },
  ifscCode: {
    type: String,
    require: [true, "A student must have an IFSC code"],
  },
  achievements: {
    type: [String],
    require: false,
  },
  reportCards: {
    type: [Object],
    require: false,
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

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;

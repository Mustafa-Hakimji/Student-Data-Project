const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  fName: {
    type: String,
    require: [true, "A student must have a first name"],
    trim: true,
  },
  mName: {
    type: String,
    require: false,
  },
  lName: {
    type: String,
    require: [true, "A student must have a last name"],
    trim: true,
  },
  adhaar: {
    type: Number,
    require: [true, "A student must have adhaar card number"],
  },
  sssm: {
    type: Number,
    require: false,
  },
  attendance: {
    type: [String],
  },
  class: {
    type: [String],
  },
  stream: {
    type: String,
    default: "none",
  },
  feesAmount: {
    type: Number,
    require: [true, "A student must have fees as per his class"],
  },
  pendingFees: {
    type: Number,
    default: 0,
  },
  fatherName: {
    type: String,
    require: [true, "A student must have a last name"],
    trim: true,
  },
  motherName: {
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
    type: Number,
    require: [true, "A student must have an IFSC code"],
  },
});

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;

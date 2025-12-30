const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A student must have a first name"],
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: [true, "A student must have a last name"],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, "A student must have a roll number"],
    unique: true,
  },
  adhaar: {
    type: Number,
    required: [true, "A student must have adhaar card number"],
    unique: true,
  },
  sssm: {
    type: String,
    required: false,
  },
  attendance: {
    type: [String],
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  stream: {
    type: String,
    default: "none",
    required: false,
  },
  feesAmount: {
    type: Number,
    required: [true, "A student must have fees as per his class"],
  },
  pendingFees: {
    type: Number,
    default: 0,
  },
  fathersName: {
    type: String,
    required: [true, "A student must have a last name"],
    trim: true,
  },
  mothersName: {
    type: String,
    required: [true, "A student must have a last name"],
    trim: true,
  },
  mobileNumberFather: {
    type: Number,
    required: [true, "A student must have his/her father mobile number"],
  },
  mobileNumberMother: {
    type: Number,
    required: false,
  },
  bankAccountNumber: {
    type: Number,
    required: [true, "A student must have an bank account number"],
  },
  ifscCode: {
    type: String,
    required: [true, "A student must have an IFSC code"],
  },
  achievements: {
    type: [String],
    required: false,
  },
  reportCards: {
    type: [Object],
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: String,
    required: false,
    trim: true,
  },
  updatedBy: {
    type: String,
    required: false,
    trim: true,
  },
  updatedAt: {
    type: String,
    required: false,
    trim: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;

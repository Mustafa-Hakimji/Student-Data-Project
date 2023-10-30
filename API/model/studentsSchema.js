const mongoose = require("mongoose");

const studentSchema = mongoose.Schema([
  {
    name: String,
    surname: String,
    section: String,
    father: String,
    mother: String,
    adhaar: String,
    phone: String,
    sssm: String,
    bank: String,
    ifsc: String,
  },
]);

const Student = mongoose.model("students", studentSchema);

module.exports = Student;

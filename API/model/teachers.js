const mongoose = require("mongoose");

const teaxherSchema = new mongoose.Schema({
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
});

const Teacher = mongoose.model("users", teaxherSchema);

module.exports = Teacher;

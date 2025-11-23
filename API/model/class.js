const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  teacher: {
    type: String,
    required: false,
  },

  fees: {
    type: Number,
    required: true,
  },

  subjects: {
    type: [String],
    required: [true, "A class must have subjects."],
  },

  busFees: {
    type: Number,
    required: true,
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;

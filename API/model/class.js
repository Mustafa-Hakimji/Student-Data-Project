const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A class must have a title"],
    trim: true,
  },
  fees: {
    type: Number,
    required: [true, "A class must have a fees"],
    trim: true,
  },
  busFees: {
    type: Number,
    required: [true, "A class must have a bus fees"],
    trim: true,
  },
});

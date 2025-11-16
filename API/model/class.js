import mongoose from "mongoose";

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

export default mongoose.model("Class", classSchema);

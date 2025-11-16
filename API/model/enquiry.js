const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "An enquiry must have a name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "An enquiry must have a phone number"],
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  courseInterested: {
    type: String,
    required: [true, "An enquiry must have a course of interest"],
  },
  enquiryDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  followUpDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["new", "contacted", "interested", "not interested", "enrolled"],
    default: "new",
  },
  notes: {
    type: String,
    required: false,
  },
});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;

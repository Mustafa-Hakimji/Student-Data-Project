const Enquiry = require("../models/Enquiry");

// CREATE Enquiry
const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
      status: "success",
      data: enquiry,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// GET All Enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ enquiryDate: -1 });

    res.status(200).json({
      status: "success",
      results: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

// GET Single Enquiry
const getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });

    res.status(200).json({
      status: "success",
      data: enquiry,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE Enquiry
const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });

    res.status(200).json({
      status: "success",
      data: enquiry,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

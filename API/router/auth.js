const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Please try these paths: students, classes, teachers");
});

module.exports = router;

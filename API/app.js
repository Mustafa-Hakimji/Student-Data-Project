// Requiring the packages I installed
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

const port = process.env.PORT;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to the Data Base successfully");
  })
  .catch((Error) => {
    console.log(Error, "This error occured while connecting Data Base");
  });

app.use(express.json());

// Middle ware for Login Authentication
app.use("/", require("./router/auth"));
// app.use("students", require("./router/student"));
// app.use("classes", require("./router/classes"));
app.use("/teachers", require("./router/teacher"));

// Server Listning PORT
app.listen(port, () => {
  console.log(`Your server is running on port http://localhost:${port}`);
});

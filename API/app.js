// Requiring the packages I installed
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/userSchema");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

// I am using the dotenv to hide my database URL and PORT number
dotenv.config({ path: "./config.env" });
// const DB =
//   "mongodb+srv://Mustafa:9425481384@cluster0.0huzp3w.mongodb.net/mernstack?retryWrites=true&w=majority";
const DB =
  "mongodb+srv://Hakimji:12345@cluster1.t0abgew.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT;

// connecting to the Data Base using Mongoose
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
app.use(require("./router/auth"));

// Server Listning PORT
app.listen(port, () => {
  console.log(`Your server is running on port http://localhost:${port}`);
});

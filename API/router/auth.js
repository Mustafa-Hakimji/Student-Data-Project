const express = require("express");
const app = express();
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Student = require("../model/studentsSchema");

app.use(
  cors({
    origin: "*",
  })
);

router.get("/", (req, res) => {
  res.send("Home page Server side router JS");
});

// Get all teachers.
router.get("/get-all-teachers", (req, res) => {
  User.find((error, response) => {
    if (error) {
      res.send(error);
      console.log("This error occured while getting user details", error);
    } else {
      res.send({ status: 200, data: response });
    }
  });
});

// Get All students.
router.get("/get-all-students", (req, res) => {
  Student.find((error, response) => {
    if (error) {
      res.send(error);
      console.log("This error occured while getting user details", error);
    } else {
      res.send({ status: 200, data: response });
    }
  });
});

// Student class post request
router.post("/add-student", async (req, res) => {
  const {
    name,
    surname,
    father,
    mother,
    adhaar,
    phone,
    sssm,
    bank,
    ifsc,
    section,
  } = req.body;

  if (
    !name ||
    !surname ||
    !father ||
    !mother ||
    !adhaar ||
    !phone ||
    !sssm ||
    !bank ||
    !ifsc ||
    !section
  ) {
    return (
      res.status(422),
      json({ error: "All fields are required!! Registration failed!!" })
    );
  }
  try {
    const studentExist = await Student.findOne({ name, section });
    if (studentExist) {
      return res.status(422).json({ error: "This Student already registered" });
    } else {
      const student = new Student({
        name,
        surname,
        father,
        mother,
        adhaar,
        phone,
        sssm,
        bank,
        ifsc,
        section,
      });

      await student.save();

      res.status(200).json({
        message: `${name} Registered successfully in Class ${section}.`,
      });
    }
  } catch (err) {
    console.log("not able to register due to -->  ", err);
    res.status(500).json({ message: "Failed to register" });
  }
});

// Register User (Only admin can add the user);
router.post("/add-teacher", async (req, res) => {
  const { fName, lName, email, phone, designation, password, cpassword } =
    req.body;

  if (!fName || !email || !lName) {
    return res.status(422).json({ error: "Name and Email are required" });
  } else if (!phone || !designation) {
    return res
      .status(422)
      .json({ error: "Phone and designation are required" });
  } else if (!password || !cpassword) {
    return res.status(422).json({ error: "Passwords are required" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "This Email already exists" });
      window.alert("This Email already exists");
    } else if (password != cpassword) {
      return res.status(422).json({
        error:
          "Password and Conform Password are not same please check and try again...",
      });
    } else {
      const user = new User({
        fName,
        lName,
        email,
        phone,
        designation,
        password,
        cpassword,
      });

      await user.save();

      res
        .status(200)
        .json({ message: `${fName} added successfully as ${designation}"}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to register" });
  }
});

// Delete teacher by email.
router.delete("/delete-teacher", async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete student by {name, surname, section}
router.delete("/delete-student", async (req, res) => {
  try {
    const name = req.body.name;
    const surname = req.body.surname;
    const section = req.body.section;

    if (!name || !section || !surname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const deleteStudent = await Student.findOneAndDelete({
      name,
      surname,
      section,
    });

    if (!deleteStudent) {
      return res.status(404).json({ error: "Student does not exist" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch block", error: error });
  }
});

//sign teacher.
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are necessary!!" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials...." });
      } else {
        res.send({ status: 200, user: userLogin });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials...." });
    }
  } catch (err) {
    console.log("Unable to login --> ", err);
  }
});

module.exports = router;

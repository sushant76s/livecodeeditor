const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const prisma = require("../config/prisma-db");

const SECRET_KEY = process.env.JWT_SECRET;

// async function handleUserSignup(req, res) {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await prisma.User.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });
//   res.json({ message: "User created successfully" });
// }

// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email: email },
//     });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
//       res.send({ token, id: user.id });
//     } else {
//       res.status(401).send({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ error: "Error during login" });
//   }
// }

// async function userInfo(req, res) {
//   try {
//     res.send({ user: "jake", email: "jake@gmail.com" });
//   } catch (error) {
//     return res.status(500).json({ error: "Something went wrong!" });
//   }
// }

// module.exports = {
//   handleUserSignup,
//   handleUserLogin,
//   userInfo,
// };

// Sign Up
exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created", newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "User creation failed", err });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "Login successful", token, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed", err });
  }
};

exports.getUserInfo = async (req, res) => {
  const { userId } = req.user; // Assuming userId is passed in the URL as a param

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }, // Convert userId to an integer if necessary
      select: {
        id: true,
        fullName: true,
        email: true,
        // You can add more fields here as needed
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info", err });
  }
};

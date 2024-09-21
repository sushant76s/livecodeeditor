const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const prisma = require("../config/prisma-db");

const SECRET_KEY = process.env.JWT_SECRET;

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.User.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.json({ message: "User created successfully" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      res.send({ token, id: user.id });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Error during login" });
  }
}

async function userInfo(req, res) {
  try {
    res.send({ user: "jake", email: "jake@gmail.com" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  userInfo,
};

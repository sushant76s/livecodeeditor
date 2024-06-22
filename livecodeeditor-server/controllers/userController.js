const prisma = require("../config/prisma-db");
const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const user = await prisma.User.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ message: "user created successfully" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = user;

    const sessionId = uuidv4();
    setUser(sessionId, user);

    return res.status(200).json({ user: userWithoutPassword, uid: sessionId });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Error during login" });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
  userInfo,
} = require("../controllers/userController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/user", authenticateJWT, userInfo);

module.exports = router;

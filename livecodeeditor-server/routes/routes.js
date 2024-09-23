// const express = require("express");
// const {
//   handleUserSignup,
//   handleUserLogin,
//   userInfo,
// } = require("../controllers/userController");
// const { authenticateJWT } = require("../middlewares/authenticateJWT");

// const router = express.Router();

// router.post("/signup", handleUserSignup);
// router.post("/login", handleUserLogin);
// router.get("/user", authenticateJWT, userInfo);

// module.exports = router;

const express = require("express");
const { signIn, signUp } = require("../controllers/userController");
const { createRoom, joinRoom } = require("../controllers/roomController");
const { roomChat, personalChat } = require("../controllers/chatController");
const { saveSnippet } = require("../controllers/snippetController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

// User routes
router.post("/signup", signUp);
router.post("/signin", signIn);

// Room routes
router.post("/create-room", authMiddleware, createRoom);
router.post("/join-room", authMiddleware, joinRoom);

// Chat routes
router.post("/room-chat", authMiddleware, roomChat);
router.post("/personal-chat", authMiddleware, personalChat);

// Code Snippets
router.post("/save-snippet", authMiddleware, saveSnippet);

module.exports = router;

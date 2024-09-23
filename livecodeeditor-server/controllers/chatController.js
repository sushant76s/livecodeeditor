const prisma = require("../config/prisma-db");

// Room Chat
exports.roomChat = async (req, res) => {
  const { roomId, message } = req.body;
  const { userId } = req.user;
  try {
    const chat = await prisma.roomChat.create({
      data: {
        message,
        userId,
        roomId,
      },
    });
    res.status(201).json({ message: "Message sent to room", chat });
  } catch (err) {
    res.status(400).json({ error: "Room chat failed", err });
  }
};

// Personal Chat
exports.personalChat = async (req, res) => {
  const { receiverId, message } = req.body;
  const { userId } = req.user;
  try {
    const chat = await prisma.personalChat.create({
      data: {
        message,
        senderId: userId,
        receiverId,
      },
    });
    res.status(201).json({ message: "Message sent to user", chat });
  } catch (err) {
    res.status(400).json({ error: "Personal chat failed", err });
  }
};

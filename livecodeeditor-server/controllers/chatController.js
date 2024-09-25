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
    console.log("Room error: ", err);
    res.status(400).json({ error: "Room chat failed", err });
  }
};

// Personal Chat
exports.personalChat = async (req, res) => {
  const { receiverId, message, roomId } = req.body;
  const { userId } = req.user;

  try {
    const chat = await prisma.personalChat.create({
      data: {
        message,
        sender: {
          connect: { id: userId },
        },
        receiver: {
          connect: { id: parseInt(receiverId) },
        },
        room: {
          connect: { id: parseInt(roomId) },
        },
      },
    });

    res.status(201).json({ message: "Message sent to user", chat });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Personal chat failed", err });
  }
};

// Get Room Chat History
exports.getRoomChatHistory = async (req, res) => {
  const { roomId } = req.params;
  const roomIntId = parseInt(roomId);
  try {
    const messages = await prisma.roomChat.findMany({
      where: { roomId: roomIntId },
      orderBy: { createdAt: "desc" },
      take: 50, // Fetch last 50 messages
      include: {
        user: {
          select: { fullName: true },
        },
      },
    });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(400).json({ error: "Failed to retrieve chat history", err });
  }
};

// Get Personal Chat History
exports.getPersonalChatHistory = async (req, res) => {
  const { receiverId } = req.params;
  const { userId } = req.user;
  try {
    const messages = await prisma.personalChat.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: parseInt(receiverId) },
          { senderId: parseInt(receiverId), receiverId: userId },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        sender: { select: { fullName: true } },
        receiver: { select: { fullName: true } },
      },
    });
    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to retrieve chat history", err });
  }
};

// User Joins Room
exports.userJoinRoom = async (req, res) => {
  const { roomId } = req.body;
  const { userId } = req.user;
  try {
    const user = await prisma.connectedUser.create({
      data: { userId, roomId },
    });
    res.status(201).json({ message: "User joined room", user });
  } catch (err) {
    res.status(400).json({ error: "Failed to join room", err });
  }
};

// User Leaves Room
exports.userLeaveRoom = async (req, res) => {
  const { roomId } = req.body;
  const { userId } = req.user;
  try {
    await prisma.connectedUser.deleteMany({
      where: { userId, roomId },
    });
    res.status(200).json({ message: "User left room" });
  } catch (err) {
    res.status(400).json({ error: "Failed to leave room", err });
  }
};

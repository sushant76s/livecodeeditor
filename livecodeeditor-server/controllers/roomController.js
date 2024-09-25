const prisma = require("../config/prisma-db");

// async function handleCreateRoom(req, res) {
//   const { roomId, roomName, roomCreatorId } = req.body;
//   const room = await prisma.Room.create({
//     data: {
//       roomId,
//       roomName,
//       creatorId: roomCreatorId,
//     },
//   });

//   res.json({ message: "Room created successfully" });
// }

// async function handleEnterRoom(req, res) {
//   const { roomId } = req.body;
//   const room = await prisma.user.findUnique({
//     where: {
//       roomId: roomId,
//     },
//   });

//   res.json({ roomInfo: room });
// }

// module.exports = {
//   handleCreateRoom,
//   handleEnterRoom,
// };

// roomController.js
exports.createRoom = async (req, res) => {
  const { roomId, roomName } = req.body;
  const { userId } = req.user; // Extracted from the JWT token middleware
  try {
    const newRoom = await prisma.room.create({
      data: {
        roomId,
        roomName,
        roomAdminId: userId,
        users: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).json({ message: "Room created", newRoom });
  } catch (err) {
    res.status(400).json({ error: "Room creation failed", err });
  }
};

// Join Room
exports.joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const { userId } = req.user;
  console.log("rid: ", typeof roomId);
  console.log("id: ", typeof userId);
  try {
    const room = await prisma.room.update({
      where: { roomId },
      data: {
        users: { connect: { id: userId } },
      },
    });
    console.log("room: ", room);
    res.status(200).json({ message: "Joined room", room });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Joining room failed", err });
  }
};

exports.getRoom = async (req, res) => {
  const { userId } = req.user;
  try {
    const roomList = await prisma.room.findMany({
      where: { roomAdminId: userId },
    });
    console.log("room: ", roomList);
    res.status(200).json({ message: "Joined room", roomList });
  } catch (err) {
    res.status(400).json({ error: "Joining room failed", err });
  }
};

exports.roomInfo = async (req, res) => {
  const { roomId } = req.body;
  try {
    const roomInfo = await prisma.room.findUnique({
      where: { roomId: roomId },
      include: {
        users: true,
        connectedUsers: true,
        roomChats: true,
        personalChats: true,
        codeSnippets: true,
      },
    });
    console.log("room: ", roomInfo);
    res.status(200).json({ message: "Joined room", roomInfo });
  } catch (err) {
    res.status(400).json({ error: "Joining room failed", err });
  }
};

// exports.joinRoom = async (req, res) => {
//   const { roomId } = req.body;
//   const { userId } = req.user;

//   console.log("roomId: ", roomId); // log to ensure correct data
//   console.log("userId: ", userId); // log to ensure correct data

//   if (!roomId || !userId) {
//     return res.status(400).json({ error: "Invalid roomId or userId" });
//   }

//   try {
//     const room = await prisma.room.update({
//       where: { roomId: String(roomId) }, // Ensure it's a string
//       data: {
//         users: { connect: { id: Number(userId) } }, // Ensure it's an integer
//       },
//     });
//     console.log("room: ", room);
//     res.status(200).json({ message: "Joined room", room });
//   } catch (err) {
//     console.error("Error joining room: ", err);
//     res.status(400).json({ error: "Joining room failed", err });
//   }
// };

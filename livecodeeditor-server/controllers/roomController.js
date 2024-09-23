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
  try {
    const room = await prisma.room.update({
      where: { roomId },
      data: {
        users: { connect: { id: userId } },
      },
    });
    res.status(200).json({ message: "Joined room", room });
  } catch (err) {
    res.status(400).json({ error: "Joining room failed", err });
  }
};

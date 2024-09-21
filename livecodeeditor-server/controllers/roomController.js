const prisma = require("../config/prisma-db");

async function handleCreateRoom(req, res) {
  const { roomId, roomName, roomCreatorId } = req.body;
  const room = await prisma.Room.create({
    data: {
      roomId,
      roomName,
      creatorId: roomCreatorId,
    },
  });

  res.json({ message: "Room created successfully" });
}

async function handleEnterRoom(req, res) {
  const { roomId } = req.body;
  const room = await prisma.user.findUnique({
    where: {
      roomId: roomId,
    },
  });

  res.json({ roomInfo: room });
}

module.exports = {
  handleCreateRoom,
  handleEnterRoom,
};

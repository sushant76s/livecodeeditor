const userSocketMap = {};
const messages = {};
const userRoomMap = {};

function getAllConnectedClient(io, roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    socket.on("join", ({ roomId, username }) => {
      userSocketMap[socket.id] = username;
      socket.join(roomId);
      userRoomMap[socket.id] = roomId;

      const clients = getAllConnectedClient(io, roomId);

      if (messages[roomId]) {
        io.to(socket.id).emit("message", { messages: messages[roomId] });
      }

      clients.forEach(({ socketId }) => {
        io.to(socketId).emit("joined", {
          clients,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.in(roomId).emit("code-change", { code });
    });

    socket.on("sync-code", ({ socketId, code }) => {
      io.to(socketId).emit("code-change", { code });
    });

    socket.on("message", ({ roomId, message, username }) => {
      if (!messages[roomId]) {
        messages[roomId] = [];
      }
      messages[roomId].push({ message, username });

      io.in(roomId).emit("message", {
        messages: messages[roomId].slice(-1),
      });
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit("disconnected", {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
      socket.leave();
    });
  });
}

module.exports = socketHandler;

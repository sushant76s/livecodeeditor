const userSocketMap = {};
const messages = {};
const userRoomMap = {};

function getAllConnectedClient(io, roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        user: userSocketMap[socketId],
      };
    }
  );
}

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    socket.on("join", ({ roomId, user }) => {
      userSocketMap[socket.id] = user;
      socket.join(roomId);
      userRoomMap[socket.id] = roomId;

      const clients = getAllConnectedClient(io, roomId);

      if (messages[roomId]) {
        io.to(socket.id).emit("message", { messages: messages[roomId] });
      }

      clients.forEach(({ socketId }) => {
        io.to(socketId).emit("joined", {
          clients,
          user,
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

    // Room message event handler
    socket.on("message", ({ roomId, message, user }) => {
      if (!messages[roomId]) {
        messages[roomId] = [];
      }
      messages[roomId].push({ message, user });

      io.in(roomId).emit("message", {
        messages: messages[roomId].slice(-1),
      });
    });

    // Personal message event handler
    socket.on("personalMessage", ({ receiverId, message, user }) => {
      const receiverSocketId = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key].id === receiverId
      );

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("personalMessage", {
          message,
          user,
        });
      }
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms].filter((roomId) => roomId !== socket.id);

      rooms.forEach((roomId) => {
        socket.in(roomId).emit("disconnected", {
          socketId: socket.id,
          user: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
      delete userRoomMap[socket.id]; // Clean up room mapping
    });

    socket.on("disconnect", () => {
      socket.leave(); // Ensure socket leaves the room after the disconnect event
    });
  });
}

module.exports = socketHandler;

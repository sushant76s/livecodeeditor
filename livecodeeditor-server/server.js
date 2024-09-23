const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const prisma = require("./config/prisma-db");
const routes = require("./routes/routes");
const socketHandler = require("./socketHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running :)");
});

app.use("/api", routes);

// Separate the Socket.IO logic
socketHandler(io);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

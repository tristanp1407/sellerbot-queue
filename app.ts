import express from "express";
import http from "http";
import { Server } from "socket.io";

import { userQueue } from "./src/utils/initialiseQueue";
import { addToQueue } from "./src/utils/addToQueue";
import { clearQueue } from "./src/utils/clearQueue";

const app = express();
app.use(express.json({ limit: "500kb" }));

const server = http.createServer(app);

// Enable CORS for http://localhost:3000
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userConnections = new Map();

const port = 5001;

app.post("/queue-users", async (req, res) => {
  await addToQueue(req.body);
  res.send(`Users added to queue to ${req.body.action}`);
});

app.post("/clear-queue", async (req, res) => {
  await clearQueue(req.body.userId);
  res.send("Cleared queue.");
});

io.on("connection", (socket) => {
  console.log("Websocket connection made");

  socket.on("register", (userId) => {
    userConnections.set(userId, socket);
  });
});

userQueue.on("global:completed", async (_, result) => {
  const jobData = JSON.parse(result);

  console.log(jobData);

  const socket = userConnections.get(jobData.userId);

  if (socket) {
    socket.emit("message", jobData);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

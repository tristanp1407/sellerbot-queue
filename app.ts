import express from "express";
import http from "http";
import { Server } from "socket.io";

import { userQueue } from "./src/utils/initialiseQueue";
import { addToQueue } from "./src/utils/addToQueue";
import { clearQueue } from "./src/utils/clearQueue";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

const port = 5001;

app.post("/queue-users", async (req, res) => {
  await addToQueue(req.body);
  res.send(`Users added to queue to ${req.body.type}`);
});

app.post("/clear-queue", async (req, res) => {
  await clearQueue(req.body.userId);
  res.send("Cleared queue.");
});

userQueue.on("global:completed", async (job) => {
  const status = await userQueue.getJobCounts();
  io.emit("message", status);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

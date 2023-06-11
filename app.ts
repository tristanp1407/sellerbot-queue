import { Socket } from "socket.io";

import Sentry from "./src/config/sentry";
import { userQueue } from "./src/utils/initialiseQueue";
import { addToQueue } from "./src/utils/addToQueue";
import { clearQueue } from "./src/utils/clearQueue";
import { getSocket, io, userConnections } from "./src/utils/webSocket";
import { app, server } from "./src/utils/server";

app.get("/", (_, res) => res.send("<h1>👋🏻</h1>"));

app.post("/queue-users", async (req, res) => {
  await clearQueue(req.body.userId);
  await addToQueue(req.body);
  res.send(`Users added to queue to ${req.body.action}`);
});

app.post("/clear-queue", async (req, res) => {
  await clearQueue(req.body.userId);
  res.send("Cleared queue.");
});

app.get("/obliterate", async (_, res) => {
  try {
    await userQueue.obliterate({ force: true });
    res.send("Queue has been completely obliterated");
  } catch (error) {
    console.error("Error obliterating queue:", error);
    res.status(500).send("Error obliterating queue");
  }
});

io.on("connection", (socket: Socket) => {
  // console.log("Websocket connection made");

  socket.on("register", (userId) => {
    userConnections.set(userId, socket);
  });

  socket.on("disconnect", () => {
    for (const [userId, userSocket] of userConnections.entries()) {
      if (userSocket === socket) {
        userConnections.delete(userId);
        break;
      }
    }
    // console.log("WebSocket disconnected");
  });
});

userQueue.on("global:completed", async (_, result) => {
  try {
    const jobData = JSON.parse(result);
    const socket = getSocket(jobData.userId);
    if (socket) {
      socket.emit("message", jobData);
    }
  } catch {
    console.log("Invalid job result, skipping emitting websocket.");
  }
});

userQueue.on("failed", async (job, error) => {
  const jobData = job.data;
  const socket = getSocket(jobData.userId);

  if (socket) {
    socket.emit("error", error);
  }
});

const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Server running!`);
});

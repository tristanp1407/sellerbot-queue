const express = require("express");
const http = require("http");

const app = express();
app.use(express.json());

var server = http.createServer(app);
const io = require("socket.io")(server);

const port = 5001;

const { userQueue } = require("./src/utils/initialiseQueue.ts");
const { addToQueue } = require("./src/utils/addToQueue.ts");
const { clearQueue } = require("./src/utils/clearQueue.ts");

app.post("/queue-users", async (req, res) => {
  await addToQueue(req.body);
  res.send("Users added to queue to " + req.body.type);
});

app.post("/clear-queue", async (req, res) => {
  clearQueue();
  res.send("Cleared queue.");
});

userQueue.on("global:completed", async (job) => {
  const status = await userQueue.getJobCounts();

  io.emit("message", status);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

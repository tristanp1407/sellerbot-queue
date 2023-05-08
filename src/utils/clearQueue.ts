import { getSocket, io } from "./webSocket";

const { userQueue } = require("./initialiseQueue.ts");

export const clearQueue = async (userId: string) => {
  console.log("Clearing queue for " + userId);
  const delayedJobs = await userQueue.getDelayed();
  for (const job of delayedJobs) {
    if (job.data.userId === userId) {
      await job.remove();
    }
  }

  const socket = getSocket(userId);

  if (socket) {
    socket.emit("queue-cleared", true);
  }
};

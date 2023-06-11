import { getSocket } from "./webSocket";

const { userQueue } = require("./initialiseQueue.ts");

export const clearQueue = async (userId: string) => {
  const delayedJobs = await userQueue.getDelayed();

  for (const job of delayedJobs) {
    if (job.data.userId === userId) {
      try {
        await job.remove();
      } catch (e: any) {
        console.error(`Failed to clear a job for ${userId}: ${e.message}`);
      }
    }
  }

  console.log(`${userId} cleared ${delayedJobs.length} jobs`);

  const socket = getSocket(userId);

  if (socket && delayedJobs?.length) {
    socket.emit("queue-cleared", true);
  }
};

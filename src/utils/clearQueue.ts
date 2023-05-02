const { userQueue } = require("./initialiseQueue.ts");

export const clearQueue = async (userId) => {
  console.log("Clearing queue for " + userId);
  const delayedJobs = await userQueue.getDelayed();
  for (const job of delayedJobs) {
    if (job.data.userId === userId) {
      await job.remove();
    }
  }
};

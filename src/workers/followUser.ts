import axios from "axios";

import { clearQueue } from "../utils/clearQueue";
import { JobData } from "../types/job";

export const followUser = async (job) => {
  const data: JobData = job.data;
  const { user, token, userId, initialTotal, position } = data;
  const followUrl = `https://webapi.depop.com/api/v1/follows/${user.id}/`;

  const jobTimestamp = job.queue.delayedTimestamp;
  const currentTimestamp = new Date().getTime();

  console.log(jobTimestamp);

  // Check if job's timestamp is older than 30 seconds
  if (currentTimestamp - jobTimestamp > 30000) {
    console.log("Job's timestamp is older than 30 seconds, aborting.");
    return { ok: false };
  }

  try {
    const response = await axios.put(followUrl, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 202) {
      return {
        ok: true,
        username: user.username,
        action: "follow",
        userId,
        initialTotal,
        position,
      };
    }
  } catch (error: any) {
    clearQueue(userId);
    console.error("Error following user:", error.response.statusText);
  }
};

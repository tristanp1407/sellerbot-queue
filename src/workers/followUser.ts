import axios from "axios";

import { clearQueue } from "../utils/clearQueue";
import { JobData } from "../types/job";

export const followUser = async (job) => {
  const data: JobData = job.data;
  const { user, token, userId, initialTotal, position } = data;
  const followUrl = `https://webapi.depop.com/api/v1/follows/${user.id}/`;

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
    console.error("Error following user:", error.response.statusText);
    clearQueue(userId);
  }
};

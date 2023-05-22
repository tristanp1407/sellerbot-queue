import axios from "axios";

import { clearQueue } from "../utils/clearQueue";
import { JobData } from "../types/job";

export const unfollowUser = async (job: any) => {
  const data: JobData = job.data;
  const { user, token, userId, initialTotal, position } = data;

  const followUrl = `https://webapi.depop.com/api/v1/follows/${user.id}/`;

  try {
    const response = await axios.delete(followUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return {
        ok: true,
        username: user.username,
        action: "unfollow",
        userId,
        initialTotal,
        position,
      };
    }
  } catch (error: any) {
    console.error("Error unfollowing user:", error.response.statusText);
    clearQueue(userId);
  }
};

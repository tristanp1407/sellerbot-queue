import axios from "axios";
import { User } from "../utils/addToQueue";
import { clearQueue } from "../utils/clearQueue";

type Job = {
  data: { user: User; userId: string; token: string };
};

export const unfollowUser = async ({ data }: Job) => {
  const { user, token, userId } = data;
  const followUrl = `https://webapi.depop.com/api/v1/follows/${user.id}/`;

  try {
    const response = await axios.delete(followUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      console.log("✅ Unfollowed", user.username);
      return { ok: true, username: user.username, action: "unfollow", userId };
    }
  } catch (error: any) {
    console.error("Error unfollowing user:", error.response.statusText);
    clearQueue(userId);
  }
};

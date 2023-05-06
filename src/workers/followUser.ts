import axios from "axios";
import { User } from "../utils/addToQueue";
import { clearQueue } from "../utils/clearQueue";

type Job = {
  data: { user: User; userId: string; token: string };
};

export const followUser = async ({ data }: Job) => {
  const { user, token, userId } = data;
  const followUrl = `https://webapi.depop.com/api/v1/follows/${user.id}/`;

  try {
    const response = await axios.put(followUrl, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 202) {
      console.log("✅ Followed", user.username);
      return {
        ok: true,
        username: user.username,
        action: "follow",
        userId,
      };
    }
  } catch (error: any) {
    console.error("Error following user:", error.response.statusText);
    clearQueue(userId);
  }
};

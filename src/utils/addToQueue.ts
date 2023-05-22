import { JobData } from "../types/job";

const { userQueue } = require("./initialiseQueue.ts");

const { followUser } = require("../workers/followUser.ts");
const { unfollowUser } = require("../workers/unfollowUser.ts");

userQueue.process("follow", followUser);
userQueue.process("unfollow", unfollowUser);

export type User = {
  username: string;
  id: number;
};

export type Task = {
  action: "follow" | "unfollow";
  users: User[];
  userId: string;
  token: string;
};

export const addToQueue = (data: Task) => {
  const { action, users, userId, token } = data;

  users.forEach((user: User, i: number) => {
    userQueue.add(
      action,
      {
        user,
        userId,
        token,
        initialTotal: users.length,
        position: i + 1,
      } as JobData,
      { delay: 2000 * i, removeOnComplete: true, removeOnFail: true }
    );
  });

  console.log(`${userId} has added ${users.length} users to ${action}`);
};

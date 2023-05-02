const { userQueue } = require("./initialiseQueue.ts");

const { followUser } = require("../workers/followUser.ts");
const { unfollowUser } = require("../workers/unfollowUser.ts");

userQueue.process("follow", followUser);
userQueue.process("unfollow", unfollowUser);

export const addToQueue = (data) => {
  const { action, users, userId } = data;

  users.forEach((user, i) => {
    userQueue.add(
      action,
      { user, userId },
      { delay: 4000 * i, removeOnComplete: true, removeOnFail: true }
    );
  });
};

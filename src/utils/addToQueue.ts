const { userQueue } = require("./initialiseQueue.ts");

const { followUser } = require("../workers/followUser.ts");
const { unfollowUser } = require("../workers/unfollowUser.ts");

userQueue.process("follow", followUser);
userQueue.process("unfollow", unfollowUser);

const addToQueue = (data) => {
  const { type, users, userId } = data;
  users.forEach((user, i) => {
    userQueue.add(
      type,
      { user, userId },
      { delay: 2000 * i, removeOnComplete: true, removeOnFail: true }
    );
  });
};

module.exports = { addToQueue, userQueue };

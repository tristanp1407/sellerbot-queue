const { userQueue } = require("./initialiseQueue.ts");

const clearQueue = async () => await userQueue.obliterate();

module.exports = { clearQueue };

const Queue = require("bull");

const { testWorker } = require("./src/workers/test.ts");

const myQueue = new Queue("myQueue");

myQueue.process(testWorker);

const addJob = (job) => {
  myQueue.add(job, {});
};

module.exports = { addJob };

const testWorker = async (job) => {
  // Do something with the job data
  console.log("Processing job");
  console.log(job.data);
};

module.exports = { testWorker };

const express = require("express");
const app = express();
app.use(express.json());
const port = 5001;

const { addJob } = require("./queue.ts");

app.post("/add-job", async (req, res) => {
  const data = req.body;

  await addJob(data);

  res.send("Job added to queue");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

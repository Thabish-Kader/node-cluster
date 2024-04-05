import express, { json } from "express";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorHandlerMiddleware";

import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 4000;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker process ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
const app = express();
app.use(cors());
app.use(json());

app.get("/some-heavy-operation", (req, res) => {
  console.log(`Worker Process ${process.pid} running`);
  let total = 0;
  for (let i = 0; i < 100_000_000; i++) {
    total += i;
  }
  res.json({ message: "Heavy process completed", total });
});

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// }

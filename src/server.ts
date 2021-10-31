import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: express.Application = express();

app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on port: 3000`);
});

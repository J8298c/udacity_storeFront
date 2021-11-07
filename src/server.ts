import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./controllers/user.controller";

dotenv.config();
const app: express.Application = express();

app.use(express.json());

app.use('/api/users', userRouter);

app.listen(3000, function () {
  console.log(`starting app on port: 3000`);
});

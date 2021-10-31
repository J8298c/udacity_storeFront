import express, { Request, Response } from "express";
import dotenv from "dotenv";
import productRouter from "./api/controllers/products.controller";
import userRouter from "./api/controllers/user.controller";

dotenv.config();
const app: express.Application = express();

app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(3000, function () {
  console.log(`starting app on port: 3000`);
});

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./controllers/user.controller";
import productRouter from "./controllers/product.controller";

dotenv.config();
const app: express.Application = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

export default app;
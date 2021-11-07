import express, { Request, Response } from "express";
import checkAuthorization from "../middleware/checkAuthorization";

const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
  try {

  } catch (err) {
    res.status(500).json({ error: 'Internal application error' })
  }
})

export default userRouter;

import express, { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { User } from "../interfaces/User";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ err: "missing required parameters" });
      }
      const result: { user: User | null; error: string | null } =
        await createUser(email, password);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.status(200).json({ user: result.user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "error creating user" });
    }
  }
);

export default userRouter;

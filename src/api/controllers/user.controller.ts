import express, { Request, Response } from "express";
import {
  createUser,
  fetchAllUsers,
  fetchSingleUser,
  logUserIn,
} from "../services/user.service";
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

userRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "missing required parameters" });
      }

      const { user, error, token } = await logUserIn(email, password);

      if (error !== null) {
        return res.status(400).json({ error });
      }

      return res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "Error logging in" });
    }
  }
);

userRouter.get(
  "/all",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await fetchAllUsers();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ err: "Error fetching users" });
    }
  }
);

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const results = await fetchSingleUser(req.params.id);
    if (results === null) {
      return res
        .status(200)
        .json({ message: `User with id: ${req.params.id} not found` });
    }
    return res.status(200).json({ user: results });
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Error fetching user ${req.params.id}` });
  }
});

export default userRouter;

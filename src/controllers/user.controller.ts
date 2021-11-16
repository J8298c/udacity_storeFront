import express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';
import { insertUser, getUserByEmail, fetchUsers } from '../models/user.model'
import checkAuthorization from "../middleware/checkAuthorization";

const userRouter = express.Router();

const internalAppError = 'Internal application error'

const createJWT = (id: string): string => jwt.sign({userId: id}, process.env.TOKEN_SECRET!)

userRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    if(!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) {
      return res.status(400).json({ error: 'missing required parameter'})
    }

    if(!emailValidator.validate(req.body.email)) {
      return res.status(400).json({ error: 'Please provide valid email'})
    }

    const hashedPass = bcrypt.hashSync(`${req.body.password}${process.env.PEPPER}`, 10)

    const user = await insertUser(req.body.email, req.body.first_name, req.body.last_name, hashedPass)

    const token = createJWT(user.id)

    return res.status(200).json({ message: 'user created successfully', token })
  } catch (err) {
    return res.status(500).json({ error: internalAppError })
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'missing required params'})
    }
    const user = await getUserByEmail(req.body.email)
    const badEmailPassComboMsg = 'Bad email password combo'
    if(!user.password) {
      return res.status(400).json({ error: badEmailPassComboMsg})
    }

    const passwordCheck = bcrypt.compareSync(`${req.body.password}${process.env.PEPPER}`, user.password)

    if(!passwordCheck) {
      return res.status(400).json({ error: badEmailPassComboMsg })
    }

    const token = createJWT(user.id!.toString())

    return res.status(200).json({ message: 'Login success', token })
  } catch (err) {
    return res.status(500).json({ error: internalAppError})
  }
})

userRouter.get('/all', checkAuthorization, async (req: Request, res: Response) => {
  try {
    const allUsersEmails = await fetchUsers()
    return res.status(200).json({ allUsersEmails })
  } catch (err) {
    return res.status(500).json({ error: internalAppError})
  }
})

export default userRouter;

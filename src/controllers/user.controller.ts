import express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';
import { insertUser } from '../models/user.model'

const userRouter = express.Router();

const createJWT = (id: string): string => jwt.sign(id, process.env.TOKEN_SECRET!)

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
    res.status(500).json({ error: 'Internal application error' })
  }
})

export default userRouter;

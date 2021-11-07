import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { fetchSingleUserById } from '../dao/user.dao'

export const checkAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ error: 'Please Login First'})
  }

  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, process.env.TOKEN_SECRET!, async (err, token) => {
    if(err) {
      console.error(err)
    }
    if(!token) {
      console.error('no token')
    }
    const userId = token!.id

    const user = await fetchSingleUserById(Number(userId))
    if(!user) {
      console.log('do something here')
    }
    next();
  })
}
import { Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken';



const checkAuthorization = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if(!req.headers.authorization) {
        return res.status(401).json({ error: 'Please login first'})
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!jwt.verify(token, process.env.TOKEN_SECRET!)) {
        return res.status(401)
    }

    return next()
}


export default checkAuthorization;

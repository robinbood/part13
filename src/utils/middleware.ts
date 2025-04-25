const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { SECRET } from './config';

export interface CustomRequest extends Request {
    decodedToken?: any;
    blog?:any;
}

const tokenExtractor = (req:CustomRequest, res:Response, next:any) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch (error:unknown) {
            if (error instanceof Error) {
                return res.status(401).json({ error: 'token invalid' });
            } 
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }

}

module.exports = {tokenExtractor};
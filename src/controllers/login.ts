const jwt = require('jsonwebtoken');
const router = require('express').Router();
import { Request, Response } from 'express';
import 'express-async-errors';

const {SECRET} = require('../utils/config');
const User = require('../models/user');

router.post('/', async (req:Request, res:Response) => {
    const body = req.body;
    const user = await User.findOne({ where: { username: body.username } })
     
    const passwordCorrect = body.password ==="secret"

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    const userForToken = {
        username: user.username,
        id: user.id
    };  

    const token = jwt.sign(userForToken, SECRET, {
        expiresIn: 60 * 60 * 24 * 7 // 7 days
    });

    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    });
});

const router  = require('express').Router();
import  { Request, Response } from 'express';   
const { User } = require('../models/user');
const {tokenExtractor} = require('../utils/middleware'); 
import { CustomRequest } from '../utils/middleware';   

const isAdmin = async (req:CustomRequest, res:Response, next:any) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user.admin) {
        return res.status(403).json({ error: 'forbidden' });
    }
    next();
};

router.get('/', async (_req:Request, res:Response) => {
    const users = await User.findAll({
        include: [{
            model: Blog,
            attributes: {exclude: ['userId']},
        },
        {
            model:Team,
            attributes: ["name", "id"],
            through : { attributes: [] }
        }]
    });
    res.json(users);
}
);

router.post('/', async (req:Request, res:Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
        
    }
});
router.put('/:username',tokenExtractor,isAdmin, async (req:Request, res:Response) => {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) { 
        user.disabled = req.body.disabled;
        await user.update(req.body);
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
}); 

router.get('/:id', async (req:Request, res:Response) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: [''] },
        include: [{
            model: Blog,
            attributes: { exclude: ['userId'] },
            },
            {
            model: Team,
            attributes: ["name", "id"],
            through: { attributes: [] }
            },
            {
            model :Blog,
            as: "marked_blogs",
            attributes: { exclude: ['userId'] },
            through: { attributes: [] },
            include: {
                model: User,
                attributes: ['name'],}
            },
            
        ]
    });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' }).end();
    }
});


module.exports = router;
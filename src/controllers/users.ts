const router  = require('express').Router();
import e, { Request, Response } from 'express';
const { User } = require('../models/user');

router.get('/', async (_req:Request, res:Response) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: {exclude: ['userId']},
        }
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
router.put('/:username', async (req:Request, res:Response) => {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) { 
        await user.update(req.body);
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
}); 

router.get('/:id', async (req:Request, res:Response) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});


module.exports = router;
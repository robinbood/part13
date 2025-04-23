const router  = require('express').Router();
import 'express-async-errors';
import { Request, Response } from 'express';
const { Blog } = require('../models/blog');
app.use(express.json());
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const blogFinder = async (req:Request, _res:Response, next:any) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};
const tokenExtractor = (req:Request, res:Response, next:any) => {
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


router.get('/', async (_req :Request, res:Response) => {
    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User,
            attributes: ['name'],
        }});
    res.json(blogs);
});

router.post('/',tokenExtractor, async (req:Request, res:Response) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const blog = await Blog.create({...req.body, userId: user.id,date: new Date()});
        res.status(201).json(blog);
        
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
        
    }
});

router.get('/:id',blogFinder, async (req:Request, res:Response) => {
    if (req.blog) {
        res.json(req.blog);
    } else {
        res.status(404).json({ error: 'Blog not found' });
    }
    
});

router.delete('/:id',blogFinder, async (req:Request, res:Response) => {
    
    if (req.blog) {
        await req.blog.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Blog not found' });
    }
});

router.put('/:id',blogFinder, async (req:Request, res:Response) => {
    
    if (req.blog) {
        await req.blog.update(req.body);
        res.json(req.blog);
    } else {
        res.status(404).json({ error: 'Blog not found' });
    }
});



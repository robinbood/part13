import { DataTypes } from "sequelize";
require("dotenv").config();
const {Sequelize,Model,QueryTypes} = require("sequelize");
const express = require("express");
import {Request, Response} from "express";
const app = express();
app.use(express.json());
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: { 
            require: true,
            rejectUnauthorized: false
        }
    },
});
class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author:DataTypes.STRING,
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});    
const main  = async () => {
    try {
        await sequelize.authenticate();
        const blogs = await sequelize.query("SELECT * FROM blogs", {
            type: QueryTypes.SELECT});
        blogs.map((blog:Blog) => {
            console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`);
        });
        sequelize.close();      
    } catch (error:unknown) {
        if (error instanceof Error) {
            console.error("Unable to connect to the database:", error.message);
        } else {
            console.error("An unknown error occurred:", error);
        }
    }
} 
main();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/api/blogs", async (_req:Request, res:Response) => {
    const blogs:Blog = await Blog.findAll();
    res.json(blogs);
}
);

app.post("/api/blogs", async (req:Request, res:Response) => {
    try {
        const blog:Blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
);
app.delete("/api/blogs/:id", async (req:Request, res:Response) => {
    const blog :Blog= await Blog.findByPkAndDelete(req.params.id);
    if (blog) {
        res.status(200).end();
    } else {
        res.status(404).json({ error: 'Blog not found' });
    }
}
);
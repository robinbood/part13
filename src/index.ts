require('dotenv').config();
const {Sequelize,Model ,QueryTypes} = require('sequelize');
const express = require('express');
import {Request, Response} from 'express';
import { DataTypes } from 'sequelize';

const app = express();
app.use(express.json());


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialectOptions: {
        ssl: { 
            require: true,
            rejectUnauthorized: false
        }
    },
});
class Note extends Model {}
Note.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    importamt:{
        type:DataTypes.BOOLEAN,
    },
    date:{
        type:DataTypes.DATE
    }
},{
    sequelize,
    underscored: true,
    timeStamps:false,
    modelName:'note'
});
Note.sync();
app.get('/api/health', async (_req :Request , res:Response) => {
    const notes:Array<object> = await Note.findAll()
    res.json(notes);
});
app.post('/api/notes',async (req:Request , res:Response) => {
  try {
    const note: Note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
    
  }
});
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
        
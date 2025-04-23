import { sequelize } from '../utils/db';
import { DataTypes, Model } from 'sequelize';

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
},
    {
    sequelize,
    underscored: true,
    timestamps:false,
    modelName: 'blog'
    }
);

module.exports  = Blog;
import { Model,DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class UserBlogs extends Model {}

UserBlogs.init({
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "blog",
            key: "id"
        }
    },
}, {
    sequelize,
    underscored:true,
    timestamps:true,
    modelName:"user_blogs"
})
module.exports = UserBlogs; 
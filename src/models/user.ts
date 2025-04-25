import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";


class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
    },
    disabled : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user"

});
module.exports = User;
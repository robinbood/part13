import { Model,DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class Membership extends Model {}

Membership.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "team",
            key: "id"
        }
    }
}, {
    sequelize,
    underscored:true,
    timestamps:true,
      modelName:"membership"
})

module.exports = Membership
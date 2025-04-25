import { Model,DataTypes } from "sequelize";
import { sequelize } from "../utils/db";


class Team extends Model {}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "team"
});

module.exports = Team;
import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
    up: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.createTable("teams", {
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
        });
        await queryInterface.createTable("memberships", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "teams",
                    key: "id"
                }
            },

        })
    },
    down: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.dropTable("memberships")
        await queryInterface.dropTable("teams")
    }
};
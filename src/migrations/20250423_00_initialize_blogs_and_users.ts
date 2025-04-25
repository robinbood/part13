import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
    up: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.createTable("blogs", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        })

        await queryInterface.createTable("users", {
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
            }
        })
        await queryInterface.addColumn("blogs", "user_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        })
    },
    down: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.dropTable("blogs")
        await queryInterface.dropTable("users")
    },
}

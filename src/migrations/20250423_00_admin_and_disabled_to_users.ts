import { DataTypes,QueryInterface } from "sequelize";

module.exports = {
    up : async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.addColumn("users", "admin", {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        })
        await queryInterface.addColumn("users", "disabled", {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        })
    },
    down : async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.removeColumn("users", "admin") 
        await queryInterface.removeColumn("users", "disabled")
    }
};


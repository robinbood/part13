const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");


export const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,  
            rejectUnauthorized: false 
    }
        },
    },
);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Unable to connect to the database:", error);
            return process.exit(1);
        }
    }
    return null;
}

module.exports = { 
    connectToDatabase
};

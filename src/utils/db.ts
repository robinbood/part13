const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");
import { Umzug,SequelizeStorage } from "umzug";


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
        await runMigrations();
        console.log("Connected to the database successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Unable to connect to the database:", error);
            return process.exit(1);
        }
    }
    return null;
}

const migrationConf = {
    migrations: {
        glob: "./migrations/*.ts",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console
};


const runMigrations = async () => {
    const migrator = new Umzug(migrationConf);
    const migrations  = await migrator.up();
    console.log("Migrations up to date", { files: migrations.map((mig) => mig.name) });

}

const rollBackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.down();
}
module.exports = { 
    connectToDatabase,sequelize,rollBackMigration
};

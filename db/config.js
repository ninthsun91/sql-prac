import { Sequelize } from "Sequelize";
import env from "../envConfig.js";


const DB_USER = env.DB_USER;
const DB_PASSWORD = env.DB_PASSWORD;
const DB_HOST = env.DB_HOST;

const sequelizeConnection = new Sequelize("todo_js", DB_USER, DB_PASSWORD, {
    dialect: "mysql",
    host: DB_HOST,
});


export default sequelizeConnection;
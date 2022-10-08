import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT,
    SESSION_KEY: process.env.SESSION_KEY,

    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    
    JWT_KEY: process.env.JWT_KEY,
    SALT_ROUND: Number(process.env.SALT_ROUND),
}
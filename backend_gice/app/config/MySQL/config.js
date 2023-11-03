import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.db_host,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

export default config;
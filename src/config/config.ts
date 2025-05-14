import path from "path";
import dotenv from "dotenv"
dotenv.config()
interface DbConfig{
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: "mysql";
    port: number;
    models?: string[];
    loggers: boolean
}
interface Config{
    [key: string]: DbConfig;
}
//SOLUCIONAR EL TEMA DE USERNAME Y PASSWORD TIRA ERROR
export const config: Config = {
    development: {
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database:  process.env.DB_NAME!,
        host: process.env.DB_HOST!,
        dialect: "mysql",
        port: parseInt(process.env.DB_PORT!),
        loggers: false 
    }
}

//models: [path.join(__dirname, '..', 'models', '*.model.ts')]
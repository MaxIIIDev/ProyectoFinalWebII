import path from "path";

interface DbConfig{
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: "mysql";
    port: number;
    models?: string[];
}
interface Config{
    [key: string]: DbConfig;
}
//SOLUCIONAR EL TEMA DE USERNAME Y PASSWORD TIRA ERROR
export const config: Config = {
    development: {
        username: "root",
        password: "1234",
        database: process.env.DB_NAME!,
        host: process.env.DB_HOST!,
        dialect: "mysql",
        port: parseInt(process.env.DB_PORT!),
        models: [path.join(__dirname, '..', 'models', '*.model.ts')]
    }
}


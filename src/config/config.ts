
interface DbConfig{
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: "mysql";
    port: number;
}
interface Config{
    [key: string]: DbConfig;
}

export const config: Config = {
    development: {
        username: "root",
        password: "",
        database: "hospital",
        host: "localhost",
        dialect: "mysql",
        port: 3306
    }
}
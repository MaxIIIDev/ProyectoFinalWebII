"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//SOLUCIONAR EL TEMA DE USERNAME Y PASSWORD TIRA ERROR
exports.config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: parseInt(process.env.DB_PORT),
        loggers: false
    }
};
//models: [path.join(__dirname, '..', 'models', '*.model.ts')]
//# sourceMappingURL=config.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("dotenv/config");
const conexion_1 = require("../data/conexion");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.morgan = require("morgan");
        this.PORT = process.env.PORT;
        this.session = require("express-session");
    }
    async start() {
        const routeStatic = __dirname.replace("presentation", "public");
        const conexion = conexion_1.Conexion.getConexion;
        conexion.arrancarLaBd();
        this.app.use(this.session({
            secret: "122",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            }
        }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(routeStatic));
        this.app.use("/icons", express_1.default.static(`${__dirname}/../../node_modules/bootstrap-icons/font`));
        this.app.use(this.morgan("dev"));
        this.app.set("views", "./src/public/views");
        this.app.set("view engine", "pug");
        this.app.use(routes_1.AppRoutes.routes);
        this.app.listen(this.PORT, () => {
            console.log("Server on! PORT: " + process.env.PORT);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
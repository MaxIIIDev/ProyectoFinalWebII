"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const fs_1 = __importDefault(require("fs"));
require("dotenv/config");
const conexion_1 = require("../data/conexion");
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.morgan = require("morgan");
        this.PORT = process.env.PORT;
        this.session = require("express-session");
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.configureViews();
            // this.app.set("views", "./src/public/views");
            // this.app.set("view engine" , "pug");
            this.app.use(routes_1.AppRoutes.routes);
            this.app.listen(this.PORT, () => {
                console.log("Server on! PORT: " + process.env.PORT);
            });
        });
    }
    configureViews() {
        // Posibles ubicaciones de las vistas
        const possibleViewPaths = [
            path_1.default.join(__dirname, "../public/views"), // Desarrollo local
            path_1.default.join(__dirname, "../../public/views"), // Producción en algunos entornos
            path_1.default.join(process.cwd(), "src/public/views"), // Producción en Render.com
            path_1.default.join(process.cwd(), "public/views") // Producción alternativa
        ];
        // Filtrar solo las rutas que existen
        const validViewPaths = possibleViewPaths.filter(viewPath => {
            try {
                return fs_1.default.existsSync(viewPath);
            }
            catch (error) {
                return false;
            }
        });
        if (validViewPaths.length === 0) {
            throw new Error("No se encontró el directorio de vistas en ninguna de las ubicaciones probadas");
        }
        console.log("Configurando vistas en:", validViewPaths);
        this.app.set("views", validViewPaths);
        this.app.set("view engine", "pug");
        // Middleware para verificar rutas de vistas
        this.app.use((req, res, next) => {
            res.locals.viewPaths = validViewPaths;
            next();
        });
    }
}
exports.Server = Server;

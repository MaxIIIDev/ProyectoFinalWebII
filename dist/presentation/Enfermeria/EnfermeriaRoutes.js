"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnfermeriaRoutes = void 0;
const express_1 = require("express");
const EnfermerosController_1 = require("./EnfermerosController");
class EnfermeriaRoutes {
    static enfermeriaRoutes(conexionBd) {
        const router = (0, express_1.Router)();
        const controller = new EnfermerosController_1.EnfermerosController();
        router.get("/hola", controller.getEnfermeros);
        return router;
    }
}
exports.EnfermeriaRoutes = EnfermeriaRoutes;
//# sourceMappingURL=EnfermeriaRoutes.js.map
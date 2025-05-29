"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const AuthController_1 = require("./AuthController");
class AuthRoutes {
}
exports.AuthRoutes = AuthRoutes;
AuthRoutes.authRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new AuthController_1.AuthController();
    router.get("/login", controller.Login);
    //router.post("/login")
    return router;
};
//# sourceMappingURL=AuthRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor() {
        this.Login = async (req, res) => {
            try {
                res.render("./home/login");
            }
            catch (error) {
                console.log("hubo un error: " + error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map
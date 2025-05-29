"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
(async () => {
    main();
})();
function main() {
    const server = new server_1.Server();
    server.start();
}
//# sourceMappingURL=app.js.map
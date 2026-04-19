"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const configs_1 = require("./configs");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Static files for uploads
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', configs_1.config.upload.dir)));
// API Routes
app.use('/api', routes_1.default);
// Error handling
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Start server
const PORT = configs_1.config.port;
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 WebBanHoaQua Backend API is running!                ║
║                                                          ║
║   📍 Server: http://localhost:${PORT}                     ║
║   📍 API:     http://localhost:${PORT}/api                ║
║   📍 Health:  http://localhost:${PORT}/api/health          ║
║                                                          ║
║   Environment: ${configs_1.config.nodeEnv}                            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});
exports.default = app;
//# sourceMappingURL=index.js.map
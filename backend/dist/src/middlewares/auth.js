"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.adminMiddleware = exports.authMiddleware = void 0;
const helpers_1 = require("../utils/helpers");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để tiếp tục',
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, helpers_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn',
        });
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền truy cập trang này',
        });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = (0, helpers_1.verifyToken)(token);
            req.user = decoded;
        }
    }
    catch (error) {
        // Ignore token errors for optional auth
    }
    next();
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map
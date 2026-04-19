"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateShippingFee = exports.formatCurrency = exports.paginate = exports.slugify = exports.generateOrderNumber = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const configs_1 = require("../configs");
const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
const generateToken = (payload) => {
    return jwt.sign(payload, configs_1.config.jwt.secret, { expiresIn: configs_1.config.jwt.expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jwt.verify(token, configs_1.config.jwt.secret);
};
exports.verifyToken = verifyToken;
const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD${timestamp}${random}`;
};
exports.generateOrderNumber = generateOrderNumber;
const slugify = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};
exports.slugify = slugify;
const paginate = (page, limit) => {
    const offset = (page - 1) * limit;
    return { skip: offset, take: limit };
};
exports.paginate = paginate;
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
exports.formatCurrency = formatCurrency;
const calculateShippingFee = (subtotal) => {
    if (subtotal >= 500000)
        return 0;
    if (subtotal >= 200000)
        return 15000;
    return 25000;
};
exports.calculateShippingFee = calculateShippingFee;
//# sourceMappingURL=helpers.js.map
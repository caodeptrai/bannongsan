"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const configs_1 = require("../configs");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, configs_1.config.upload.dir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const filename = `${(0, uuid_1.v4)()}${ext}`;
        cb(null, filename);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Chỉ chấp nhận file hình ảnh (jpeg, jpg, png, webp, gif)'));
};
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: configs_1.config.upload.maxSize },
    fileFilter,
});
exports.uploadMiddleware = exports.upload.array('images', 5);
//# sourceMappingURL=upload.js.map
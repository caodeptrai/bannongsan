"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const client_2 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthService {
    async register(data) {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            throw { status: 400, message: 'Email đã được đăng ký' };
        }
        const hashedPassword = await (0, helpers_1.hashPassword)(data.password);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                fullName: data.fullName,
                phone: data.phone,
                role: client_2.Role.USER,
                status: client_2.UserStatus.ACTIVE,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        const token = (0, helpers_1.generateToken)({ id: user.id, email: user.email, role: user.role });
        return { user, token };
    }
    async login(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
        }
        const isValidPassword = await (0, helpers_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
        }
        if (user.status === client_2.UserStatus.LOCKED) {
            throw { status: 403, message: 'Tài khoản đã bị khóa' };
        }
        const token = (0, helpers_1.generateToken)({ id: user.id, email: user.email, role: user.role });
        return {
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
                address: user.address,
                role: user.role,
                status: user.status,
                avatar: user.avatar,
                createdAt: user.createdAt,
            },
            token,
        };
    }
    async getProfile(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                address: true,
                avatar: true,
                role: true,
                status: true,
                createdAt: true,
                _count: {
                    select: { orders: true },
                },
            },
        });
        if (!user) {
            throw { status: 404, message: 'Không tìm thấy người dùng' };
        }
        return user;
    }
    async updateProfile(userId, data) {
        const user = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                address: true,
                avatar: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw { status: 404, message: 'Không tìm thấy người dùng' };
        }
        const isValidPassword = await (0, helpers_1.comparePassword)(oldPassword, user.password);
        if (!isValidPassword) {
            throw { status: 400, message: 'Mật khẩu cũ không đúng' };
        }
        const hashedPassword = await (0, helpers_1.hashPassword)(newPassword);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { message: 'Đổi mật khẩu thành công' };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map
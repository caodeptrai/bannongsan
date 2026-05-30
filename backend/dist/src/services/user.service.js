"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const prisma = new client_1.PrismaClient();
class UserService {
    async getAll(params) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = {};
        if (params.search) {
            where.OR = [
                { email: { contains: params.search } },
                { fullName: { contains: params.search } },
                { phone: { contains: params.search } },
            ];
        }
        if (params.role)
            where.role = params.role;
        if (params.status)
            where.status = params.status;
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
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
                    _count: { select: { orders: true, carts: true } },
                },
            }),
            prisma.user.count({ where }),
        ]);
        return {
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
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
                orders: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        orderNumber: true,
                        total: true,
                        status: true,
                        createdAt: true,
                    },
                },
                _count: { select: { orders: true } },
            },
        });
        if (!user) {
            throw { status: 404, message: 'Không tìm thấy người dùng' };
        }
        return user;
    }
    async updateStatus(id, status) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw { status: 404, message: 'Không tìm thấy người dùng' };
        }
        return prisma.user.update({
            where: { id },
            data: { status },
            select: {
                id: true,
                email: true,
                fullName: true,
                status: true,
                updatedAt: true,
            },
        });
    }
    async getDashboardStats() {
        const [totalUsers, totalProducts, totalOrders, totalRevenue, recentOrders,] = await Promise.all([
            prisma.user.count(),
            prisma.product.count({ where: { isActive: true } }),
            prisma.order.count(),
            prisma.order.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { total: true },
            }),
            prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { fullName: true, email: true } },
                    _count: { select: { items: true } },
                },
            }),
        ]);
        return {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue._sum.total || 0,
            recentOrders,
        };
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map
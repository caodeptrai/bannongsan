"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const prisma = new client_1.PrismaClient();
class OrderService {
    async create(userId, data) {
        let subtotal = 0;
        const orderItems = [];
        for (const item of data.items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
                include: { images: { where: { isPrimary: true }, take: 1 } },
            });
            if (!product) {
                throw { status: 404, message: `Không tìm thấy sản phẩm: ${item.productId}` };
            }
            if (product.stock < item.quantity) {
                throw { status: 400, message: `Sản phẩm "${product.name}" chỉ còn ${product.stock} trong kho` };
            }
            const itemTotal = Number(product.price) * item.quantity;
            subtotal += itemTotal;
            orderItems.push({
                productId: product.id,
                productName: product.name,
                productImage: product.images[0]?.url || null,
                quantity: item.quantity,
                price: Number(product.price),
                total: itemTotal,
            });
        }
        const shippingFee = (0, helpers_1.calculateShippingFee)(subtotal);
        const discount = subtotal >= 500000 ? subtotal * 0.05 : 0;
        const total = subtotal + shippingFee - discount;
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    orderNumber: (0, helpers_1.generateOrderNumber)(),
                    userId,
                    status: client_1.OrderStatus.PENDING,
                    subtotal,
                    shippingFee,
                    discount,
                    total,
                    shippingName: data.shippingName,
                    shippingPhone: data.shippingPhone,
                    shippingAddress: data.shippingAddress,
                    shippingNote: data.shippingNote,
                    paymentMethod: data.paymentMethod || client_1.PaymentMethod.COD,
                    paymentStatus: client_1.PaymentStatus.PENDING,
                    items: { create: orderItems },
                },
                include: {
                    items: true,
                    user: { select: { id: true, email: true, fullName: true } },
                },
            });
            await tx.payment.create({
                data: {
                    orderId: newOrder.id,
                    method: data.paymentMethod || client_1.PaymentMethod.COD,
                    amount: total,
                    status: client_1.PaymentStatus.PENDING,
                },
            });
            for (const item of orderItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }
            await tx.cartItem.deleteMany({
                where: { cart: { userId } },
            });
            return newOrder;
        });
        return order;
    }
    async getUserOrders(userId, page = 1, limit = 10) {
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: { userId },
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: { take: 5 },
                    _count: { select: { items: true } },
                },
            }),
            prisma.order.count({ where: { userId } }),
        ]);
        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getOrderById(orderId, userId) {
        const order = await prisma.order.findFirst({
            where: { id: orderId, userId },
            include: {
                items: true,
                payment: true,
                user: { select: { id: true, email: true, fullName: true, phone: true } },
            },
        });
        if (!order) {
            throw { status: 404, message: 'Không tìm thấy đơn hàng' };
        }
        return order;
    }
    async cancelOrder(orderId, userId, reason) {
        const order = await prisma.order.findFirst({
            where: { id: orderId, userId },
        });
        if (!order) {
            throw { status: 404, message: 'Không tìm thấy đơn hàng' };
        }
        if (order.status !== client_1.OrderStatus.PENDING) {
            throw { status: 400, message: 'Không thể hủy đơn hàng đã được xác nhận' };
        }
        const updatedOrder = await prisma.$transaction(async (tx) => {
            const items = await tx.orderItem.findMany({ where: { orderId } });
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } },
                });
            }
            return tx.order.update({
                where: { id: orderId },
                data: {
                    status: client_1.OrderStatus.CANCELLED,
                    cancelledAt: new Date(),
                    cancelReason: reason || 'Khách hàng hủy đơn',
                },
            });
        });
        return updatedOrder;
    }
    // Admin methods
    async getAllOrders(params) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = {};
        if (params.status) {
            where.status = params.status;
        }
        if (params.search) {
            where.OR = [
                { orderNumber: { contains: params.search, mode: 'insensitive' } },
                { shippingName: { contains: params.search, mode: 'insensitive' } },
                { shippingPhone: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        if (params.startDate || params.endDate) {
            where.createdAt = {};
            if (params.startDate)
                where.createdAt.gte = new Date(params.startDate);
            if (params.endDate)
                where.createdAt.lte = new Date(params.endDate + 'T23:59:59');
        }
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, email: true, fullName: true } },
                    _count: { select: { items: true } },
                },
            }),
            prisma.order.count({ where }),
        ]);
        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getOrderDetail(orderId) {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: { include: { product: true } },
                payment: true,
                user: { select: { id: true, email: true, fullName: true, phone: true, address: true } },
            },
        });
        if (!order) {
            throw { status: 404, message: 'Không tìm thấy đơn hàng' };
        }
        return order;
    }
    async updateStatus(orderId, status, cancelReason) {
        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            throw { status: 404, message: 'Không tìm thấy đơn hàng' };
        }
        const updateData = {};
        switch (status) {
            case client_1.OrderStatus.CONFIRMED:
                updateData.confirmedAt = new Date();
                break;
            case client_1.OrderStatus.SHIPPING:
                updateData.shippedAt = new Date();
                break;
            case client_1.OrderStatus.COMPLETED:
                updateData.completedAt = new Date();
                updateData.paymentStatus = client_1.PaymentStatus.PAID;
                break;
            case client_1.OrderStatus.CANCELLED:
                updateData.cancelledAt = new Date();
                updateData.cancelReason = cancelReason;
                break;
        }
        updateData.status = status;
        // If cancelling, restore stock
        if (status === client_1.OrderStatus.CANCELLED) {
            await prisma.$transaction(async (tx) => {
                const items = await tx.orderItem.findMany({ where: { orderId } });
                for (const item of items) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: { increment: item.quantity } },
                    });
                }
                await tx.order.update({
                    where: { id: orderId },
                    data: updateData,
                });
            });
            return prisma.order.findUnique({ where: { id: orderId } });
        }
        return prisma.order.update({
            where: { id: orderId },
            data: updateData,
        });
    }
    async getStatistics(startDate, endDate) {
        const dateFilter = {};
        if (startDate)
            dateFilter.gte = new Date(startDate);
        if (endDate)
            dateFilter.lte = new Date(endDate + 'T23:59:59');
        const whereCompleted = { status: client_1.OrderStatus.COMPLETED };
        if (Object.keys(dateFilter).length > 0) {
            whereCompleted.createdAt = dateFilter;
        }
        const [totalOrders, pendingOrders, confirmedOrders, shippingOrders, completedOrders, cancelledOrders, ordersInPeriod, topProducts,] = await Promise.all([
            prisma.order.count({ where: Object.keys(dateFilter).length ? { createdAt: dateFilter } : {} }),
            prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: client_1.OrderStatus.PENDING } }),
            prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: client_1.OrderStatus.CONFIRMED } }),
            prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: client_1.OrderStatus.SHIPPING } }),
            prisma.order.count({ where: whereCompleted }),
            prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: client_1.OrderStatus.CANCELLED } }),
            prisma.order.findMany({
                where: whereCompleted,
                select: {
                    total: true,
                    createdAt: true,
                    status: true,
                },
            }),
            prisma.product.findMany({
                where: { soldCount: { gt: 0 } },
                orderBy: { soldCount: 'desc' },
                take: 10,
                select: {
                    id: true,
                    name: true,
                    soldCount: true,
                    price: true,
                },
            }),
        ]);
        const totalRevenue = ordersInPeriod.reduce((sum, o) => sum + Number(o.total), 0);
        const completedCount = ordersInPeriod.length;
        // Revenue by date
        const revenueByDateMap = new Map();
        for (const order of ordersInPeriod) {
            const date = order.createdAt.toISOString().split('T')[0];
            const existing = revenueByDateMap.get(date);
            if (existing) {
                existing.revenue += Number(order.total);
                existing.orders += 1;
            }
            else {
                revenueByDateMap.set(date, { revenue: Number(order.total), orders: 1 });
            }
        }
        const revenueByDate = Array.from(revenueByDateMap.entries())
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
        // Top products with revenue
        const topProductsWithRevenue = topProducts.map((p) => ({
            id: p.id,
            name: p.name,
            soldCount: p.soldCount,
            revenue: p.soldCount * Number(p.price),
        }));
        return {
            totalOrders,
            pendingOrders,
            confirmedOrders,
            shippingOrders,
            completedOrders,
            cancelledOrders,
            totalRevenue,
            averageOrderValue: completedCount > 0 ? totalRevenue / completedCount : 0,
            revenueByDate,
            topProducts: topProductsWithRevenue,
        };
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();
//# sourceMappingURL=order.service.js.map
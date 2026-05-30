import { PrismaClient, OrderStatus, PaymentStatus, PaymentMethod } from '@prisma/client';
import { generateOrderNumber, paginate, calculateShippingFee } from '../utils/helpers';

const prisma = new PrismaClient();

export class OrderService {
  private assertStatusTransition(current: OrderStatus, next: OrderStatus) {
    if (current === next) return;

    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPING, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    if (!allowedTransitions[current].includes(next)) {
      throw { status: 400, message: `Không thể chuyển từ ${current} sang ${next}` };
    }
  }

  async create(userId: string, data: {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    shippingNote?: string;
    paymentMethod?: string;
    items: Array<{ productId: string; quantity: number }>;
  }) {
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of data.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { images: { where: { isPrimary: true }, take: 1 } },
      });

      if (!product) {
        throw { status: 404, message: `Không tìm thấy sản phẩm: ${item.productId}` };
      }
      if (!product.isActive) {
        throw { status: 400, message: `Sản phẩm "${product.name}" hiện không còn kinh doanh` };
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

    const shippingFee = calculateShippingFee(subtotal);
    const discount = subtotal >= 500000 ? subtotal * 0.05 : 0;
    const total = subtotal + shippingFee - discount;

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId,
          status: OrderStatus.PENDING,
          subtotal,
          shippingFee,
          discount,
          total,
          shippingName: data.shippingName,
          shippingPhone: data.shippingPhone,
          shippingAddress: data.shippingAddress,
          shippingNote: data.shippingNote,
          paymentMethod: (data.paymentMethod as PaymentMethod) || PaymentMethod.COD,
          paymentStatus: PaymentStatus.PENDING,
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
          method: (data.paymentMethod as PaymentMethod) || PaymentMethod.COD,
          amount: total,
          status: PaymentStatus.PENDING,
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

  async getUserOrders(userId: string, page = 1, limit = 10) {
    const { skip, take } = paginate(page, limit);

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

  async getOrderById(orderId: string, userId: string) {
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

  async cancelOrder(orderId: string, userId: string, reason?: string) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw { status: 404, message: 'Không tìm thấy đơn hàng' };
    }

    if (order.status !== OrderStatus.PENDING) {
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
          status: OrderStatus.CANCELLED,
          cancelledAt: new Date(),
          cancelReason: reason || 'Khách hàng hủy đơn',
        },
      });
    });

    return updatedOrder;
  }

  // Admin methods
  async getAllOrders(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const { skip, take } = paginate(page, limit);

    const where: any = {};

    if (params.status) {
      where.status = params.status;
    }

    if (params.search) {
      where.OR = [
        { orderNumber: { contains: params.search } },
        { shippingName: { contains: params.search } },
        { shippingPhone: { contains: params.search } },
      ];
    }

    if (params.startDate || params.endDate) {
      where.createdAt = {};
      if (params.startDate) where.createdAt.gte = new Date(params.startDate);
      if (params.endDate) where.createdAt.lte = new Date(params.endDate + 'T23:59:59');
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

  async getOrderDetail(orderId: string) {
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

  async updateStatus(orderId: string, status: OrderStatus, cancelReason?: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw { status: 404, message: 'Không tìm thấy đơn hàng' };
    }
    this.assertStatusTransition(order.status, status);

    if (order.status === status) {
      return order;
    }

    const updateData: any = {};

    switch (status) {
      case OrderStatus.CONFIRMED:
        updateData.confirmedAt = new Date();
        break;
      case OrderStatus.SHIPPING:
        updateData.shippedAt = new Date();
        break;
      case OrderStatus.COMPLETED:
        updateData.completedAt = new Date();
        updateData.paymentStatus = PaymentStatus.PAID;
        break;
      case OrderStatus.CANCELLED:
        updateData.cancelledAt = new Date();
        updateData.cancelReason = cancelReason;
        break;
    }

    updateData.status = status;

    if (status === OrderStatus.COMPLETED) {
      return prisma.$transaction(async (tx) => {
        const items = await tx.orderItem.findMany({ where: { orderId } });
        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { soldCount: { increment: item.quantity } },
          });
        }

        await tx.payment.updateMany({
          where: { orderId },
          data: { status: PaymentStatus.PAID, paidAt: new Date() },
        });

        return tx.order.update({
          where: { id: orderId },
          data: updateData,
        });
      });
    }

    if (status === OrderStatus.CANCELLED) {
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

  async getStatistics(startDate?: string, endDate?: string) {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) dateFilter.lte = new Date(endDate + 'T23:59:59');

    const whereCompleted: any = { status: OrderStatus.COMPLETED };
    if (Object.keys(dateFilter).length > 0) {
      whereCompleted.createdAt = dateFilter;
    }

    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippingOrders,
      completedOrders,
      cancelledOrders,
      ordersInPeriod,
      topProducts,
    ] = await Promise.all([
      prisma.order.count({ where: Object.keys(dateFilter).length ? { createdAt: dateFilter } : {} }),
      prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: OrderStatus.CONFIRMED } }),
      prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: OrderStatus.SHIPPING } }),
      prisma.order.count({ where: whereCompleted }),
      prisma.order.count({ where: { ...Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}, status: OrderStatus.CANCELLED } }),
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
    const revenueByDateMap = new Map<string, { revenue: number; orders: number }>();
    for (const order of ordersInPeriod) {
      const date = order.createdAt.toISOString().split('T')[0];
      const existing = revenueByDateMap.get(date);
      if (existing) {
        existing.revenue += Number(order.total);
        existing.orders += 1;
      } else {
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

export const orderService = new OrderService();

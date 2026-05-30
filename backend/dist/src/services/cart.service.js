"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = exports.CartService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CartService {
    canAccessCart(cart, userId, sessionId) {
        return Boolean((userId && cart.userId === userId) ||
            (sessionId && cart.sessionId === sessionId));
    }
    async getCart(userId, sessionId) {
        let resolvedSessionId = undefined;
        if (sessionId)
            resolvedSessionId = sessionId;
        if (!userId && !resolvedSessionId) {
            return { cart: null, items: [], subtotal: 0, itemCount: 0 };
        }
        const where = userId ? { userId } : { sessionId: resolvedSessionId };
        const cart = await prisma.cart.findFirst({
            where,
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: { where: { isPrimary: true }, take: 1 },
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!cart) {
            return { cart: null, items: [], subtotal: 0, itemCount: 0 };
        }
        const subtotal = cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
        return {
            cart,
            items: cart.items,
            subtotal,
            itemCount: cart.items.length,
        };
    }
    async addItem(userId, sessionId, productId, quantity) {
        let cart = null;
        if (!userId && !sessionId) {
            throw { status: 400, message: 'Thiếu session ID' };
        }
        if (userId) {
            cart = await prisma.cart.findFirst({ where: { userId } });
        }
        else if (sessionId) {
            cart = await prisma.cart.findFirst({ where: { sessionId } });
        }
        if (!cart) {
            const cartData = {};
            if (userId)
                cartData.userId = userId;
            if (sessionId)
                cartData.sessionId = sessionId;
            cart = await prisma.cart.create({ data: cartData });
        }
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm' };
        }
        if (product.stock < quantity) {
            throw { status: 400, message: 'Số lượng vượt quá tồn kho' };
        }
        const existingItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId },
        });
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock) {
                throw { status: 400, message: 'Số lượng vượt quá tồn kho' };
            }
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: newQuantity },
            });
        }
        else {
            await prisma.cartItem.create({
                data: { cartId: cart.id, productId, quantity },
            });
        }
        return this.getCart(userId || null, sessionId || null);
    }
    async updateItem(cartItemId, quantity, userId, sessionId) {
        const item = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { product: true, cart: true },
        });
        if (!item || !this.canAccessCart(item.cart, userId, sessionId)) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
        }
        if (quantity > item.product.stock) {
            throw { status: 400, message: 'Số lượng vượt quá tồn kho' };
        }
        if (quantity <= 0) {
            await prisma.cartItem.delete({ where: { id: cartItemId } });
        }
        else {
            await prisma.cartItem.update({
                where: { id: cartItemId },
                data: { quantity },
            });
        }
        return { message: 'Cập nhật giỏ hàng thành công' };
    }
    async removeItem(cartItemId, userId, sessionId) {
        const item = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { cart: true },
        });
        if (!item || !this.canAccessCart(item.cart, userId, sessionId)) {
            throw { status: 404, message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
        }
        await prisma.cartItem.delete({ where: { id: cartItemId } });
        return { message: 'Xóa sản phẩm khỏi giỏ hàng thành công' };
    }
    async clearCart(userId, sessionId) {
        if (!userId && !sessionId) {
            throw { status: 400, message: 'Thiếu thông tin giỏ hàng' };
        }
        const cart = userId
            ? await prisma.cart.findFirst({ where: { userId } })
            : await prisma.cart.findFirst({ where: { sessionId: sessionId || undefined } });
        if (cart) {
            await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
        return { message: 'Xóa giỏ hàng thành công' };
    }
    async mergeCart(userId, sessionId) {
        const guestCart = await prisma.cart.findFirst({
            where: { sessionId },
            include: { items: true },
        });
        if (!guestCart || guestCart.items.length === 0) {
            return this.getCart(userId);
        }
        let userCart = await prisma.cart.findFirst({ where: { userId } });
        if (!userCart) {
            userCart = await prisma.cart.create({ data: { userId } });
        }
        for (const guestItem of guestCart.items) {
            const existingItem = await prisma.cartItem.findFirst({
                where: { cartId: userCart.id, productId: guestItem.productId },
            });
            if (existingItem) {
                const newQuantity = existingItem.quantity + guestItem.quantity;
                const product = await prisma.product.findUnique({ where: { id: guestItem.productId } });
                if (product && newQuantity <= product.stock) {
                    await prisma.cartItem.update({
                        where: { id: existingItem.id },
                        data: { quantity: newQuantity },
                    });
                }
            }
            else {
                await prisma.cartItem.create({
                    data: {
                        cartId: userCart.id,
                        productId: guestItem.productId,
                        quantity: guestItem.quantity,
                    },
                });
            }
        }
        await prisma.cartItem.deleteMany({ where: { cartId: guestCart.id } });
        await prisma.cart.delete({ where: { id: guestCart.id } });
        return this.getCart(userId);
    }
}
exports.CartService = CartService;
exports.cartService = new CartService();
//# sourceMappingURL=cart.service.js.map
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CartService {
  async getCart(userId: string | null | undefined, sessionId?: string | null) {
    let resolvedSessionId: string | undefined = undefined;
    if (sessionId) resolvedSessionId = sessionId;

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

    const subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    return {
      cart,
      items: cart.items,
      subtotal,
      itemCount: cart.items.length,
    };
  }

  async addItem(userId: string | null | undefined, sessionId: string | null | undefined, productId: string, quantity: number) {
    let cart: any = null;

    if (userId) {
      cart = await prisma.cart.findFirst({ where: { userId } });
    } else if (sessionId) {
      cart = await prisma.cart.findFirst({ where: { sessionId } });
    }

    if (!cart) {
      const cartData: any = {};
      if (userId) cartData.userId = userId;
      if (sessionId) cartData.sessionId = sessionId;
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
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    return this.getCart(userId || null, sessionId || null);
  }

  async updateItem(cartItemId: string, quantity: number) {
    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });

    if (!item) {
      throw { status: 404, message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
    }

    if (quantity > item.product.stock) {
      throw { status: 400, message: 'Số lượng vượt quá tồn kho' };
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
    }

    return { message: 'Cập nhật giỏ hàng thành công' };
  }

  async removeItem(cartItemId: string) {
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item) {
      throw { status: 404, message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return { message: 'Xóa sản phẩm khỏi giỏ hàng thành công' };
  }

  async clearCart(userId: string) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
    return { message: 'Xóa giỏ hàng thành công' };
  }

  async mergeCart(userId: string, sessionId: string) {
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
      } else {
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

export const cartService = new CartService();

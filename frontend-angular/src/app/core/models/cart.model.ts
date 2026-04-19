export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    unit: string;
    stock: number;
    images?: { url: string; isPrimary: boolean }[];
  };
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CartResponse {
  success: boolean;
  message?: string;
  data: {
    cart: Cart | null;
    items: CartItem[];
    subtotal: number;
    itemCount: number;
  };
}

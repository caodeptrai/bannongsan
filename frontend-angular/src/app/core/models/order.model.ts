import { Product } from './product.model';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingNote?: string;
  paymentMethod: 'COD' | 'BANK_TRANSFER' | 'MOMO' | 'ZALOPAY';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  confirmedAt?: string;
  shippedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
  };
  items?: OrderItem[];
  payment?: Payment;
  _count?: {
    items: number;
  };
}

export interface Payment {
  id: string;
  orderId: string;
  method: 'COD' | 'BANK_TRANSFER' | 'MOMO' | 'ZALOPAY';
  amount: number;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  transactionId?: string;
  paymentData?: string;
  paidAt?: string;
  createdAt: string;
}

export interface CreateOrderRequest {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingNote?: string;
  paymentMethod?: 'COD' | 'BANK_TRANSFER' | 'MOMO' | 'ZALOPAY';
  items: { productId: string; quantity: number }[];
}

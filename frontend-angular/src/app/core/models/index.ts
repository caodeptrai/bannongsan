export * from './user.model';
export * from './product.model';
export * from './cart.model';
export * from './order.model';
export * from './setting.model';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: any[];
}

export interface RevenueStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  shippingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  revenueByDate: Array<{ date: string; revenue: number; orders: number }>;
  topProducts: Array<{ id: string; name: string; soldCount: number; revenue: number }>;
}

export interface ChatbotMessage {
  message: string;
  response: string;
  category?: string;
  productId?: string;
  confidence?: string;
}

export interface ChatFAQ {
  id: string;
  question: string;
  answer: string;
  keywords?: string;
  category?: string;
  isActive: boolean;
  priority: number;
  productId?: string;
  createdAt: string;
}
